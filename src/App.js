
import theme from "./theme";
import Home from "./compoments/Home";
import React from "react";
import Login from "./compoments/Login";
import {AuthProvider} from "./compoments/AuthProvider";
import SignUp from "./compoments/SignUp";
import PrivateRoute from "./compoments/PrivateRoute";
import {Route, BrowserRouter} from "react-router-dom";
import {Paper, ThemeProvider} from "@material-ui/core";


function App() {
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <BrowserRouter basename={process.env.PUBLIC_URL}>
                    <Paper>
                        <PrivateRoute exact path="/" component={Home}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/signup" component={SignUp}/>
                    </Paper>
                </BrowserRouter>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
