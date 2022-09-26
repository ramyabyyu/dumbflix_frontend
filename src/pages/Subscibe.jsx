import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { FaPaperclip } from "react-icons/fa";
import "../assets/css/Subscribe.modules.css";
import { useSelector, useDispatch } from "react-redux";
import { json, useNavigate } from "react-router-dom";
import {
  createTransaction,
  reset,
} from "../features/transaction/transactionSlice";
import * as Path from "../routeNames";
import { API } from "../config/api";

const Subscibe = () => {
  const { transactions, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.transaction
  );

  const { user } = useSelector((state) => state.auth);

  console.log("user=", user.token);

  const hiddenFileInput = useRef(null);

  const handleFileInput = (e) => hiddenFileInput.current.click();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;
    // const myMidtransClientKey = "SB-Mid-client-ItYKMqL2lC-ARs2N";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handleBuy = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.set("user_id", user?.id);

      const response = await API.post("/transaction", formData);
      console.log(response);

      const token = response.data.data.token;

      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          navigate(Path.PROFILE);
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          navigate(Path.SUBSCRIBE);
        },
        onError: function (result) {
          /* You may add your own implementation here */
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("You closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="rounded shadow bg-dark text-white border-0">
            <h3 className="text-center fw-bold mb-5">Premium</h3>
            <p className=" p-0 text-center">
              Pay now and enjoy streaming film on{" "}
              <span className="fw-bold text-danger text-uppercase">
                Dumbflix
              </span>
            </p>
            <p className="m-0 p-0 fw-bold text-center">
              <span className="fw-bold text-danger text-uppercase">
                Dumbflix
              </span>{" "}
              : 08123123123
            </p>
            <Form className="mt-5 w-50 mx-auto">
              <input
                name="user_id"
                id="user_id"
                className="d-none"
                value={user?.id}
              />
              <div>
                <Button
                  type="button"
                  variant="danger"
                  className="w-100 fw-bold"
                  onClick={handleBuy}
                >
                  Pay IDR 30.000,00-,
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Subscibe;
