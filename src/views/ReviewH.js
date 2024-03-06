import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Table,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";

const reviews = [
  {
    User: "Glee Smiley",
    Comments: "You're providing great services.",
    HospitalName: "Aga Khan",
    Doctor: "Dr. Smith",
    Date: "Sunday, 24 October 2023 8:47 AM",
  },
  {
    User: "Alexa",
    Comments: "There can be some changes made but still it was good enough.",
    HospitalName: "Liaquat National",
    Doctor: "Dr. Max",
    Date: "Sunday, 24 October 2023 07:15 PM",
  },
  {
    User: "Ivan",
    Comments: "Overall, it was a nice experience.",
    HospitalName: "Aga Khan",
    Doctor: "Dr. Daisy",
    Date: "Tuesday, 26 October 2023 09:27 PM",
  },
  {
    User: "Tom CLarks",
    Comments: "More features can be added.",
    HospitalName: "Zia Uddin Hospital",
    Doctor: "Dr. Black",
    Date: "Sunday, 24 October 2023 8:47 AM",
  },
];

const ReviewH = () => {
  return (
    <div className="content">
      <Row>
        <Col xs="12">
          <Card className="card-tasks">
            <CardHeader>
              <h6 className="title d-inline">Review</h6>
              <UncontrolledDropdown>
                <DropdownToggle
                  caret
                  className="btn-icon"
                  color="link"
                  data-toggle="dropdown"
                  type="button"
                >
                  <i className="tim-icons icon-settings-gear-63" />
                </DropdownToggle>
                <DropdownMenu aria-labelledby="dropdownMenuLink" right>
                  <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </CardHeader>
            <CardBody>
              <div className="table-full-width table-responsive">
                <Table>
                  <tbody>
                    {reviews.map((review, index) => (
                      <tr key={index}>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">By: {review.User}</p>
                          <p>Comments:</p>
                          <p>{review.Comments}</p>
                          <br></br>
                          <h5 className="text-muted">Hospital Name: {review.HospitalName}</h5>
                          <h5 className="text-muted">Doctor: {review.Doctor}</h5>
                          <p>{review.Date}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default ReviewH;