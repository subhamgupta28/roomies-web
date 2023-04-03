import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import {makeStyles, TextField} from "@material-ui/core";
import { doc, setDoc } from "firebase/firestore"; 
import {db} from "../FirebaseWork";
import { getAuth } from "firebase/auth";

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
export default function AddItem({room, user, open, setOpen}) {
    const classes = useStyles();

    const [amount, setAmount] = React.useState(null)
    const [itemName, setItemName] = React.useState(null)
    const [notes, setNotes] = React.useState(null)

    const handleClose = () => {
        setOpen(false);
    };
    const saveDetail = async (item) => {

        console.log("saved",user)
    }
    const auth = getAuth();
    const uuid = auth.currentUser.uid

    const handleSave = async() => {
        if (amount && itemName) {
            const date = new Date()
            const dateStr = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay()

            
            const data = {
                CATEGORY: "All",
                BOUGHT_BY: user.USER_NAME,
                AMOUNT_PAID: amount,
                DATE: dateStr,
                DELETED: false,
                ITEM_BOUGHT: itemName,
                TIME_STAMP: date.getTime(),
                NOTE: notes,
                UUID: uuid,
                TAGS: [],
                TIME: ""
            }
            await setDoc(doc(db, room.ROOM_ID, date.getTime().toString()), data);
            console.log(data)
            saveDetail(data).then(() => {

            })
        }
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">
                    Add Item
                </DialogTitle>
                <DialogContent>
                    <form className={classes.root}>
                        <TextField
                            required
                            onChange={(d)=>setItemName(d.target.value)}
                            id="outlined-required"
                            label="Item Name"
                            variant="outlined"
                        />
                        <TextField
                            required
                            onChange={(d)=>setAmount(d.target.value)}
                            id="outlined-disabled"
                            label="Amount Paid"
                            variant="outlined"
                        />
                        <TextField
                            onChange={(d)=>setNotes(d.target.value)}
                            id="outlined-password-input"
                            label="Note"
                            variant="outlined"
                        />

                    </form>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button color="primary" onClick={handleSave}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
