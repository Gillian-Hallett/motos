import { AppBar, Button, Container, Toolbar, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AdbIcon from '@mui/icons-material/Adb'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginActions } from '../store/storelogin'

function Dashboard() {
    const navigate = useNavigate()
    //Almacenamos en la variable userData el estado del store
    const userData = useSelector(state => state.login)
    const dispatch = useDispatch()

    const isLoggedin = userData.isAutenticated;

    const handleLogout = (e) => {
        // Despachar una acción para cambiar el estado a "logout"
        dispatch(loginActions.logout());

        // Navegar a la página raíz ("/")
        navigate('/');
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar >
                    <Grid container>

                        <Grid item xs={12} md={3} lg={3}>        
                            <Link to={'/'} style={{textDecoration:'none', color:'white'}}>Motos</Link>
                        </Grid>

                        <Grid item xs={12} md={3} lg={3}>        
                            <Link to={'/Medidor'} style={{textDecoration:'none', color:'white'}}>Medidor</Link>
                        </Grid>

                        <Grid item xs={1} md={1} lg={4}/>
                           

                        <Grid item xs={12} md={1} lg={2} container justifyContent="flex-end">
                            {isLoggedin ? (
                                <>
                                    <Grid item>
                                        <AdbIcon />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body1" sx={{ marginLeft: 1, marginRight: 1 }}>{userData.userName}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button color='primary' variant='contained' onClick={handleLogout}> Salir</Button>
                                    </Grid>
                                </>
                            ) : (
                                <Grid item>
                                    <Link to={'/Login'} style={{textDecoration:'none', color:'white'}}>Iniciar sesión </Link>
                                    /
                                    <Link to={'/Regis'} style={{textDecoration:'none', color:'white'}}> Registrate</Link>
                                </Grid>
                            )}
                        </Grid>

                        </Grid>
                </Toolbar >
            </Container>
        </AppBar>
    );
  }

  export default Dashboard;