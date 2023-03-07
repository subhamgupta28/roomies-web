import {Button, makeStyles, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import supabase from "../supabase";
import AddItem from "./AddItem";

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
                let {data: details, error} = await supabase
                    .from('details')
                    .select("*")
                    .eq('fk_room_id', room.pk_room_id)
                    .eq('deleted', false)
                const amount  = details.map((detail)=> detail.amount_paid).reduce((prev, next)=> prev+next,  0)
                console.log("amount",amount)
                setTotal(amount)
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