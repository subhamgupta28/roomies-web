import {makeStyles} from "@material-ui/core/styles";
import {
    AppBar, Dialog,
    IconButton, InputAdornment, Slide,
    TextField,
    Toolbar,
    Typography
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {AccountCircle, AddAlert, Close, HistoryOutlined} from "@material-ui/icons";
import React, {useEffect, useState} from "react";
import { Autocomplete} from "@material-ui/lab";



const appbarstyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        flexGrow: 1,

    },
    grow: {
        flexGrow: 2,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: 6,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },

    sectionMobile: {
        display: 'flex',
        marginLeft: 10,
        marginRight: 1,

    },
    auto: {
        width: 300,
        position: "relative",
    },
    btn: {
        display: "flex",
        justifyContent: "center",
        // marginTop:10,
        // marginRight:30,

    },
    active:{
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
    },
    di:{
        backgroundColor: 'rgba(255, 255, 255, 0.01)',
        backdropFilter: 'blur(7px)',
    },
    ro:{

    },
    t:{
        backdropFilter: 'blur(7px)',
    }

}));
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function PrimaryAppBar() {
    const classes = appbarstyle();
    const [open, setOpen] = useState(false);
    const [component, setComponent] = useState();
    const [copen, setCOpen] = useState(false);
    const [op, setOp] = useState([]);
    const [searchMsg, setSearch] = useState('');
    const [res, setRes] = useState([{
        disease: "",
        precaution: [],
        description: ""
    }])

    const search = (sr) => {
        setSearch(sr.target.value)
    }
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {

        setOpen(false)

    }
    const handleAccount = (event) => {
        setOpen(!open);


    }
    const handleLogout = () => {

    }

    const handleCClose = () => {
        setCOpen(false)
    }

    return (
        <div className={classes.root} >
            <AppBar position="sticky" color={"transparent"} elevation={8}>
                <Toolbar variant={'dense'} className={classes.t}>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"

                        href={'/'}
                        aria-label="open drawer"
                    >
                    </IconButton>
                    <Typography className={classes.title} variant="h6">
                        <b>Roomies</b>
                    </Typography>
                    <div className={classes.grow}>
                    </div>
                    <div className={classes.search}>
                        <Autocomplete
                            freeSolo
                            id="combo-box-demo"
                            options={op}
                            onChange={(event, newValue) => {
                                console.log(newValue, "new")
                            }}
                            getOptionLabel={(option) => option.label}
                            sx={{width: 300}}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    variant={"outlined"}
                                    color={"primary"}
                                    // label={'Search'}
                                    size={"small"}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon/>
                                            </InputAdornment>
                                        ),
                                    }}
                                />}
                        />
                    </div>

                    <div className={classes.sectionMobile}>
                        <IconButton
                            id={"menu_btn"}
                            aria-label="show more"
                            color="inherit"
                            onClick={handleOpen}
                        >
                            <AccountCircle/>
                        </IconButton>

                    </div>

                </Toolbar>
            </AppBar>
        </div>
    );
}
