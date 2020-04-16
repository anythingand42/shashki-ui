import React from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Header from './header/header';
import Home from './views/home';
import Training from './views/training';
import appRoutes from './constants/app-routes';
import SignIn from './views/sign-in/sign-in';
import SignUp from './views/sign-up/sign-up';
import AuthProvider from './auth/auth-provider';

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
    return (
        <AuthProvider>
            <Router>
                <Header />
                <Container maxWidth="xl">
                    <AnimatedSwitch />
                </Container>
            </Router>
        </AuthProvider>
    );
}

export default App;
