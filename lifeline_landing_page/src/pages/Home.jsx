import React, { useEffect, useState } from "react";
import BarChart from "./BloodAvailability";
import Bot from "./Bot";
import Appointment from "./Appointment";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [searchResultsTable, setSearchResultsTable] = useState([]);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    if (searchTerm.trim() === "") {
      setSearchResults([]);
    } else {
      const results = services
        .filter((service) =>
          service.hsServices.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .reduce((uniqueResults, service) => {
          // Check if the service is already in uniqueResults
          if (
            !uniqueResults.some(
              (result) => result.hsServices === service.hsServices
            )
          ) {
            // If not, add it to uniqueResults
            uniqueResults.push(service);
          }
          return uniqueResults;
        }, []);

      setSearchResults(results);
    }
  };

  const handleServiceSelect = (selectedService) => {
    setSelectedService(selectedService);
    setSearchTerm(selectedService.hsServices); // Populate search bar
    setSearchResults([]); // Clear search results
  };

  const handleSearch = async () => {
    if (selectedService && userLocation) {
      try {
        // Reset previous info apart from user latitude and longitude
        setSelectedService(null);
        setSearchResults([]);
        setSearchResultsTable([]);

        const response = await fetch(
          "http://localhost:5206/api/HospitalServices/Search",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userLatitude: userLocation.latitude,
              userLongitude: userLocation.longitude,
              service: selectedService.hsServices,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          // Handle the response data as needed
          setSearchResultsTable(data);
        } else {
          console.error("Error fetching nearest hospital from API");
          // Show an error message
          setSearchResultsTable([]);
          setSearchResults([{ hsServices: "Error fetching data" }]);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const SearchResultList = ({ results }) => (
    <ul className="list-group list-group-flush">
      {results.map((service, index) => (
        <li
          className="list-group-item"
          key={index}
          onClick={() => handleServiceSelect(service)}
        >
          {service.hsServices}
        </li>
      ))}
    </ul>
  );

  //call services api

  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          "http://localhost:5206/api/HospitalServices"
        );

        if (response.ok) {
          const data = await response.json();
          setServices(data); // Assuming the API response is an array of services
        } else {
          console.error("Error fetching services from API");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchServices();
  }, []);

  const SearchResultsTable = ({ results }) => (
    <div className="row mt-3">
      {results.map((result, index) => (
        <div key={index} className="col-lg-6 col-md-6">
          <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center" style={{marginTop:'20px'}}>
            <div className="service-icon mb-4">
              <i className="fa fa-2x fa-user-md text-white" />
            </div>
            <h3 className="mb-3">{result.hName}</h3>
            <h5 className="m-0">{result.hAddress}</h5>
            <br />
            <h4 className="m-0" style={{ color: "red" }}>
              Distance: {result.distanceInKm.toFixed(2)} km
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
  /// end services api

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const position = await getCurrentLocation();
        setUserLocation(position.coords);
      } catch (error) {
        console.error("Error getting user location:", error);
      }
    };

    fetchLocation();
  }, []);

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject("Geolocation not available");
      }
    });
  };



  /// appountment end

  return (
    <div>
      <div>
        <Bot />
      </div>

      <div
        className="container-fluid py-5 mb-5 hero-header"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.3) !Important" }}
      >
        <div className="container py-5">
          <div className="row justify-content-start">
            <div className="col-lg-8 text-center text-lg-start">
              <h5
                className="d-inline-block text-primary text-uppercase border-bottom border-5"
                style={{ borderColor: "rgba(256, 256, 256, .3) !important" }}
              >
                Welcome
              </h5>
              <h1 className="display-1 text-white mb-md-4">
                To LifeLine <br />
                <br />
              </h1>
              <div className="pt-2"></div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container-fluid py-5">
          <div className="container">
            <div className="text-center mx-auto mb-5" style={{ maxWidth: 500 }}>
              <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">
                Our
              </h5>
              <h1 className="display-4">Excellent Services</h1>
            </div>
            <div className="row g-5">
              <div className="col-lg-4 col-md-6">
                <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                  <div className="service-icon mb-4">
                    <i className="fa fa-hospital-o text-white" style={{fontSize:'39px'}}/>
                  </div>
                  <h4 className="mb-3">Find Nearest Hospital</h4>
                  <p className="m-0">
                    Find the nearest hospital offering services you want for
                    your loved ones.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                  <div className="service-icon mb-4">
                    <i className="fa fa-tint text-white" style={{fontSize:'39px'}}/>
                  </div>
                  <h4 className="mb-3">Blood Availability Prediction</h4>
                  <p className="m-0">
                    Need blood urgently but don't know where to go? Not to
                    worry, our AI powered blood availability prediction has got
                    you covered.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                  <div className="service-icon mb-4">
                    <i className="fa fa-2x fa-stethoscope text-white" />
                  </div>
                  <h4 className="mb-3">Appointment</h4>
                  <p className="m-0">
                    Need to have a checkup? Our Insanely Fast Appointment
                    feature allows you to schedule appointments with the best
                    hospitals in your city.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                  <div className="service-icon mb-4">
                    <i className="fa fa-comments text-white" style={{fontSize:'39px'}}/>
                  </div>
                  <h4 className="mb-3">AI powered Chatbot</h4>
                  <p className="m-0">
                    Feeling ill? Don't worry, our chatbot has got you covered.
                    Trained on over 130 diseases, find out symptoms and possible
                    ways to cure it.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                  <div className="service-icon mb-4">
                    <i className="fa fa-flag-checkered text-white"  style={{fontSize:'39px'}}/>
                  </div>
                  <h4 className="mb-3">Medical Portfolio</h4>
                  <p className="m-0">
                    Review your overall medical history in a beautiful and
                    attractive medical portfolio generated through our powerful
                    AI.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                  <div className="service-icon mb-4">
                    <i className="fa fa-video-camera text-white" style={{fontSize:'39px'}}/>
                  </div>
                  <h4 className="mb-3">Video Appointment</h4>
                  <p className="m-0">
                    Have an appointment but cant't make it to the hospital? Dont
                    worry, our portal provides Video Calling feature which
                    allows you to connect with your doctor within seconds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BarChart />
        <br />
        <br />
        <div className="container-fluid bg-primary my-5 py-5">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: 500 }}>
            <h5 className="d-inline-block text-uppercase border-bottom border-5">
              Find
            </h5>
            <h1 className="display-4">
              Nearest Hospital With the Service you wish to avail
            </h1>
          </div>
          <div className="container py-5">
            <div className="mx-auto" style={{ width: "100%", maxWidth: 600 }}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control border-primary w-75"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="btn btn-dark border-0 w-25"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
              <div className="mt-3">
                {searchTerm !== "" && searchResults.length > 0 && (
                  <div className="card">
                    <div className="card-body p-0">
                      <SearchResultList results={searchResults} />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-9" style={{ display: "flex" }}>
              {searchTerm !== "" && searchResultsTable.length > 0 && (
                <SearchResultsTable results={searchResultsTable} />
              )}
            </div>
          </div>
        </div>


        <div className="container-fluid bg-primary my-3 py-5">
          <div className="container py-5">
            <div className="row gx-5">


<Appointment/>
        </div>
        {/* <a
          href="#"
          className="btn btn-lg btn-primary btn-lg-square back-to-top"
        >
          <i className="bi bi-arrow-up" />
        </a> */}
        </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
