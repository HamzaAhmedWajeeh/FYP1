import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

export default function AddDoctorE() {
  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <h5 className="title">Add Doctor</h5>
            </CardHeader>
            <CardBody>
              <Form>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Name</label>
                      <Input
                        defaultValue=""
                        name="D_Name"
                        placeholder="Mike"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label htmlFor="exampleInputEmail1">Email address</label>
                      <Input
                        placeholder="mike@email.com"
                        name="D_Email"
                        type="email"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-md-1" md="4">
                    <FormGroup>
                      <label>Contact No.</label>
                      <Input
                        defaultValue=""
                        name="D_Mobile"
                        placeholder="Contact"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col className="px-md-1" md="4">
                    <label>Field</label>
                    <Input
                      defaultValue=""
                      name="D_Field"
                      placeholder="Surgeon"
                      type="text"
                    />
                  </Col>
                  <Col className="pl-md-1" md="4">
                    <FormGroup>
                      <label>Availability Status</label>
                      <select
                        class="form-control"
                        name="D_AvailablityStatus"
                        id="genderSelect"
                      >
                        <option value="">Select Status</option>
                        <option value="male">Available</option>
                        <option value="female">Not Available</option>
                      </select>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col className="pr-md-1" md="4">
                    <FormGroup>
                      <label>Add Photo</label>
                      <Input type="file" name="Photo" id="Photo" />
                      <br></br>
                      <div
                        style={{
                          border: "2px solid #00bf9a",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "50px",
                          height: "50px",
                        }}
                      >
                        <i className="fa fa-camera" />
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
            <CardFooter>
              <Button className="btn-fill" color="success" type="submit">
                Save
              </Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
