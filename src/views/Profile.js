import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Row,
  Col,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const userProfile = JSON.parse(localStorage.getItem("userProfile")) || null;

const EditableInput = ({ defaultValue, type, field, patientId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    console.log("Updated value:", inputValue);

    // Make sure userProfile is defined before making the API call
    if (userProfile === undefined || userProfile === null) {
      console.error("Invalid userProfile:", userProfile);
      return;
    }

    // Update the field in userProfile
    const updatedUserProfile = { ...userProfile, [field]: inputValue };

    // Make an API call to update the profile
    try {
      const response = await fetch(
        `http://localhost:5206/api/patient_cr?id=${patientId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUserProfile),
        }
      );

      if (response.ok) {
        const updatedProfile = { ...userProfile, [field]: inputValue };
        localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
        alert(`Profile updated successfully for ${field}`);
        // You might want to fetch the updated profile here and update the state
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error during profile update:", error);
    }
  };

  return (
    <>
      {isEditing ? (
        <input
          type={type}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleSaveClick}
        />
      ) : (
        <div style={{ display: "flex", alignItems: "center" }}>
          <input value={inputValue} disabled />
          <FontAwesomeIcon
            icon={faPencilAlt}
            className="ml-2"
            onClick={handleEditClick}
            style={{ cursor: "pointer" }}
          />
        </div>
      )}
      {isEditing && (
        <Button className="mt-2" color="primary" onClick={handleSaveClick}>
          Save
        </Button>
      )}
    </>
  );
};

const Profile = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("userProfile in Profile:", userProfile);
    setLoading(false);
  }, [userProfile]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content">
      <Row>
        <Col md="4">
          <Card className="card-user">
            <CardBody>
              <CardText />
              <div className="author">
                <div className="block block-one" />
                <div className="block block-two" />
                <div className="block block-three" />
                <div className="block block-four" />
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <br></br>
                  <h5 className="title">
                    {userProfile !== null ? userProfile.pId : "Loading..."}
                  </h5>
                </a>
                <p className="description">Patient</p>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md="8">
          <Card>
            <CardHeader>
              <h5 className="title">Edit Profile</h5>
            </CardHeader>
            <CardBody>
              <Form>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label htmlFor="exampleInputName1">Change Name</label>
                      <EditableInput
                        defaultValue={
                          userProfile !== null ? userProfile.pName : ""
                        }
                        type="text"
                        field="pName"
                        patientId={userProfile !== null ? userProfile.pId : ""}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>Change Password</label>
                      <EditableInput
                        defaultValue={
                          userProfile !== null ? userProfile.pPassword : ""
                        }
                        type="text"
                        field="pPassword"
                        patientId={userProfile !== null ? userProfile.pId : ""}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label htmlFor="exampleInputEmail1">Change Email</label>
                      <EditableInput
                        defaultValue={
                          userProfile !== null ? userProfile.pEmail : ""
                        }
                        type="email"
                        field="pEmail"
                        patientId={userProfile !== null ? userProfile.pId : ""}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>Change Contact No.</label>
                      <EditableInput
                        defaultValue={
                          userProfile !== null ? userProfile.pMobile : ""
                        }
                        field="pMobile"
                        patientId={userProfile !== null ? userProfile.pId : ""}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
            <CardFooter>
              <br></br>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
