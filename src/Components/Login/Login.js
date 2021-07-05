import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import "../../css/Login/Login.css";
import Logo from "../../Assets/Logos/Classfresh(logo).png";
import { Form, Button } from "react-bootstrap";

const Login = () => {

  const Login =()=>{
    window.location = "http://console.localhost:3000/"
  }

  useEffect(()=>{
    document.title = "Classfresh:Log in"
  },[])

  return (
    <div className="Login-Main">
      <div className="Triangle"></div>
      <div className="Upper-Nav">
        <div className="Option-Div">
          Don't have account?
          <Link style={{textDecoration:"none"}} to={"/signup"}>
          <div  className="Nav-Button">Signup</div>
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
                    <Form.Label>Email/Contact</Form.Label>
                    <Form.Control
                      type="email"
                      className="Input"
                      placeholder="Enter email / contact"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  <div onClick={()=>Login()} className="Button-Div">
                 
                    <div className="Button">
                      <p>Login</p>
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

export default Login;
