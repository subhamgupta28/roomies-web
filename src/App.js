import theme from "./theme";
import './App.css';
import Home from "./compoments/Home";
import React, { useState } from "react";
import Login from "./compoments/Login";
import { AuthProvider } from "./compoments/AuthProvider";
import SignUp from "./compoments/SignUp";
import PrivateRoute from "./compoments/PrivateRoute";
import { Route, BrowserRouter } from "react-router-dom";
import { Paper, ThemeProvider, makeStyles } from "@material-ui/core";
import RoomCreation from "./compoments/RoomCreation";


const useStyles = makeStyles((theme) => ({
    app: {
        width: "100vw",
        height: "100vh",
    }
}));
function App() {
    const classes = useStyles();
    const [up, isUp] = useState("");

    return (
        <ThemeProvider theme={theme}>
            <Paper>
                <AuthProvider>
                    
                        <BrowserRouter basename={process.env.PUBLIC_URL}>

                            <PrivateRoute exact path="/" component={Home} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/signup" component={SignUp} />
                            <Route exact path="/room" component={RoomCreation} />

                        </BrowserRouter>
                 
                </AuthProvider>
                
            </Paper>
        </ThemeProvider>
    );
}

export default App;
