import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "../../css/Login/Login.css";
import Logo from "../../Assets/Logos/Classfresh(logo).png";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { URL } from "../../URL/URL";

import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";

import { useCookies } from "react-cookie";

const Loadercss = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  margin-top: 6px;
`;

const Login = () => {
  const [loginId, setloginId] = useState("");
  const [password, setpassword] = useState("");
  const [alert, setalert] = useState(false);
  const [alertdata, setalertdata] = useState(null);
  const [Loader, setLoader] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies(["appSession"]);

  // const Login =()=>{
  //   window.location = "http://console.localhost:3000/"
  // }

  useEffect(() => {
    document.title = "Classfresh:Log in";
  }, []);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const Data = {
      email: loginId,
      contact: loginId,
      password: password,
    };
    setLoader(true);
    await axios
      .post(`${URL}/login`, Data)
      .then(async (res) => {
        // console.log(res.data);
        if (res.data.status == 200) {

          // var expiryDate = new Date(Date.now()); 

          // setCookie("access_token", res.data.payload.access_token, {
          //   path: "/",
          //   expires: expiryDate,
          // });

          console.log(cookies.access_token);
          // window.location = "http://console.localhost:3000/";
        } else {
          
          setalert(true);
          setalertdata(res.data.message);
          setLoader(false);
        }
      }).catch((err) => {
        console.log(err)
        setalert(true);
        setalertdata("Something went wrong");
        setLoader(false);
      });
  };

  return (
    <div className="Login-Main">
      <div className="Triangle"></div>
      <div className="Upper-Nav">
        <div className="Option-Div">
          Don't have account?
          <Link style={{ textDecoration: "none" }} to={"/signup"}>
            <div className="Nav-Button">Signup</div>
          </Link>
        </div>
      </div>
      <div className="Vertical-Line" />

      <div className="Cover-Div">
        <div className="Outer-Div">
          <div className="Inner-Div">
            <div
              className={
                alert ? "Form-Box-Outer-Div-Alert" : "Form-Box-Outer-Div"
              }
            >
              <div className="Logo-Div">
                <img style={{ width: "221px", height: "67px" }} src={Logo} />
              </div>
              <div hidden={!alert} className="Form-Alert-Div">
                <svg
                  aria-hidden="true"
                  height="15"
                  width="15"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.115 1.308l5.635 11.269A2.365 2.365 0 0 1 13.634 16H2.365A2.365 2.365 0 0 1 .25 12.577L5.884 1.308a2.365 2.365 0 0 1 4.231 0zM8 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM8 9c.552 0 1-.32 1-.714V4.714C9 4.32 8.552 4 8 4s-1 .32-1 .714v3.572C7 8.68 7.448 9 8 9z"
                    fill="#ed5f74"
                  ></path>
                </svg>
                <span style={{ color: "#ed5f74", marginLeft: "10px" }}>
                  {" "}
                  {alertdata}
                </span>
              </div>
              <div className="Inside-Form-Div">
                <Form onSubmit={(e) => HandleSubmit(e)}>
                  <Form.Group className="mb-3 " controlId="formBasicEmail">
                    <Form.Label>Email/Contact</Form.Label>
                    <Form.Control
                      name="email"
                      className="Input"
                      placeholder="Enter email / contact"
                      value={loginId}
                      onChange={(e) => {
                        setloginId(e.target.value);
                      }}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Label style={{ color: "#2F66FC", float: "right" }}>
                      Forgot Password?
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setpassword(e.target.value);
                      }}
                      required
                    />
                  </Form.Group>

                  <div className="Button-Div">
                    <button
                      disabled={Loader}
                      style={{ opacity: Loader ? 0.5 : 1 }}
                      className="Button"
                    >
                      {Loader ? (
                        <PulseLoader
                          color={"white"}
                          loading={true}
                          css={Loadercss}
                          size={8}
                          margin={3}
                        />
                      ) : (
                        <p>Login</p>
                      )}
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
