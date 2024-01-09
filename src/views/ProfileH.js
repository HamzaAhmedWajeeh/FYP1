import {React, useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import back from "./../assets/img/12.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";


  const userProfile = JSON.parse(localStorage.getItem('userProfile')) || null;


const EditableInput = ({ defaultValue, type, field, hospitalId }) => {
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
      console.error('Invalid userProfile:', userProfile);
      return;
    }

    // Update the field in userProfile
    const updatedUserProfile = { ...userProfile, [field]: inputValue };

    // Make an API call to update the profile
    try {
      const response = await fetch(`http://localhost:5206/api/Hospital_Cr/${userProfile.hId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserProfile),
      });

      if (response.ok) {
        alert(`Profile updated successfully for ${field}`);
        // You might want to fetch the updated profile here and update the state
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error during profile update:', error);
    }
  };


  return (
    <>
      {isEditing ? (
        <Input
          type={type}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleSaveClick}
        />
      ) : (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Input value={inputValue} disabled />
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

export default function ProfileH() {
  // Retrieve userProfile from localStorage
  const userProfile = JSON.parse(localStorage.getItem('userProfile')) || null;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('userProfile in ProfileH:', userProfile);
    setLoading(false);
  }, [userProfile]);

  if (loading) {
    return <div>Loading...</div>;
  }



  return (
    <div className="content">
      <Row>
        <Col xs="12">
          <Card className="card-chart">
            <CardHeader>
            <Row>
        <Col xs="12">
          <Card className="card-chart">
            <CardHeader>
              <Row>
                <Col className="text-left" sm="6">
                  <CardTitle tag="h2">Profile</CardTitle>
                </Col>
                <Col xs="12">
                  <img src={back} alt="profile_image" width={1400} />
                  <h2>{userProfile !== null ? userProfile.hName : "Loading..."}</h2>
                </Col>
              </Row>
            </CardHeader>
          </Card>
        </Col>
      </Row>
            </CardHeader>
          </Card>
        </Col>
      </Row>

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
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <br></br>
                  <h5 className="title">{userProfile !== null ? userProfile.hId : "Loading..."}</h5>
                </a>
                <p className="description">Admin</p>
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
                        defaultValue={userProfile !== null ? userProfile.hName : ""}
                        type="text"
                        field="hName"
                        hospitalId={userProfile !== null ? userProfile.hId : ""}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>Change Address</label>
                      <EditableInput defaultValue={userProfile !== null ? userProfile.hAddress : ""} type="text" field="hAddress" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label htmlFor="exampleInputEmail1">Change Email</label>
                      <EditableInput
                        defaultValue={userProfile !== null ? userProfile.hEmail : ""}
                        type="email"
                        field="hEmail"
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>Change Password</label>
                      <EditableInput type="password" field="hPassword" defaultValue={userProfile !== null ? userProfile.hPassword : ""} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Change Latitude</label>
                      <EditableInput  field="hlLatitude" defaultValue={userProfile !== null ? userProfile.hlLatitude : ""} />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>Change Longitude</label>
                      <EditableInput  field="hlLongitude" defaultValue={userProfile !== null ? userProfile.hlLongitude : ""} />
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
}