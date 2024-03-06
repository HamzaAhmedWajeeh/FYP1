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

export default function FeedbackP() {
  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <h5 className="title">Feedback</h5>
            </CardHeader>
            <CardBody>
              <Form>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Select Hospital</label>
                      <select
                        class="form-control"
                        name="F_Hosiptal"
                        id="HospitalSelect"
                      >
                        <option value="">Select Hospital</option>
                        <option value="hosa">HospitalA</option>
                        <option value="hosb">HospitalB</option>
                        <option value="other">Other</option>
                      </select>
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>Select Doctor</label>
                      <select
                        class="form-control"
                        name="F_Doctor"
                        id="DoctorSelect"
                      >
                        <option value="">Select Doctor</option>
                        <option value="doca">DoctorA</option>
                        <option value="docb">DoctorB</option>
                        <option value="other">Other</option>
                      </select>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Feedback</label>
                      <Input
                        defaultValue=""
                        name="F_Comments"
                        placeholder="Comments"
                        type="textarea"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
            <CardFooter>
              <Button className="btn-fill" color="primary" type="submit">
                Save
              </Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
}