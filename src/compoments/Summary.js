import {makeStyles} from "@material-ui/core/styles";
import React, {useEffect, useState} from "react";
import supabase from "../supabase";
import {Skeleton} from "@material-ui/lab";
import SummaryCard from "./SummaryCard";

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
    const [detailsList, setDetailsList] = useState([]);
    const [state, setState] = useState([])
    const classes = chipStyle();
    supabase
        .channel('any')
        .on('postgres_changes', {event: '*', schema: 'public', table: 'details'}, payload => {
            setState(payload)
        })
        .subscribe()
    useEffect(() => {
        const fetchData = async () => {
            if (room) {
                const todayDate = new Date()
                todayDate.setMinutes(0)
                todayDate.setHours(0)
                todayDate.setSeconds(0)
                let {data: details, error} = await supabase
                    .from('details')
                    .select("*")
                    .eq('fk_room_id', room.pk_room_id)
                    .eq('deleted', false)
                    // .gt('timestamp', todayDate.getTime())
                details = details.sort((a,b)=>b.timestamp-a.timestamp)
                setDetailsList(details)
            }
        }
        fetchData().then(() => {

        });
    }, [room, state]);


    return (
        <div className={classes.item}>
            {detailsList ? detailsList.map((detail) =>
                <SummaryCard detail={detail}/>
            ) : (
                <Skeleton variant="rectangular" animation="wave"/>
            )}
        </div>
    );
}
