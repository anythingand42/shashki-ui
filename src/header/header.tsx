import React, { useState, useContext } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link, useHistory } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import appRoutes from '../constants/app-routes';
import AuthContext from '../auth/auth-context';
import AccountMenu from './account-menu';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        tabs: {
            flexGrow: 1,
        },
    }),
);

function Header() {
    const {
        state: {
            authorized,
            userData: { userName },
        },
        signOut,
    } = useContext(AuthContext);
    const classes = useStyles();
    const [tab, setTab] = useState(0);
    const history = useHistory();

    const handleChangeTab = (_: any, value: number) => {
        setTab(value);
    };

    const onLoginClick = () => {
        history.push(appRoutes.signIn);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Tabs value={tab} onChange={handleChangeTab} className={classes.tabs}>
                        <Tab label="Play" to={appRoutes.home} component={Link} />
                        <Tab label="Learn" to={appRoutes.training} component={Link} />
                    </Tabs>
                    {authorized && <AccountMenu userName={userName!} signOut={signOut} />}
                    {!authorized && (
                        <Button color="inherit" onClick={onLoginClick}>
                            Log in
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;
