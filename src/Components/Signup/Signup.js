import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import Logo from "../../Assets/Logos/Classfresh(logo).png";
import { Form, Button } from "react-bootstrap";
import "../../css/Signup/Signup.css"

const Signup = () => {

    useEffect(()=>{
        document.title = "Classfresh:Create Account"
      },[])


  return (
    <div className="Signup-Main">
      <div className="Triangle"></div>
      <div className="Upper-Nav">
        <div className="Option-Div">
          Already have an account?
          <Link style={{textDecoration:"none"}} to={"/login"}>
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
                <Form>
                  <Form.Group className="mb-3 " controlId="formBasicEmail">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="name"
                      className="Input"
                      placeholder="Enter your Full Name"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 " controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      className="Input"
                      placeholder="Enter your email"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 " controlId="formBasicEmail">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control
                      type="phone"
                      className="Input"
                      placeholder="Enter your phone number"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Institute</Form.Label>
                    <Form.Control type="Institute" placeholder="Enter your Institute name" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="address" placeholder="Enter your Institute address" />
                  </Form.Group>
                  <div className="Button-Div">
                    <div className="Button">
                      <p>Create Account</p>
                    </div>
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
