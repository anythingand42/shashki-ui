import React from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Header from './header/header';
import Home from './views/home';
import Training from './views/training';
import appRoutes from './constants/app-routes';
import SignIn from './views/sign-in/sign-in';
import SignUp from './views/sign-up/sign-up';
import AuthProvider from './auth/auth-provider';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            paddingTop: theme.spacing(10),
            height: '100%',
            paddingBottom: theme.spacing(2),
        },
    }),
);

function AnimatedSwitch() {
    const location = useLocation();
    return (
        <SwitchTransition>
            <CSSTransition
                key={location.key}
                classNames="fade"
                addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
            >
                <Switch location={location}>
                    <Route exact path={appRoutes.home} component={Home} />
                    <Route exact path={appRoutes.training} component={Training} />
                    <Route exact path={appRoutes.signUp} component={SignUp} />
                    <Route exact path={appRoutes.signIn} component={SignIn} />
                </Switch>
            </CSSTransition>
        </SwitchTransition>
    );
}

function App() {
    const classes = useStyles();
    return (
        <AuthProvider>
            <Router>
                <Header />
                <Container className={classes.container} maxWidth="xl">
                    <AnimatedSwitch />
                </Container>
            </Router>
        </AuthProvider>
    );
}

export default App;
