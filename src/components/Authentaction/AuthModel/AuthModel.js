import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./AuthModel.css"
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { AppBar, Tab, Tabs } from "@material-ui/core";

import Login from "../Login";
import Signup from "../Signup";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { CryptoState } from "../../../CryptoContext";
import { auth } from "../../../firebase";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "10px",
  width: 400,
  bgcolor: "#3E3A3A",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  color: "white",
};

const AuthModel = () => {

  const { setAlert } = CryptoState();



  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 
  const googleProvider = new GoogleAuthProvider();

  const gooleWithSignup = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Sign up Succesfully Welcome ${res.user.email}`,
          type: "success",
        });
        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
        return;
      });
  };
  return (
    <div>
      <Button
        onClick={handleOpen}
        style={{
          width: 90,
          background: "White",
          color: "black",
          marginLeft: "30px",
          bordeeRadius: "10px",
        }}
      >
        Login
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AppBar position="static" style={{ backgroundColor: "black" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Login" />
              <Tab label="signup" />
            </Tabs>
          </AppBar>
          {value === 0 && <Login handleClose={handleClose} />}
          {value === 1 && <Signup handleClose={handleClose} />}
          <Box className="google">
            <span>OR</span>
            <GoogleButton onClick={gooleWithSignup} />
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default AuthModel;
