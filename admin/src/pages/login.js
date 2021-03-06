import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import { loginUser } from '../_actions/user_actions';
import Box from '@mui/material/Box';

import { BsFillShieldLockFill } from 'react-icons/bs';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { createBrowserHistory } from 'history';
import lscache from 'lscache';

const history = createBrowserHistory();

const theme = createTheme();

export default function SignIn(props) {
  const dispatch = useDispatch();
  const handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = { email: formData.get('email'), password: formData.get('password') };
    dispatch(loginUser(data)).then(res => {
      if (res.payload.isAuth) {
        lscache.set('isAuth', res.payload.isAuth, 60);
        lscache.set('isAdmin', res.payload.isAdmin, 60);
        lscache.set('email', res.payload.email, 60);
        lscache.set('site', res.payload.site, 60);
        history.replace('/my-account');
      } else {
        alert(res.payload.message);
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <BsFillShieldLockFill />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>

          <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField margin='normal' required fullWidth id='email' label='Email Address' name='email' autoComplete='email' autoFocus />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
