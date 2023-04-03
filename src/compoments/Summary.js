import {makeStyles} from "@material-ui/core/styles";
import React, {useEffect, useState} from "react";
import {Skeleton} from "@material-ui/lab";
import SummaryCard from "./SummaryCard";
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import {db} from "../FirebaseWork";

const chipStyle = makeStyles((theme) => ({
    root: {
        marginBottom: 12,
        borderRadius: 16,
        maxWidth: '95%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.01)',
        backdropFilter: 'blur(7px)',
        boxShadow:
            "0px 0px 30px 1px rgba(70,70,70,0.8)",
        alignItems: "center",
        justifyContent: 'center',
    },
    item: {
        margin: 6,
        flexWrap: 'wrap',
    },
    button: {
        marginBottom: 10,
    },
    text: {
        marginTop: 10,
        position: "relative",
        left: '-33%'
    },
    search: {
        margin: 8,
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        position: "relative",
        left: 20,
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1.0),
        },
    },
    auto: {
        width: 250
    },
    f: {
        justifyContent: "center",
        alignItems: "center",
    }


}));

export default function Summary({user, room}) {
    const [state, setState] = useState([])
    const classes = chipStyle();
    const [details, setDetails] = React.useState([]);

    useEffect(() => {

        const fetchData = async () => {
            if (room) {
                const todayDate = new Date()
                todayDate.setMinutes(0)
                todayDate.setHours(0)
                todayDate.setSeconds(0)
                const querySnapshot = query(collection(db, room.ROOM_ID),  where("TIME_STAMP", "<=", todayDate.getTime()));
                const unsubscribe = onSnapshot(querySnapshot, (querySnapshot) => {
                    const data = [];
                    querySnapshot.forEach((doc) => {
                        data.push(doc.data());
                    });
                    setDetails(data)
                    console.log(data)
                });


            }
        }
        fetchData().then(() => {

        });
    }, [room]);


    return (
        <div className={classes.item}>
            {details ? details.map((detail) =>
                <SummaryCard detail={detail}/>
            ) : (
                <Skeleton variant="rectangular" animation="wave"/>
            )}
        </div>
    );
}
