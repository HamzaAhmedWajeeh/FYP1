import React, { useState } from "react";
import { Button, Card, CardHeader, CardBody, CardFooter, FormGroup, Form, Input, Row, Col } from "reactstrap";
import { Link, useParams,useLocation  } from "react-router-dom";

const userProfile = JSON.parse(localStorage.getItem('userProfile')) || null;

export default function MedicineD() {
  const [loading, setLoading] = useState(false);
  const { pId, dpId } = useParams();

  const [medicineData, setMedicineData] = useState({
    PM_DP_ID: dpId,
    PM_Dosage: "",
    PM_StartDate: "",
    PM_EndDate: "",
    PM_ScheduleTime: "",
    PM_MedicineName: "",
    PM_DId: userProfile ? userProfile.dId : null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedicineData({ ...medicineData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const response = await fetch("http://localhost:5206/api/prescriptionmedication", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(medicineData),
      });

      if (response.ok) {
        // Handle success (e.g., show a success message or redirect)
        alert("Medicine added successfully!");
        setLoading(false)
      } else {
        alert('failed to add medicine')
        console.error("Failed to add medicine:", response.status, response.statusText);
        setLoading(false)
      }
    } catch (error) {
      console.error("An error occurred while adding medicine:", error);
    }
  };

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <h5 className="title">Add Medicine</h5>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleFormSubmit}>
                <Row>

                </Row>
                <Row>
                  <Col className="pr-md-1" md="3">
                    <FormGroup>
                      <label>Select Start Date</label>
                      <Input
                        value={medicineData.PM_StartDate}
                        name="PM_StartDate"
                        placeholder="Start Date"
                        type="date"
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="px-md-1" md="3">
                    <FormGroup>
                      <label>Select End Date</label>
                      <Input
                        value={medicineData.PM_EndDate}
                        name="PM_EndDate"
                        placeholder="End Date"
                        type="date"
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>Schedule Time</label>
                      <select
                        className="form-control"
                        name="PM_ScheduleTime"
                        id="genderSelect"
                        onChange={handleInputChange}
                      >
                        <option value="">Select Time</option>
                        <option value="9:00 AM">9:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="Other">Other</option>
                      </select>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Medicine Name</label>
                      <Input
                        value={medicineData.PM_MedicineName}
                        name="PM_MedicineName"
                        placeholder="Medicine Name"
                        type="text"
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

              </Form>
            </CardBody>
            <CardFooter>
              <Button className="btn-fill" color="primary" type="submit" onClick={handleFormSubmit}>
                Save
              </Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
