import React, { useContext, useState, ChangeEvent } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import FormHelperText from '@material-ui/core/FormHelperText';
import appRoutes from '../../constants/app-routes';
import AuthContext from '../../auth/auth-context';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function SignIn() {
    const { signIn } = useContext(AuthContext);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const history = useHistory();

    const onUserNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setUserName(event.target.value);
    };

    const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setPassword(event.target.value);
    };

    const onSignInClick = async (event: React.MouseEvent) => {
        event.preventDefault();
        const { success, errorMessage } = await signIn(userName, password);
        if (success) {
            history.replace(appRoutes.home);
        } else {
            setError(errorMessage);
        }
    };

    const classes = useStyles();

    const isError = error !== null;

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="User name"
                        autoComplete="username"
                        autoFocus
                        value={userName}
                        onChange={onUserNameChange}
                        error={isError}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={onPasswordChange}
                        error={isError}
                    />
                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}
                    {isError && <FormHelperText error>{error}</FormHelperText>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={onSignInClick}
                    >
                        Sign In
                    </Button>
                    <Grid container justify="flex-end">
                        {/* <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid> */}
                        <Grid item>
                            <Link variant="body2" component={RouterLink} to={appRoutes.signUp}>
                                Register
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default SignIn;
