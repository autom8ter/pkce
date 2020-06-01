import React, {useEffect} from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import UseStyles from '../styles/styles';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import {
    OIDCService,
    OidcUser,
} from "../oidc/oidc";
import {JsonTree} from "./jsonTree";
const json = require('../config.json');

export const Navigation: React.FC = () => {
    const client = new OIDCService({
        authority: json.authority,
        client_id: json.client_id,
        redirect_uri: json.redirect_uri,
        post_logout_redirect_uri: json.post_logout_redirect_uri,
        silent_redirect_uri: json.silent_redirect_uri,
        popup_redirect_uri: json.popup_redirect_uri,
        scope: json.scope,
    })
    const classes = UseStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [usr, setUsr] = React.useState<OidcUser>()
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const getUser = () => {
        client.getUser().then(u => {
            if (u) {
                console.log(`user - ${u.toStorageString()}`)
                setUsr(u)
            }
        }).catch(e => {
            alert(`failed to get user - ${e}`)
        })
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        PKCE Demo
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <List>
                    <ListItem button key="Login" onClick={() => {
                        client.login().catch(e => {
                            alert(`failed to login - ${e}`)
                        })
                    }}>
                        <ListItemIcon><LockOpenIcon/></ListItemIcon>
                        <ListItemText primary="Login" />
                    </ListItem>

                    <ListItem button key="Logout" onClick={() => {
                        client.logout().catch(e=> {
                            alert(`failed to get user - ${e}`)
                        })
                    }}>
                        <ListItemIcon><LockIcon/></ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
               <JsonTree data={usr} title={"User Info"}/>
            </main>
        </div>
    );
}