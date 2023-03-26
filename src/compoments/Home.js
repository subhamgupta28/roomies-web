import supabase from "../supabase";
import React from "react";
import {makeStyles, Paper} from "@material-ui/core";
import PrimaryAppBar from "./AppBar";
import Summary from "./Summary";
import SelectRoom from "./SelectRoom";
import BottomMenu from "./BottomMenu";
import RoomCreation from "./RoomCreation";


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
    const [userId, setUserId] = React.useState(null)
    const [roomId, setRoomId] = React.useState(null)

    async function fetchUser(uuid) {
        let {data: users, error} = await supabase
            .from('users')
            .select('*')
            .eq("pk_uuid", uuid)
        if (users) {
            console.log("user", users[0])
            setUserId(users[0].pk_uuid)
            setUser(prev => prev = users[0])
        }
    }

    async function fetchRoom(userId) {
        let {data: rooms, error} = await supabase
            .from('rooms')
            .select('*')
            .eq('fk_user_id', userId)
        setRooms(rooms)
    }

    async function fetchUuid() {
        const {data, error} = await supabase.auth.getSession()
        const id = data.session.user.id
        console.log(id)
        if (id) {
            await fetchUser(id)
            await fetchRoom(id)
        }
    }

    async function fetchRoomUsers() {
        if (userId && roomId) {
            let {data: users, error} = await supabase
                .from('users')
                .select('*')
                .eq("fk_room_id", roomId)

        }
    }

    React.useEffect(() => {
        if (currentRoom)
            setRoomId(currentRoom.pk_room_id)
    }, [currentRoom])
    React.useEffect(() => {
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
            <SelectRoom rooms={rooms} currentRoom={currentRoom} setCurrentRoom={setCurrentRoom}/>
            <PrimaryAppBar room={currentRoom} user={user}/>
            {rooms && <Summary room={currentRoom} user={user}/>}
            {rooms && <BottomMenu room={currentRoom} user={user}/>}
        </Paper>
    )
}