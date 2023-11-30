import React, { useContext, useState } from "react";
import "../styles/LoginSignup.css";

import HttpsTwoToneIcon from "@mui/icons-material/HttpsTwoTone";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import { Button, Snackbar, TextField } from "@mui/material";

import { useGlobalContext } from "../hooks/useGlobalContext";
import { useNavigate } from "react-router-dom";

import { AUTH_OTP_GENERATE_ENDPOINT, AUTH_OTP_VERIFY_ENDPOINT } from "../constants/endpoints";
import { LOCALSTORAGE } from "../constants/variables";

export const LoginSignup = () => {
  const [action, setAction] = useState("Send OTP");
  const [email, setEmail] = useState("");
  const [tempToken, setTempToken] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");

  const { setUser, setToken } = useContext(useGlobalContext);

  const navigate = useNavigate();

  const handleClick = async () => {
    if (action === "Send OTP") {
      await fetch(AUTH_OTP_GENERATE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "OTP is sent") {
            setAction("Login");
            setTempToken(data.token);
          }
          setMessage(data.message);
          setOpen(true);
        });
    } else if (action === "Login") {
      console.log(otp, tempToken);
      await fetch(AUTH_OTP_VERIFY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp, token: tempToken }),
      })
        .then((res) => res.json())
        .then((data) => {
          setMessage(data.message);
          setOpen(true);
          if (data.isVerified) {
            const localData = JSON.parse(localStorage.getItem(LOCALSTORAGE)) || {};
            localStorage.setItem(LOCALSTORAGE, JSON.stringify({ ...localData, token: data.token }));
            setUser(data.user);
            setToken(data.token);
            navigate("/");
          } else {
            setAction("Send OTP");
          }
        });
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <EmailTwoToneIcon />
          <TextField
            type="email"
            placeholder="Email Id"
            sx={{
              "& fieldset": {
                border: "none",
              },
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {message === "OTP is sent" && (
          <div className="input">
            <HttpsTwoToneIcon />
            <TextField
              type="number"
              placeholder="enter your OTP"
              sx={{
                "& fieldset": {
                  border: "none",
                },
              }}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
        )}
        <Button
          variant="outlined"
          sx={{
            color: "#4c00b4",
            borderColor: "#4c00b4",
            mx: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50px",
            width: "80%",
            height: "59px",
            fontSize: "1.3em",
            fontWeight: "700",
            cursor: "pointer",
            mt: 4,
          }}
          onClick={handleClick}
        >
          {action}
        </Button>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)} message={message} />
    </div>
  );
};
export default LoginSignup;
