import {Button, makeStyles, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import AddItem from "./AddItem";
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import {db} from "../FirebaseWork";

const style = makeStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}));
export default function BottomMenu({room, user}){
    const classes = style();
    const [open, setOpen] = React.useState(false)
    const [total, setTotal] = useState(0);
    useEffect(() => {

        const fetchData = async () => {
            if (room) {
                const querySnapshot = query(collection(db, room.ROOM_ID));
                onSnapshot(querySnapshot, (querySnapshot) => {
                    const data = [];
                    querySnapshot.forEach((doc) => {
                        data.push(doc.data());
                    });
                    setTotal(data.length)
                    console.log(data)
                });
            }
        }
        fetchData().then(() => {

        });
    }, [room]);
    return(
        <div className={classes.root}>
            <AddItem room={room} user={user} open={open} setOpen={setOpen}/>
            <Button onClick={()=>setOpen(!open)}>
                Add Item
            </Button>
            <Typography variant="body2">
                Total Spending {total}
            </Typography>
        </div>
    )



}