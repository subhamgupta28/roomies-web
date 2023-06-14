import React from 'react';
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
import { Redirect } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { getDatabase, ref, onValue, get } from "firebase/database";
import { getAuth } from "firebase/auth";

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
export default function RoomCreation() {
    const classes = useStyles();
    const [user, setUser] = React.useState({})
    const [open, setOpen] = React.useState(false)
    const [roomName, setRoomName] = React.useState(null)
    const [limit, setLimit] = React.useState(null)
    const [roomId, setRoomId] = React.useState(null)
    const [hide, setHide] = React.useState(false);
    const [newRef, setNewRef] = React.useState(null);
    const auth = getAuth();
    const uuid = auth.currentUser.uid
    const db = getDatabase();

    async function fetchUser() {
        const userRef = ref(db, 'ROOMIES/' + uuid);
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            console.log("user", data);
            setUser(perv => data)
            let count = []
            for (const key in data) {
                if (key.includes("ROOM_ID")) {
                    count.push(key.slice(-1));
                }
            }
            const max = Math.max(...count)
            setNewRef("ROOM_ID"+max)
            console.log("count",newRef)
        });
    }
    React.useEffect(()=>{
        fetchUser();
    },[])
    const handleClose = () => {
        setOpen(false);
    };
    const saveDetail = async (item) => {
        // const {data, error} = await supabase
        //     .from('rooms')
        //     .insert([
        //         item
        //     ])
        console.log("saved", item)
    }

    const handleCreateNewRoom = () => {
        if (roomName && limit) {
            const date = new Date()
            const dateStr = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay()
            const data = {
                pk_room_id: date.getTime(),
                create_date: dateStr,
                room_name: roomName,
                room_limit: limit,
                time: date.toDateString(),
                person_joined: 1,
                start_day_of_month: dateStr,
                fk_user_id: user.pk_uuid
            }
            console.log(data)
            saveDetail(data).then(() => {

            })
        }
    }
    const handleJoinRoom = () => {
        if (roomId) {
            const date = new Date()
            const dateStr = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay()
            const data = {
                pk_room_id: roomId,
                create_date: dateStr,
                room_name: "",
                room_limit: limit,
                time: date.toDateString(),
                person_joined: 1,
                start_day_of_month: dateStr,
                fk_user_id: user.pk_uuid
            }
            console.log(data)
            saveDetail(data).then(() => {

            })
        }

    }

    return (
        <div className={classes.app}>
            <CssBaseline />
            <Container maxWidth="sm" className={classes.container}>
                <div className={classes.paper}>
                    <Typography component="h1" align={"center"} variant="h5">
                        Join existing room
                    </Typography>
                    <div className={classes.form}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            onChange={(v)=>setRoomId(v.target.value)}
                            fullWidth
                            id="roomId"
                            label="Room Id"
                            name="roomId"
                            autoComplete="roomId"
                            autoFocus
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleJoinRoom}
                            className={classes.submit}
                        >
                            Enter Room
                        </Button>
                        <Typography component="h1" align={"center"} variant="h5">
                            Create room
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            onChange={(v)=>setRoomName(v.target.value)}
                            name="roomName"
                            label="Choose room name"
                            type="roomName"
                            id="roomName"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="limit"
                            onChange={(v)=>setLimit(v.target.value)}
                            label="Limit"
                            defaultValue={5}
                            type="limit"
                            id="limit"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            onClick={handleCreateNewRoom}
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Create room
                        </Button>
                    </div>
                </div>

                <Backdrop className={classes.backdrop} open={hide}>
                    <CircularProgress color="secondary" />
                </Backdrop>


            </Container>
        </div>
    );
}
