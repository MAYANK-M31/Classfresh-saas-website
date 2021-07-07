import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../../Assets/Logos/Classfresh(logo).png";
import { Form, Button } from "react-bootstrap";
import "../../css/Signup/Signup.css";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { URL } from "../../URL/URL";

const Signup = () => {
  const [name, setname] = useState("");
  const [contact, setcontact] = useState("");
  const [email, setemail] = useState("");
  const [institute, setinstitute] = useState("");
  const [address, setaddress] = useState("");
  const [alert, setalert] = useState(false);
  const [alertdata, setalertdata] = useState(null);
  const [Loader, setLoader] = useState(false);

  useEffect(() => {
    document.title = "Classfresh:Create Account";
  }, []);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const Data = {
      name: name,
      email: email,
      contact: contact,
      institute: institute,
      address: address,
    };
    setLoader(true);
    await axios.post(`${URL}/signup`, Data).then((res) => {
      if (res.data.status == 200) {
        window.location = "http://easycap.in";
        setLoader(true);
      } else {
        setalert(true);
        setalertdata(res.data.message);
        setLoader(false);
      }
    });
  };

  return (
    <div className="Signup-Main">
      <div className="Triangle"></div>
      <div className="Upper-Nav">
        <div className="Option-Div">
          Already have an account?
          <Link style={{ textDecoration: "none" }} to={"/login"}>
            <div className="Nav-Button">Login</div>
          </Link>
        </div>
      </div>
      <div className="Vertical-Line" />

      <div className="Cover-Div">
        <div className="Outer-Div">
          <div className="Inner-Div">
            <div className="Form-Box-Outer-Div">
              <div className="Logo-Div">
                <img style={{ width: "221px", height: "67px" }} src={Logo} />
              </div>
              <div className="Inside-Form-Div">
                <Form onSubmit={(e) => HandleSubmit(e)}>
                  <Form.Group className="mb-3 " controlId="formBasicName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="name"
                      className="Input"
                      placeholder="Enter your Full Name"
                      value={name}
                      onChange={(e) => {
                        setname(e.target.value);
                      }}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 " controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      className="Input"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => {
                        setemail(e.target.value);
                      }}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 " controlId="formBasicContact">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control
                      type="phone"
                      className="Input"
                      placeholder="Enter your phone number"
                      value={contact}
                      onChange={(e) => {
                        setcontact(e.target.value);
                      }}
                      required
                    />
                    {/* <PhoneInput
                      inputProps={{
                        required: true,
                      }}
                      className="Input"
                      country={"us"}
                     
                    /> */}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Institute</Form.Label>
                    <Form.Control
                      type="Institute"
                      placeholder="Enter your Institute name"
                      value={institute}
                      onChange={(e) => {
                        setinstitute(e.target.value);
                      }}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="address"
                      placeholder="Enter your Institute address"
                      value={address}
                      onChange={(e) => {
                        setaddress(e.target.value);
                      }}
                      required
                    />

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
                      <span style={{ color: "#ed5f74" }}>{alertdata}</span>
                    </div>
                  </Form.Group>
                  <div className="Button-Div">
                    <button disabled={Loader} style={{opacity:Loader ? 0.5 : 1}} className="Button">
                      {Loader ? <p>Loading...</p> : <p>Create Account</p>}
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

export default Signup;
