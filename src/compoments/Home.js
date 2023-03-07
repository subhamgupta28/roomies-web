import supabase from "../supabase";
import React from "react";
import {makeStyles, Paper} from "@material-ui/core";
import PrimaryAppBar from "./AppBar";
import Summary from "./Summary";
import SelectRoom from "./SelectRoom";
import AddItem from "./AddItem";
import BottomMenu from "./BottomMenu";


const paperStyle = makeStyles((theme) => ({
    paper: {
        backgroundColor: 'rgba(0, 0, 255, 0.01)',
        height: "100%",
        width: "100%"
    }
}));
export default function Home() {
    const classes = paperStyle();
    const [user, setUser] = React.useState({})
    const [rooms, setRooms] = React.useState([])
    const [currentRoom, setCurrentRoom] = React.useState(null)


    React.useEffect(() => {
        const fetchUuid = async () => {
            const {data, error} = await supabase.auth.getSession()
            const id = data.session.user.id
            console.log(id)
            if (id) {
                await fetchUser(id)
                await fetchRoom(id)
            }
        }

        async function fetchUser(uuid) {
            let {data: users, error} = await supabase
                .from('users')
                .select('*')
                .eq("pk_uuid", uuid)
            console.log("user", users[0])
            setUser(prev => prev = users[0])
        }

        async function fetchRoom(userId) {
            let {data: rooms, error} = await supabase
                .from('rooms')
                .select('*')
                .eq('fk_user_id', userId)

            setRooms(rooms)
        }

        fetchUuid().then(r => {

        })
    }, [])
    React.useEffect(() => {
        if (rooms.length === 1) {
            setCurrentRoom(prev => prev = rooms[0])
        }
    }, [rooms])
    return (
        <Paper className={classes.paper}>
            <SelectRoom rooms={rooms}/>
            <PrimaryAppBar room={currentRoom} user={user}/>
            {rooms && <Summary room={currentRoom} user={user}/>}
            {rooms && <BottomMenu room={currentRoom} user={user}/>}

        </Paper>
    )
}