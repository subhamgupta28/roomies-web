import React, {useCallback, useContext, useState} from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import {
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Container,
    CssBaseline,
    Grid,
    Link, makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import {AuthContext} from "./AuthProvider";
import firebase from '../FirebaseWork'
import {Redirect} from "react-router-dom";



function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/">
                Roomies
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    app: {
        width: "100%",
        height: "100vh",
        flexDirection: 'column',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
    },
    paper: {
        paddingTop: theme.spacing(2),
        padding: theme.spacing(4),
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        backgroundColor: 'rgba(180, 180, 255, 0.01)',
        backdropFilter: 'blur(7px)',
        boxShadow:
            "0px 0px 30px 1px rgba(70,70,70,0.8)",
        borderRadius: 20,
        // borderLeft: 'solid 1px rgba(255, 255, 255, 0.3)',
        // borderTop: 'solid 1px rgba(255, 255, 255, 0.3)',
    },
    avatar: {
        margin: theme.spacing(1),

    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    item: {
        borderRadius: 10,
        margin: 10,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    container: {
        paddingTop: 100,
        padding: theme.spacing(6),
    },
}));

export default function Login({history}) {
    const classes = useStyles();
    const [hide, setHide] = useState(false);
    const handleForgot = () => {
        //alert("h")
    }
    const handleLogin = useCallback(
        async event => {
            setHide(true);
            event.preventDefault();
            const {email, password} = event.target.elements;
            try {
                const auth = getAuth();
                signInWithEmailAndPassword(auth, email.value, password.value)
                    .then((userCredential) => {
                        // Signed in
                        const user = userCredential.user;
                        // ...
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                    });
                history.push("/");
            } catch (error) {
                alert(error);
                setHide(false)
            }
        },
        [history]
    );


    const {currentUser} = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/"/>;
    }
    return (
        <div className={classes.app}>
            <CssBaseline/>
            <Container maxWidth="sm" className={classes.container}>


                <div className={classes.paper}>
                    <img className={classes.avatar} height={'60px'}  alt={"image"}/>
                    <Typography component="h1" align={"center"} variant="h5">
                        Welcome back
                        <br/>
                        Login to continue
                    </Typography>
                    <form className={classes.form} onSubmit={handleLogin}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth

                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="password"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            LogIn

                        </Button>

                        <Grid container>
                            <Grid item xs>
                                <Link href="#" onClick={handleForgot} variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                    <Box mt={4}>
                        <Copyright/>
                    </Box>
                </div>

                <Backdrop className={classes.backdrop} open={hide}>
                    <CircularProgress color="secondary"/>
                </Backdrop>


            </Container>
        </div>
    );
}