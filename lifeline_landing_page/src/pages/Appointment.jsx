import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Appointment() {
  const [dobPickerOpen, setDobPickerOpen] = useState(false);
  const [apptDatePickerOpen, setApptDatePickerOpen] = useState(false);

  const handleDOBChange = (date) => {
    setFormData((prevFormData) => ({ ...prevFormData, APatientDOB: date }));
    setDobPickerOpen(false);
  };

  const handleApptDateChange = (date) => {
    setFormData((prevFormData) => ({ ...prevFormData, ADate: date }));
    setApptDatePickerOpen(false);
  };

  const [formData, setFormData] = useState({
    APatientName: "",
    APatientDOB: "",
    ADate: "",
    ATime: "",
    adId: "",
    AType: "",
    AMobile: "",
    AEmail: "",
    AReason: "",
  });

  const [doctorsA, setDoctorsA] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDoctorsA = async (dhId) => {
    try {
      const response = await fetch(
        `http://localhost:5206/api/Doctors_Cr/ByHospitalId/${dhId}`
      );
      if (response.ok) {
        const doctorList = await response.json();
        setDoctorsA(doctorList);

          if (doctorList.length > 0) {
            setFormData((prevFormData) => ({
              ...prevFormData,
              adId: doctorList[0].dId,
            }));
          } else {
            setDoctorsA([]);          }


      } else {
        console.error(
          "Failed to fetch doctors:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("An error occurred while fetching doctors:", error);
    }
  };

  useEffect(() => {
    const fetchHospitalsA = async () => {
      try {
        const response = await fetch("http://localhost:5206/api/Hospital_Cr");
        if (response.ok) {
          const hospitalList = await response.json();
          setHospitals(hospitalList);
        } else {
          console.error(
            "Failed to fetch hospitals:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("An error occurred while fetching hospitals:", error);
      }
    };

    fetchHospitalsA();
  }, []);

  const handleSubmitA = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formattedData = {
        ...formData,
        APatientDOB: formatDate(formData.APatientDOB),
        ADate: formatDate(formData.ADate),
        ATime: formatTime(formData.ATime),
      };


      const response = await fetch("http://localhost:5206/api/appointment_cr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        setFormData({
          APatientName: "",
          APatientDOB: "",
          ADate: "",
          ATime: "",
          adId: "",
          AType: "",
          AMobile: "",
          AEmail: "",
          AReason: "",
        });
        setLoading(false);
        alert('Appointment request succesfull')
      } else {
        console.error(
          "Failed to create appointment:",
          response.status,
          response.statusText
        );
        setLoading(false);
      }
    } catch (error) {
      console.error("An error occurred during form submission:", error);
      setLoading(false);
    }
  };

  const handleInputChangeA = async (e) => {
    const { name, value } = e.target;

    const formattedValue =
      name === "APatientDOB" || name === "ADate" ? formatDate(value) : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: formattedValue,
    }));

    if (name === "ahId") {
      setDoctorsA([]);
      if (value) {
        try {
          const response = await fetch(
            `http://localhost:5206/api/Doctors_Cr/ByHospitalId/${value}`
          );

          if (response.ok) {
            const doctorList = await response.json();
            setDoctorsA(doctorList);

            if (doctorList.length > 0) {
              setFormData((prevFormData) => ({
                ...prevFormData,
                adId: doctorList[0].dId,
              }));
            } else {
              setDoctorsA([]);
              setFormData((prevFormData) => ({
                ...prevFormData,
                adId: "",
              }));
            }

          } else {
            console.error(
              "Failed to fetch doctors:",
              response.status,
              response.statusText
            );
          }
        } catch (error) {
          console.error("An error occurred while fetching doctors:", error);
        }
      }
    }

    if (name === "adId") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
    if (name === "ATime") {
      handleTimeChange(value);
    }
  };



  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Format as 'yyyy-mm-dd'
  };
  const handleTimeChange = (time) => {
    const formattedTime = `${time}:00.0000000`;

  };


  const formatTime = (timeString) => {
    return `${timeString}:00.0000000`;
  };


  return (
    <div className="container-fluid bg-primary my-3 py-5">
      <div className="container py-5">
        <div className="row gx-5">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="mb-4">
              <h5 className="d-inline-block text-white text-uppercase border-bottom border-5">
                Schedule
              </h5>
              <h1 className="display-4">An Appointment</h1>
            </div>
            <p className="text-white mb-5">
              Make an appointment with the hospital of your choice in your
              comfortable time
            </p>
          </div>

          <div className="col-lg-6">
            <div className="bg-white text-center rounded p-5">
              <h1 className="mb-4">Book An Appointment</h1>
              <form onSubmit={handleSubmitA}>
                <div className="row g-3">
                  <div className="col-12">
                    <input
                      type="text"
                      required
                      className="form-control bg-light border-0"
                      placeholder="Your Name"
                      style={{ height: 55 }}
                      name="APatientName"
                      value={formData.APatientName}
                      onChange={handleInputChangeA}
                    />
                  </div>
                  {/* <div className="col-12">
                  <TimePicker onChange={onChangeTime} value={valueTime} />
                  </div> */}
                  <div className="col-12">
                    <DatePicker
                      selected={formData.APatientDOB}
                      className="form-control bg-light border-0"
                      onChange={handleDOBChange}
                      placeholderText="Date Of Birth (mm/dd/yyyy)"
                      dateFormat="MM/dd/yyyy"
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      required
                      dropdownMode="select"
                      maxDate={new Date()}
                    />
                  </div>
                  <div className="col-12">
                    <DatePicker
                      selected={formData.ADate}
                      onChange={handleApptDateChange}
                      className="form-control bg-light border-0"
                      placeholderText="Select Appointment Date (mm/dd/yyyy)"
                      dateFormat="MM/dd/yyyy"
                      required
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      minDate={new Date()}
                    />
                  </div>
                  <div className="col-12">
                  <div className="col-12">
                  <input
            type="time"
            className="form-control bg-light border-0"
            id="appointment-time"
            name="ATime"
            value={formData.ATime}
            onChange={handleInputChangeA}
            step="60"
            required
          />
</div>


                  </div>
                  <div className="col-12">
                    <select
                      className="form-select bg-light border-0"
                      style={{ height: 55 }}
                      name="ahId"
                      required
                      value={formData.ahId}
                      onChange={handleInputChangeA}
                    >
                      <option disabled selected>
                        Select Hospital
                      </option>
                      {hospitals.map((hospital) => (
                        <option key={hospital.hId} value={hospital.hId}>
                          {hospital.hName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12">
                    <select
                      className="form-select bg-light border-0"
                      style={{ height: 55 }}
                      name="adId"
                      required
                      value={formData.adId || ""}
                      onChange={handleInputChangeA}
                    >
                      <option disabled selected>
                        Select Doctor
                      </option>
                      {doctorsA.map((doctor) => (
                        <option key={doctor.dId} value={doctor.dId}>
                          {doctor.dName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control bg-light border-0"
                      placeholder="Select Appointment Type"
                      style={{ height: 55 }}
                      name="AType"
                      required
                      value={formData.AType}
                      onChange={handleInputChangeA}
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="tel"
                      className="form-control bg-light border-0"
                      placeholder="Contact No."
                      style={{ height: 55 }}
                      name="AMobile"
                      required
                      value={formData.AMobile}
                      onChange={handleInputChangeA}
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="email"
                      className="form-control bg-light border-0"
                      placeholder="Your Email"
                      style={{ height: 55 }}
                      name="AEmail"
                      required
                      value={formData.AEmail}
                      onChange={handleInputChangeA}
                    />
                  </div>
                  <div className="col-12">
                    <textarea
                      className="form-control bg-light border-0"
                      placeholder="Appointment Reason"
                      style={{ height: 100 }}
                      name="AReason"
                      required
                      value={formData.AReason}
                      onChange={handleInputChangeA}
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3"
                      type="submit"
                    >
                      {loading ? "Sending..." : "Make an Appointment"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointment;
