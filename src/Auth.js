import React, { useState } from "react";
import {Box,Button, TextField, Typography} from "@mui/material"

const Auth =()=>{
    const [isSignup,setIsSignup]=useState('false')
    const [Inputs,setInputs]=useState({
        name:" ",
        email:" ",
        password:" ",
    })
    const [responseMessage, setResponseMessage] = useState("");
    // console.log(isSignup)
    const handlechange = (e) => {
        setInputs((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      }
      const handlesubmit=async(e)=>{
        e.preventDefault();
        console.log(Inputs)
        try {
            const response = await fetch('http://127.0.0.1:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Inputs)
            });
            const data = await response.json();
            setResponseMessage(data.message);
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
       }
     }
    return(
        <div>
            <form onSubmit={handlesubmit}>
            
                <Box 
                display="flex" 
                flexDirection={"column"}
                maxWidth={400}
                alignItems={"center"}
                justifyContent={"center"}
                margin="auto"
                marginTop={5}
                padding={3}
                borderRadius={5}
                boxShadow={"5px 5px 10px #ccc"}
                sx={{
                    ":hover":{
                        boxShadow:"10px 10px 20px #ccc"

                    }
                    
                }}

                >
             
                <Typography variant="h3" padding={3} textAlign={"center"}>{isSignup?"Signup":"Login"}</Typography>
                {isSignup && (<TextField
                onChange={handlechange}
                name ="name"
                value={Inputs.name}
                margin="normal" 
                type={"text"} 
                variant="outlined" 
                placeholder="Name"/>
                )}
                <TextField
                onChange={handlechange}
                 name="email" 
                 value={Inputs.email}
                 margin="normal" 
                 type={"email"}
                 variant="outlined" placeholder="Email" />
                <TextField
                onChange={handlechange}
                 name="password"
                 value={Inputs.password} 
                 margin="normal" 
                 type={"password"} 
                 variant="outlined" 
                 placeholder="Password"/>
                <Button type ="submit" sx={{marginTop:3, borderRadius:3}} variant="contained" color="warning">{isSignup?"Signup":"Login"}</Button>
                <Button onClick={()=>setIsSignup(!isSignup)} sx={{marginTop:1, borderRadius:3}}>Change To {isSignup?"Login":"Signup"}</Button>
                </Box>
                </form>
                {responseMessage && (
                <Typography variant="body1" textAlign="center" marginTop={3}>
                    {responseMessage}
                </Typography>
            )}
         
        </div>
    )
}
export default Auth;