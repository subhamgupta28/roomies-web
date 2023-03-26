import React, {useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import {Chip} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Skeleton} from "@material-ui/lab";


function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}
const chipStyle = makeStyles((theme) => ({
    item: {
        margin: 6,
        flexWrap: 'wrap',
    },
}));

export default function SelectRoom({rooms, currentRoom, setCurrentRoom}) {
    const [open, setOpen] = React.useState(false)
    const classes = chipStyle();
    useEffect(() => {
        if (rooms.length > 1)
            setOpen(true)
    }, [rooms])
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">
                    Select Room
                </DialogTitle>
                <DialogContent>
                    <div className={classes.item}>
                    {rooms ? rooms.map((room) =>
                        <Chip
                            clickable
                            onClick={() => {
                                setCurrentRoom(room)
                                setOpen(false)
                            }}
                            color={"primary"}
                            label={room.room_name}
                        />) : (
                        <Skeleton variant="rectangular" animation="wave"/>
                    )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
