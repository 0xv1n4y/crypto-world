import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { CryptoState } from "../../CryptoContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setAlert}=CryptoState()

  const handleChange=async()=>{
    if(!email || !password){
      setAlert({open:true,message:"Please Fill All Fields", type:"error"})
    }
    try {
      const result =await signInWithEmailAndPassword(auth,email,password);
      setAlert({open:true,message:`Login Succesfully With ${result.user.email}`})
      handleClose()
      
    } catch (error) {
      setAlert({open:true,message:error.message,type:"error"})
      
    }


  }
  return (
    <div style={{ color: "red" }}>
      
      <Box
        p={3}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          backgroundColor:"#3E3A3A",
          color: "red",
        }}
      >
        <TextField
          variant="outlined"
          type="email"
          label="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        
        />
        <TextField
          variant="outlined"
          label="Enter Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <Button variant="contained" size='large' style={{color:"black",padding:"15px", backgroundColor:"gold",borderRadius:"10px"}} onClick={handleChange}>Login</Button>
      </Box>
    </div>
    
  );
};

export default Login;
