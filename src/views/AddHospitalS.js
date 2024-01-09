import React, { useState } from "react";
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
import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import * as validator from 'validator';
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Loader } from "@googlemaps/js-api-loader";

const libraries = ["places"];
let searchBox;

const loader = new Loader({
  apiKey: "AIzaSyDQlMeYeoLQT6ZEdekJhVEyNr_XXC5ovYY", // Replace with your API key
  version: "weekly",
});

export default function AddHospitalS() {
    const navigate = useNavigate(); // Create a history object
    const [loading, setLoading] = useState(false); // Add loading state


    const [selectedLocation, setSelectedLocation] = useState({
      lat: 37.7749,
      lng: -122.4194,
    });

    const handleFormSubmit = async (values, { resetForm }) => {
      try {
        setLoading(true);

        // Validate email before submission
        if (!validateEmail(values.hEmail)) {
          alert('Invalid or unusual email');
          return; // Skip form submission
        }

        // Include the selectedLocation data in the form submission
        values.hlLatitude = selectedLocation.lat;
        values.hlLongitude = selectedLocation.lng;

        // Make a POST request to the API to add the hospital
        const response = await fetch('http://localhost:5206/api/Hospital_Cr', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          // Reset the form after a successful submission
          resetForm();

          // Redirect the user to the Hospitals page using the navigate function
          navigate('/super/HospitalS');
        } else {
          console.error('Failed to add hospital:', response.status, response.statusText);

          if (response.status === 403) {
            // Show an error alert for 403 response
            alert('Unable to create. Hospital with this Email already exists!');
          } else {
            // Handle other error cases
            const responseData = await response.json();
            console.error('Server response:', responseData);

            // Check if the response indicates that a hospital with the email already exists
            if (responseData.error && responseData.error.includes('Hospital with this Email already exists')) {
              alert('Hospital with this Email already exists!');
            }
          }
        }
      } catch (error) {
        console.error('Error during form submission:', error);
        // Add this line to log the stack trace
        console.error(error.stack);
      } finally {
        setLoading(false); // Set loading to false after form submission (whether successful or not)
      }
    };


  const formik = useFormik({
    initialValues,
    validationSchema: checkoutSchema,
    onSubmit: handleFormSubmit,
  });

  const { values, handleSubmit, handleChange, handleBlur } = formik;


  const validateEmail = (email) => {
    return validator.isEmail(email);
};

 const handleEmailBlur = () => {
    const emailFieldValue = values.hEmail;

    if (!validateEmail(emailFieldValue)) {
      console.log('Invalid or unusual email');

    }
 };


  const handlePlaceSelect = (place) => {
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    setSelectedLocation({ lat, lng });
    const address = place.formatted_address || "";
    formik.setFieldValue("hlLatitude", lat);
    formik.setFieldValue("hlLongitude", lng);
    formik.setFieldValue("hAddress", address);
  };

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <h5 className="title">Add Hospital</h5>
            </CardHeader>
            <CardBody>
            <Form onSubmit={handleSubmit}>
                <Row>

                  <Col className="pl-md-1" md="12">
                    <FormGroup>
                      <label>Name</label>
                      <Input
                        defaultValue=""
                        name="hName"
                        placeholder=""
                        type="text"
                        required
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.hName}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label htmlFor="exampleInputEmail1">Email</label>
                      <Input
                        placeholder="example@email.com"
                        name="hEmail"
                        type="email"
                        onBlur={handleEmailBlur}
                        required
                        onChange={handleChange}
                        value={values.hEmail}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>Address</label>
                      <Input
                        defaultValue=""
                        name="hAddress"
                        placeholder=""
                        type="text"
                        onBlur={handleBlur}
                        required
                        onChange={handleChange}
                        value={values.hAddress || ""}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Longitude</label>
                      <Input
                        defaultValue=""
                        name="hlLongitude"
                        placeholder=""
                        type="text"
                        required
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.hlLongitude || ""}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>Latitude</label>
                      <Input
                        defaultValue=""
                        name="hlLatitude"
                        placeholder=""
                        type="text"
                        required
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.hlLatitude || ""}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
            <CardFooter>
                  <Button className="btn-fill" color="success" type="submit">
                  {loading ? 'Adding Hospital...' : 'Add Hospital'}
                  </Button>
                </CardFooter>
                </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
      <Col xs="12">
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              width: "calc(100% - 20px)",
              marginBottom: "10px",
            }}
          >
            <LoadScript
              googleMapsApiKey={loader.apiKey}
              libraries={libraries}
            >
              <StandaloneSearchBox
                onLoad={(ref) => (searchBox = ref)}
                onPlacesChanged={() => {
                  handlePlaceSelect(searchBox.getPlaces()[0]);
                }}
              >
                <input
                  type="text"
                  placeholder="Search for a location"
                  style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `100%`,
                    height: `32px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                    marginTop: "20px",
                  }}
                />
              </StandaloneSearchBox>
            </LoadScript>
          </div>
          <br />
          <LoadScript
            googleMapsApiKey={loader.apiKey}
            libraries={libraries}
          >
            <GoogleMap
              mapContainerStyle={{
                height: "400px",
                width: "100%",
                marginTop: "60px",
              }}
              center={selectedLocation}
              zoom={15}
            >
              {selectedLocation && <Marker position={selectedLocation} />}
            </GoogleMap>
          </LoadScript>
        </Col>
      </Row>
    </div>
  );
}

const checkoutSchema = yup.object().shape({
  hName: yup.string().required("required"),
  hEmail: yup.string().email("invalid email").required("required"),
  hlLatitude: yup.string().required("required"),
  hlLongitude: yup.string().required("required"),
  hAddress: yup.string().required("required"),
});

const initialValues = {
  hName: "",
  hEmail: "",
  hlLatitude: "",
  hlLongitude: "",
  hAddress: "",
};