import React from "react";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

export default function ReviewH() {
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
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Publish
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Delele
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </CardHeader>
            <CardBody>
              <div className="table-full-width table-responsive">
                <Table>
                  <tbody>
                    <tr>
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
                        <p className="title">By: Glee Smiley</p>
                        <p className="text-muted">
                          When I came with my mother, I was very nervous. But
                          after entering here I felt warmed with smiling
                        </p>
                        <p>Sunday, 24 October 2023 8:47 AM</p>
                      </td>
                      <td className="td-actions text-right">
                        <Button
                          color="link"
                          id="tooltip636901683"
                          title=""
                          type="button"
                        >
                          <i className="tim-icons icon-pencil" />
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip636901683"
                          placement="right"
                        >
                          Edit Task
                        </UncontrolledTooltip>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <FormGroup check>
                          <Label check>
                            <Input
                              defaultChecked
                              defaultValue=""
                              type="checkbox"
                            />
                            <span className="form-check-sign">
                              <span className="check" />
                            </span>
                          </Label>
                        </FormGroup>
                      </td>
                      <td>
                        <p className="title">By: Alexa Keev</p>
                        <p className="text-muted">
                          The hospital staff provided exceptional care, and I
                          felt truly valued as a patient. I couldn't be more
                          satisfied with my experience here.
                        </p>
                        <p>Sunday, 24 October 2023 07:15 PM</p>
                      </td>
                      <td className="td-actions text-right">
                        <Button
                          color="link"
                          id="tooltip457194718"
                          title=""
                          type="button"
                        >
                          <i className="tim-icons icon-pencil" />
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip457194718"
                          placement="right"
                        >
                          Edit Task
                        </UncontrolledTooltip>
                      </td>
                    </tr>
                    <tr>
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
                        <p className="title">By: Ivankov</p>
                        <p className="text-muted">
                          The hospital staff's professionalism and compassion
                          made my stay a positive experience. Thank you for the
                          excellent care.
                        </p>
                        <p>Tuesday, 26 October 2023 09:27 PM</p>
                      </td>
                      <td className="td-actions text-right">
                        <Button
                          color="link"
                          id="tooltip362404923"
                          title=""
                          type="button"
                        >
                          <i className="tim-icons icon-pencil" />
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip362404923"
                          placement="right"
                        >
                          Edit Task
                        </UncontrolledTooltip>
                      </td>
                    </tr>
                    <tr>
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
                        <p className="title">By: Tom CLarks</p>
                        <p className="text-muted">
                          I'm grateful for the outstanding medical attention I
                          received at this hospital. The entire team went above
                          and beyond to ensure my well-being.
                        </p>
                        <p>Monday, 25 October 2023 02:51 PM</p>
                      </td>
                      <td className="td-actions text-right">
                        <Button
                          color="link"
                          id="tooltip818217463"
                          title=""
                          type="button"
                        >
                          <i className="tim-icons icon-pencil" />
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip818217463"
                          placement="right"
                        >
                          Edit Task
                        </UncontrolledTooltip>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
