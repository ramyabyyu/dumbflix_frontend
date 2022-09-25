import React from "react";
import { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Button,
  Dropdown,
  Badge,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";
import dumbflixLogo from "../assets/images/dumbflix_logo.png";
import { useEffect } from "react";
import noPeople from "../assets/images/no-people.png";
import {
  FaMoneyBillAlt,
  FaSignOutAlt,
  FaFilm,
  FaMoneyBillWave,
  FaUserCircle,
} from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { GrMoney } from "react-icons/gr";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import * as Path from "../routeNames";

const Header = () => {
  // Modal
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [isLogin, setIsLogin] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    if (user) setIsLogin(true);
    else setIsLogin(false);
  }, [user, dispatch]);

  return (
    <Navbar variant="dark" bg="dark" expand="lg" className="sticky-sm-top">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} className="fw-bold" to="/">
              Home
            </Nav.Link>
            <Nav.Link className="fw-bold" to={Path.ALL_MOVIES} as={Link}>
              Show All Movies
            </Nav.Link>
          </Nav>
          <div>
            <Link className="navbar-brand text-danger" to="/">
              <img src={dumbflixLogo} alt="dumbflix" />
            </Link>
          </div>
          <Nav className="ms-auto">
            {isLogin ? (
              <Dropdown>
                <Dropdown.Toggle id="user-dropdown" variant="dark">
                  <img
                    src={user?.photo !== "-" ? user?.photo : noPeople}
                    alt="no people"
                    width={40}
                    className="rounded-pill"
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu variant="dark">
                  <Dropdown.Item as={Link} to={Path.PROFILE}>
                    {user?.is_admin ? (
                      <RiAdminFill className="text-danger me-2" />
                    ) : (
                      <FaUserCircle className="text-danger me-2" />
                    )}
                    <span>
                      Profile{" "}
                      {user?.is_admin && <Badge bg="danger">Admin</Badge>}
                    </span>
                  </Dropdown.Item>
                  {user?.is_admin ? (
                    <>
                      <Dropdown.Item as={Link} to={Path.ADD_FILM}>
                        <FaFilm className="text-danger me-2" />{" "}
                        <span>Add Film</span>
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to={Path.TRANSACTIONS}>
                        <FaMoneyBillWave className="text-danger me-2" />{" "}
                        <span>Transactions</span>
                      </Dropdown.Item>
                    </>
                  ) : (
                    <Dropdown.Item as={Link} to={Path.SUBSCRIBE}>
                      <FaMoneyBillAlt className="text-danger me-2" />{" "}
                      <span>Subscribe</span>
                    </Dropdown.Item>
                  )}
                  <Dropdown.Divider className="bg-secondary" />
                  <Dropdown.Item href="#" onClick={handleLogout}>
                    <FaSignOutAlt className="text-danger me-2" />
                    <span>Logout</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button variant="danger" onClick={handleShow}>
                Sign In
              </Button>
            )}
            <AuthModal show={show} handleClose={handleClose} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
