import { Button, Card, CardActions, CardContent, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Edit from "./Edit";

const cardstyle = makeStyles({
    root: {
        display: 'inline-block',
        width: "auto",
        margin: 10,
        borderRadius: 16
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    action:{
        display: "flex",
        justifyContent: "center"
    }
});
export default function SummaryCard({ detail }) {
    const {
        BOUGHT_BY,
        AMOUNT_PAID,
        DATE,
        TIME,
        ITEM_BOUGHT,
        TIME_STAMP,
        UUID
    } = detail
    const classes = cardstyle();

    const [openEdit, setOpenEdit] = React.useState(false);

    const handleEdit = () => {
        setOpenEdit(true)
    }

    return (
        <div className={classes.root}>
            <Card  elevation={20}>
                <CardContent>
                    <Typography className={classes.title} color={"primary"}>
                        {BOUGHT_BY}
                    </Typography>
                    <Typography variant="body1" color={"secondary"}>
                        ₹{AMOUNT_PAID}
                    </Typography>
                    <Typography className={classes.pos} variant="body1" color="textSecondary">
                        {ITEM_BOUGHT}
                    </Typography>
                    <Typography variant="p">
                        {DATE}
                    </Typography>
                </CardContent>
                <CardActions className={classes.action}>
                    <Button
                        variant={"contained"}
                        onClick={handleEdit}
                        size="small">
                        Edit
                    </Button>
                    <Button variant={"contained"} size="small">
                        Delete
                    </Button>
                </CardActions>
            </Card>
            <Edit open={openEdit} setOpen={setOpenEdit} detail={detail}/>
        </div>

    );
}