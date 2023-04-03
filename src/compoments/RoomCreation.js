import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import {makeStyles, TextField} from "@material-ui/core";


function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));
export default function RoomCreation({room, user}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false)
    const [roomName, setRoomName] = React.useState(null)
    const [limit, setLimit] = React.useState(null)
    const [roomId, setRoomId] = React.useState(null)

    const handleClose = () => {
        setOpen(false);
    };
    const saveDetail = async (item) => {
        // const {data, error} = await supabase
        //     .from('rooms')
        //     .insert([
        //         item
        //     ])
        console.log("saved", user)
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
        if (roomId){
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
        <div>
            <Button color="primary" onClick={()=>setOpen(true)}>
                Add Room
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">
                    Join or Create new room
                </DialogTitle>
                <DialogContent>
                    Create new Room
                    <form className={classes.root}>
                        <TextField
                            required
                            onChange={(d) => setRoomName(d.target.value)}
                            id="outlined-required"
                            label="Choose Room Name"
                            variant="outlined"
                        />
                        <TextField
                            required
                            onChange={(d) => setLimit(d.target.value)}
                            id="outlined-disabled"
                            label="Limit Person"
                            variant="outlined"
                        />
                        <Button color="primary" onClick={handleCreateNewRoom}>
                            Create
                        </Button>
                    </form>
                    Join existing room
                    <form className={classes.root}>
                        <TextField
                            onChange={(d) => setRoomId(d.target.value)}
                            id="outlined-password-input"
                            label="Enter Room Id"
                            variant="outlined"
                        />
                        <Button autoFocus onClick={handleJoinRoom} color="primary">
                            Enter
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
