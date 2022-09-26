import React from "react";
import { useEffect } from "react";
import {
  Dropdown,
  Form,
  Table,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getTransactions,
  reset,
} from "../../features/transaction/transactionSlice";
import {
  getProfile,
  reset as profileReset,
} from "../../features/profile/profileSlice";
import LoadingSpinner from "../../components/LoadingSpinner";
import * as Path from "../../routeNames";
import moment from "moment";

function Transactions() {
  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);
  const { transactions, isSuccess, isLoading } = useSelector(
    (state) => state.transaction
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.is_admin) {
      dispatch(getTransactions());
      dispatch(getProfile());
    } else {
      navigate(Path.HOME);
    }

    return () => {
      dispatch(reset());
      dispatch(profileReset());
    };
  }, [navigate, dispatch, user]);

  const countDuration = (startDate, dueDate) => {
    const due = new Date(dueDate);
    startDate = new Date();

    let duration;

    if (startDate < due) {
      duration = new Date(due - startDate);
    }

    let years = duration.getFullYear() - 1970;
    let months = duration.getMonth();
    let days = duration.getDate();

    let yearTxt = "year";
    let monthTxt = "month";
    let dayTxt = "day";

    if (years > 1) yearTxt += "s";
    if (months > 1) monthTxt += "s";
    if (days > 1) dayTxt += "s";

    if (years >= 1) {
      duration = `${years} ${yearTxt} ${months} ${monthTxt} ${days} ${dayTxt}`;
    } else if (months >= 1) {
      duration = `${months} ${monthTxt} ${days} ${dayTxt}`;
    } else {
      duration = `${days} ${dayTxt}`;
    }
    return duration;
  };

  if (isLoading) {
    return <LoadingSpinner size="big" />;
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={12}>
          <Card className="rounded shadow border-0 bg-dark text-white p-3">
            <h6 className="text-light mb-4 mx-4">Transactions List</h6>
            <Table striped bordered hover variant="dark">
              <thead style={{ height: "60px" }}>
                <tr className="text-danger text-center align-items-center">
                  <th>No</th>
                  <th>Email</th>
                  <th>Proof of Transfer</th>
                  <th>Duration</th>
                  <th>Status Payment</th>
                  <th style={{ width: "60px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length < 1 ? (
                  <tr style={{ height: "60px" }} className="text-center">
                    <td colSpan={9}>
                      <p className="mt-1">No Transaction Available</p>
                    </td>
                  </tr>
                ) : (
                  <>
                    {transactions?.map((transaction, index) => (
                      <tr
                        style={{ height: "60px" }}
                        className="text-center"
                        key={index}
                      >
                        <td>{index + 1}</td>
                        <td>{transaction.email}</td>
                        <td>
                          <img
                            src={transaction.attache}
                            alt="attache"
                            width={80}
                          />
                        </td>
                        <td>
                          {countDuration(
                            transaction.startdate,
                            transaction.duedate
                          )}
                        </td>
                        <td
                          className={
                            transaction.status === "pending"
                              ? "text-warning"
                              : transaction.status === "success"
                              ? "text-success"
                              : "text-danger"
                          }
                        >
                          {transaction.status}
                        </td>
                        <td>
                          <Dropdown>
                            <Dropdown.Toggle variant="dark"></Dropdown.Toggle>
                            <Dropdown.Menu variant="dark">
                              <Form>
                                <Dropdown.Item>
                                  <input
                                    type="text"
                                    value="Approve"
                                    className="d-none"
                                  />
                                  <h6 className="text-success fw-bold">
                                    approve
                                  </h6>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <input
                                    type="text"
                                    value="Cancel"
                                    className="d-none"
                                  />
                                  <h6 className="text-danger fw-bold">
                                    cancel
                                  </h6>
                                </Dropdown.Item>
                              </Form>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Transactions;
