import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
//import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import Login from "views/Login.js";
import Forgot from "views/Forgot";
import routes from "routes.js";
import logo from "assets/img/LOGO5.png";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";

var ps;

function EmployeeLayout(props) {
  const location = useLocation();
  const [userRole] = React.useState("employee");
  const mainPanelRef = React.useRef(null);
  const [sidebarOpened, setsidebarOpened] = React.useState(
    document.documentElement.className.indexOf("nav-open") !== -1
  );
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(mainPanelRef.current, {
        suppressScrollX: true,
      });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }

    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.classList.add("perfect-scrollbar-off");
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
    }
  }, [location]);

  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setsidebarOpened(!sidebarOpened);
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/employee") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };
  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  return (
    <BackgroundColorContext.Consumer>
      {({ color, changeColor }) => (
        <React.Fragment>
          <div className="wrapper">
            {!location.pathname.startsWith("/admin/Login") &&
              !location.pathname.startsWith("/admin/Forgot") && (
                <Sidebar
                  routes={routes}
                  logo={{
                    text: "LIFELINE",
                    imgSrc: logo,
                  }}
                  toggleSidebar={toggleSidebar}
                  userRole={userRole}
                />
              )}
            <div className="main-panel" ref={mainPanelRef} data={color}>
              {!location.pathname.startsWith("/admin/Login") &&
                !location.pathname.startsWith("/admin/Forgot") && (
                  <AdminNavbar
                    brandText={getBrandText(location.pathname)}
                    toggleSidebar={toggleSidebar}
                    sidebarOpened={sidebarOpened}
                  />
                )}
              <Routes>
                <Route path="/admin/Login" element={<Login />} />
                <Route path="/admin/Forgot" element={<Forgot />} />
                {getRoutes(routes)}
                <Route
                  path="/"
                  element={<Navigate to="/patient/Createappoint" replace />}
                />
              </Routes>
              {
                // Conditionally render Footer based on location
                location.pathname === "/admin/maps" ||
                location.pathname.startsWith("/admin/Login") ||
                location.pathname.startsWith("/admin/Forgot") ? null : (
                  <Footer fluid />
                )
              }
            </div>
          </div>
        </React.Fragment>
      )}
    </BackgroundColorContext.Consumer>
  );
}

export default EmployeeLayout;
