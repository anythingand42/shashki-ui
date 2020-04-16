import React, { useState } from 'react';
import {
    Button,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    createStyles,
} from '@material-ui/core';
import PowerIcon from '@material-ui/icons/PowerSettingsNew';

const useStyles = makeStyles(() =>
    createStyles({
        iconContainer: {
            minWidth: '2em',
        },
    }),
);

interface IAccountMenu {
    userName: string;
    signOut(): void;
}

function AccountMenu({ userName, signOut }: IAccountMenu) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const onLogOutClick = () => {
        signOut();
        setAnchorEl(null);
    };

    const onClose = () => {
        setAnchorEl(null);
    };

    const classes = useStyles();

    return (
        <div>
            <Button
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                {userName}
            </Button>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={onClose}
            >
                <MenuItem onClick={onLogOutClick}>
                    <ListItemIcon className={classes.iconContainer}>
                        <PowerIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Log out" />
                </MenuItem>
            </Menu>
        </div>
    );
}

export default AccountMenu;
