import React from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation, Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { makeStyles, createStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './header/header';
import Home from './views/home';
import Training from './views/training';
import appRoutes from './constants/app-routes';
import SignIn from './views/sign-in/sign-in';
import SignUp from './views/sign-up/sign-up';
import AuthProvider from './auth/auth-provider';
import theme from './theme';

const useStyles = makeStyles((_theme: Theme) =>
    createStyles({
        container: {
            paddingTop: _theme.spacing(10),
            height: '100%',
            paddingBottom: _theme.spacing(2),
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
                    <Redirect to="/" />
                </Switch>
            </CSSTransition>
        </SwitchTransition>
    );
}

function App() {
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <Router>
                    <Header />
                    <Container className={classes.container} maxWidth="xl">
                        <AnimatedSwitch />
                    </Container>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
