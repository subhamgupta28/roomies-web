import React from "react";
import { makeStyles, Paper } from "@material-ui/core";
import PrimaryAppBar from "./AppBar";
import Summary from "./Summary";
import "../App.css"
import SelectRoom from "./SelectRoom";
import BottomMenu from "./BottomMenu";
import RoomCreation from "./RoomCreation";
import DiffUser from "./DiffUser";
import { getDatabase, ref, onValue, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import ParticlesBg from "particles-bg";

const paperStyle = makeStyles((theme) => ({
    paper: {
        borderRadius: 0,
        height: "fit-content",
        width: "100vw",
        minHeight: "100vh"
    }
}));
export default function Home() {
    const classes = paperStyle();
    const [user, setUser] = React.useState({})
    const [rooms, setRooms] = React.useState([])
    const [currentRoom, setCurrentRoom] = React.useState(null)
    const [userId, setUserId] = React.useState(null)
    const [roomList, setRoomList] = React.useState([])
    const [roomIdVsRef, setRoomIdVsRef] = React.useState([])
    const [roomNameVsRef, setRoomNameVsRef] = React.useState([])
    const [currentRef, setCurrentRef] = React.useState("")
    const [roomMates, setRoomMates] = React.useState([]);

    const auth = getAuth();
    const uuid = auth.currentUser.uid
    const db = getDatabase();

    async function fetchUser() {
        const userRef = ref(db, 'ROOMIES/' + uuid);
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            console.log("user", data);
            setUser(perv => data)
            fetchRoom(data)
        });
    }

    async function fetchRoom(user) {
        let list = {};
        let roomIdRef = {};
        let roomNameRef = {};
        for (const key in user) {
            if (key.includes("ROOM_ID")) {
                roomIdRef = { ...roomIdRef, [key]: user[key] }
                await get(ref(db, "ROOMIES/ROOM/" + user[key])).then((snapshot) => {
                    const room = snapshot.val()
                    list = { ...list, [user[key]]: room }
                    roomNameRef = { ...roomNameRef, [room.ROOM_NAME]: key }
                })
            }
        }
        setRoomIdVsRef(roomIdRef)
        setRoomNameVsRef(roomNameRef)
        setCurrentRoom(list[roomIdRef[currentRef]])
        setRoomList(list)
    }


    async function fetchRoomUsers() {
        if (currentRoom) {
            const uuidList = [];
            var roommates = currentRoom.ROOM_MATES;//[ { uuu: iii } ]
            for (let i in roommates) {
                const uuid = roommates[i].uuid;
                console.log("roommates", uuid);
                uuidList.push(uuid);
            }
            setRoomMates(uuidList);
        }
    }
    React.useEffect(() => {
        fetchRoomUsers();
    }, [currentRoom])

    React.useEffect(() => {
        setCurrentRoom(roomList[roomIdVsRef[currentRef]])
        console.log(roomList[roomIdVsRef[currentRef]])

    }, [currentRef])
    React.useEffect(() => {
        fetchUser().then(r => {

        })
    }, [])
    React.useEffect(() => {
        if (rooms.length === 1) {
            setCurrentRoom(prev => prev = rooms[0])
        }
    }, [rooms])
    return (
        <Paper className={classes.paper}>
            <div className="App">
                <SelectRoom roomNameVsRef={roomNameVsRef} currentRef={currentRef} setCurrentRef={setCurrentRef} />
                <PrimaryAppBar room={currentRoom} user={user} />
                {rooms && <Summary room={currentRoom} user={user} />}
                {rooms && <BottomMenu room={currentRoom} user={user} />}
                <DiffUser roomMates={roomMates} room={currentRoom} user={user} />
            </div>
            {/* <ParticlesBg  type="cobweb" color="#FF2626" bg={true} /> */}
        </Paper>
    )
}