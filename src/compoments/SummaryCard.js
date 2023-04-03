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
                    <Typography className={classes.title} color={"primary"} gutterBottom>
                        {BOUGHT_BY}
                    </Typography>
                    <Typography variant="h5" component="h2" color={"secondary"}>
                        ₹{AMOUNT_PAID}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {ITEM_BOUGHT}
                    </Typography>
                    <Typography variant="body2" component="h6">
                        {DATE}
                    </Typography>
                </CardContent>
                <CardActions>
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