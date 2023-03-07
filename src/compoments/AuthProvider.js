import React, { useEffect, useState } from "react";
import supabase from "../supabase";
import {Backdrop, CircularProgress, makeStyles} from "@material-ui/core";


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
        supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                console.log("render", session)
                setCurrentUser(session.user)
                setPending(false)
            }
            if (event === 'SIGNED_OUT') {
                setCurrentUser(null)
            }
        })
    }, [])

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