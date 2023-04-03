import React, { useEffect, useState } from "react";
import {Backdrop, CircularProgress, makeStyles} from "@material-ui/core";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthContext = React.createContext();
const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user)
                setPending(false)
            }
        });
    }, []);

    if (pending) {
        return (
            <Backdrop className={classes.backdrop} open={true}>
                <CircularProgress color="secondary" />
            </Backdrop>
        )
    }


    return (
        <AuthContext.Provider
            value={{
                currentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};