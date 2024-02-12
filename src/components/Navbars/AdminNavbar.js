import React, { useContext } from "react";
import classNames from "classnames";
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
  InputGroup,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  Modal,
  NavbarToggler,
  ModalHeader,
} from "reactstrap";
import { ThemeContext, themes } from "contexts/ThemeContext";
import { Link, useLocation } from "react-router-dom";

function AdminNavbar(props) {
  const [collapseOpen, setcollapseOpen] = React.useState(false);
  const [modalSearch, setmodalSearch] = React.useState(false);
  const [color, setcolor] = React.useState("navbar-transparent");
  const location = useLocation();
  const currentPath = location.pathname;


  const getRoleFromPath = (path) => {
    if (path.includes("/super/")) {
      return "Super Admin";
    } else if (path.includes("/admin/")) {
      return "Hospital Admin";
    } else if (path.includes("/doctor/")) {
      return "Doctor";
    } else if (path.includes("/patient/")) {
      return "Patient";
    } else if (path.includes("/employee/")) {
      return "Employee";
    } else {
      return "";
    }
  };

  React.useEffect(() => {
    window.addEventListener("resize", updateColor);
    return function cleanup() {
      window.removeEventListener("resize", updateColor);
    };
  });
  const updateColor = () => {
    if (window.innerWidth < 993 && collapseOpen) {
      setcolor("bg-white");
    } else {
      setcolor("navbar-transparent");
    }
  };
  const toggleCollapse = () => {
    if (collapseOpen) {
      setcolor("navbar-transparent");
    } else {
      setcolor("bg-white");
    }
    setcollapseOpen(!collapseOpen);
  };
  const toggleModalSearch = () => {
    setmodalSearch(!modalSearch);
  };
  const { theme, changeTheme } = useContext(ThemeContext);

  const toggleTheme = (selectedTheme) => {
    changeTheme(selectedTheme);
  };

  const handleLogout = async () => {
    try {
      // Call the logout API
      const response = await fetch("http://localhost:5206/api/Admin_Cr/Logout", {
        method: 'POST',
        headers: {
          // Add any headers if needed
        },
      });

      if (response.ok) {
        // You can redirect the user to the login page or perform any other actions
        // Clear browser cache
      window.location.reload(true);
        // Example: Redirect to login page and replace the current history entry
        window.history.replaceState(null, '', '/admin/Login');
        // Force reload to ensure the new history entry is reflected
        window.location.reload();
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred during logout", error);
    }
  };

  return (
    <>
      <Navbar className={classNames("navbar-absolute", color)} expand="lg">

        <Container fluid>

          <div className="navbar-wrapper">
            <div
              className={classNames("navbar-toggle d-inline", {
                toggled: props.sidebarOpened,
              })}
            >

              <NavbarToggler onClick={props.toggleSidebar}>
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </NavbarToggler>
            </div>

            <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
              {props.brandText}
            </NavbarBrand>
          </div>

          <NavbarToggler onClick={toggleCollapse}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>

          <Collapse navbar isOpen={collapseOpen}>

            <Nav className="ml-auto" navbar>
            <div className="navbar-center" style={{ display: 'flex', marginTop: 'auto' ,justifyContent: 'center', alignItems: 'center', height: '100%' }}>
  <h3 style={{ textAlign: 'center', marginRight: '400px', marginBottom: '0px' }}>{getRoleFromPath(currentPath)}</h3>
</div>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Theme: {theme === themes.light ? "Light" : "Dark"}
                </DropdownToggle>
                <DropdownMenu right>

                  <DropdownItem onClick={() => toggleTheme(themes.light)}>
                    Light Mode
                  </DropdownItem>
                  <DropdownItem onClick={() => toggleTheme(themes.dark)}>
                    Dark Mode
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav>
        <DropdownToggle caret color="default" nav onClick={(e) => e.preventDefault()}>
          <div className="photo">
            <i className="tim-icons icon-single-02" />
          </div>
          <b className="caret d-none d-lg-block d-xl-block" />
          <p className="d-lg-none">Log out</p>
        </DropdownToggle>
        <DropdownMenu className="dropdown-navbar" right tag="ul">
          <NavLink tag="li">
          <Link onClick={handleLogout}>
              <DropdownItem className="nav-item">Log out</DropdownItem>
            </Link>
          </NavLink>
        </DropdownMenu>
      </UncontrolledDropdown>
              <li className="separator d-lg-none" />
            </Nav>

          </Collapse>

        </Container>

      </Navbar>

      <Modal
        modalClassName="modal-search"
        isOpen={modalSearch}
        toggle={toggleModalSearch}
      >
        <ModalHeader>
          <Input placeholder="SEARCH" type="text" />
          <button
            aria-label="Close"
            className="close"
            onClick={toggleModalSearch}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
        </ModalHeader>
      </Modal>
    </>
  );
}

export default AdminNavbar;
