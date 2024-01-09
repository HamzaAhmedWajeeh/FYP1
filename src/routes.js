import Profile from "views/Profile";
import Login from "views/Login";
import Forgot from "views/Forgot";
import AddPatientE from "views/AddPatientE";
import AppointmentE from "views/AppointmentE";
import BloodE from "views/BloodE";
import EmergencyE from "views/EmergencyE";
import VideoE from "views/VideoE";
import NotificationD from "views/NotificationD";
import PrescriptionD from "views/PrescriptionD";
import PatientD from "views/PatientD";
import AddDoctorH from "views/AddDoctorH";
import DashH from "views/DashH";
import AddEmployeeH from "views/AddEmployeeH";
import ProfileH from "views/ProfileH";
import DoctorH from "views/DoctorH";
import ViewPatientH from "views/ViewPatientH";
import HospitalS from "views/HospitalS";
import AddHospitalS from "views/AddHospitalS";
import MedicalPortfolioP from "views/MedicalPortfolioP";
import ViewServiceE from "views/ViewServiceE";
import ServicesE from "views/ServicesE";
import AddBloodE from "views/AddBloodE";
import PrescriptionHistory from "views/PrescriptionHistoryP";
import ResetPassword from "views/resetPassword";

var routes = [
  //Start Patient Components
  // {
  //   path: "/Appointment",
  //   name: "Appointments",
  //   icon: "tim-icons icon-bullet-list-67",
  //   component: <Appointment />,
  //   layout: "/patient",
  //   role: "patient",
  // },
  // {
  //   path: "/Createappoint",
  //   name: "Create Appointment",
  //   icon: "tim-icons icon-simple-add",
  //   component: <CreateAppoint />,
  //   layout: "/patient",
  //   role: "patient",
  // },
  {
    path: "/PrescriptionHistory",
    name: "Prescription History",
    icon: "tim-icons icon-simple-add",
    component: <PrescriptionHistory />,
    layout: "/patient",
    role: "patient",
  },
  // {
  //   path: "/Video",
  //   name: "Video Consultation",
  //   icon: "tim-icons icon-video-66",
  //   component: <Video />,
  //   layout: "/patient",
  //   role: "patient",
  // },
  {
    path: "/Portfolio",
    name: "Medical Portfolio",
    icon: "tim-icons icon-video-66",
    component: <MedicalPortfolioP />,
    layout: "/patient",
    role: "patient",
  },
  {
    path: "/Profile",
    name: "Profile",
    icon: "tim-icons icon-badge",
    component: <Profile />,
    layout: "/patient",
    role: "patient",
  },
  //{
//    path: "/Login",
//    name: "Login",
//    icon: "tim-icons icon-bullet-list-67",
//    component: <Login />,
//    layout: "/admin",
//    role: "patient",
//  },

  //End Patient Components
  //Start EmployeeComponents

  {
    path: "/AppointmentE",
    name: "Appointments",
    icon: "tim-icons icon-bullet-list-67",
    component: <AppointmentE />,
    layout: "/employee",
    role: "employee",
  },
  {
    path: "/BloodE",
    name: "Blood Availability",
    icon: "tim-icons icon-heart-2",
    component: <BloodE />,
    layout: "/employee",
    role: "employee",
  },
  {
    path: "/VideoE",
    name: "Video Consultation",
    icon: "tim-icons icon-video-66",
    component: <VideoE />,
    layout: "/employee",
    role: "employee",
  },
  {
    path: "/Addpatiente",
    name: "Add Patient",
    icon: "tim-icons icon-simple-add",
    component: <AddPatientE />,
    layout: "/employee",
    role: "employee",
  },
  // {
  //   path: "/Adddoctore",
  //   name: "Add Doctor",
  //   icon: "tim-icons icon-simple-add",
  //   component: <AddDoctorE />,
  //   layout: "/employee",
  //   role: "employee",
  // },
  {
    path: "/EmergencyE",
    name: "Emergency Contact",
    icon: "tim-icons icon-simple-add",
    component: <EmergencyE />,
    layout: "/employee",
    role: "employee",
  },
  {
    path: "/ViewServicesE",
    name: "Services",
    icon: "tim-icons icon-bullet-list-67",
    component: <ViewServiceE />,
    layout: "/employee",
    role: "employee",
  },
{
  path: "/ServicesE",
  name: "Add Service",
  icon: "tim-icons icon-simple-add",
  component: <ServicesE />,
  layout: "/employee",
  role: "employee",
},
{
  path: "/AddBloodE",
  name: "Add Blood",
  icon: "tim-icons icon-simple-add",
  component: <AddBloodE />,
  layout: "/employee",
  role: "employee",
  },
//  {
//    path: "/Login",
//    name: "Login",
//    icon: "tim-icons icon-bullet-list-67",
//    component: <Login />,
//    layout: "/admin",
//    role: "employee",
//  },


  //End Employee Components
  //Start Doctor Components
  {
    path: "/NotificationD",
    name: "Notification",
    icon: "tim-icons icon-bell-55",
    component: <NotificationD />,
    layout: "/doctor",
    role: "doctor",
  },
  {
    path: "/PrescriptionD/:pId",
    name: "Prescription",
    icon: "tim-icons icon-notes",
    component: <PrescriptionD />,
    layout: "/doctor",
    // role: "doctor",
  },
  // {
  //   path: "/MedicineD/:pId", // Include the parameter in the URL
  //   name: "Medicine",
  //   icon: "tim-icons icon-simple-add",
  //   component: <MedicineD />,
  //   layout: "/doctor",
  //   role: "doctor",
  // },
  {
    path: "/PatientD",
    name: "Patients",
    icon: "tim-icons icon-bullet-list-67",
    component: <PatientD />,
    layout: "/doctor",
    role: "doctor",
  },
//  {
//    path: "/Login",
//    name: "Login",
//    icon: "tim-icons icon-bullet-list-67",
//    component: <Login />,
//    layout: "/admin",
//    role: "doctor",
//  },


  //End Doctor Components
  //End Hospital Admin Components
  {
    path: "/DashH",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: <DashH />,
    layout: "/admin",
    role: "admin",
  },
  {
    path: "/DoctorH",
    name: "Doctors",
    icon: "tim-icons icon-single-02",
    component: <DoctorH />,
    layout: "/admin",
    role: "admin",
  },
  // {
  //   path: "/ReviewH",
  //   name: "Review",
  //   icon: "tim-icons icon-bulb-63",
  //   component: <ReviewH />,
  //   layout: "/admin",
  //   role: "admin",
  // },
  {
    path: "/ViewpatientH",
    name: "View Patients",
    icon: "tim-icons icon-bullet-list-67",
    component: <ViewPatientH />,
    layout: "/admin",
    role: "admin",
  },
  {
    path: "/AddemployeeH",
    name: "Add Employee",
    icon: "tim-icons icon-simple-add",
    component: <AddEmployeeH />,
    layout: "/admin",
    role: "admin",
  },
  {
    path: "/AdddoctorH",
    name: "Add Doctor",
    icon: "tim-icons icon-simple-add",
    component: <AddDoctorH />,
    layout: "/admin",
    role: "admin",
  },
  {
    path: "/ProfileH",
    name: "Profile",
    icon: "tim-icons icon-badge",
    component: <ProfileH />,
    layout: "/admin",
    role: "admin",
  },
  {
    path: "/Login",
    name: "Login",
    icon: "tim-icons icon-bullet-list-67",
    component: <Login />,
    layout: "/admin",
    //role: "admin",
  },
  {
    path: "/Forgot",
    name: "Forgot",
    icon: "tim-icons icon-bullet-list-67",
    component: <Forgot />,
    layout: "/admin",
    //role: "admin",
  },
  {
    path: "/Reset",
    name: "Reset",
    icon: "tim-icons icon-bullet-list-67",
    component: <ResetPassword />,
    layout: "/admin",
    //role: "admin",
  },
  //End Hospital Admin Components
  {
    path: "/HospitalS",
    name: "Hospitals",
    icon: "tim-icons icon-bullet-list-67",
    component: <HospitalS />,
    layout: "/super",
    role: "super",
  },
  {
    path: "/AddHospitalS",
    name: "Add Hospital",
    icon: "tim-icons icon-simple-add",
    component: <AddHospitalS />,
    layout: "/super",
    role: "super",
  },
];
export default routes;
