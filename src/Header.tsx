import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, Box } from '@mui/material';
import { GrShop } from "react-icons/gr";
import { IoPersonSharp } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { RootState } from './redux/Store';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from './redux/AuthSlice';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const { isAuthenticated, email } = useSelector((state: RootState) => state.auth); // Sadece email bilgisi kullanılıyor
    const dispatch = useDispatch();
    const handleBasketClick = () => {
        navigate('/Basket'); 
    };

    const handleLoginClick = () => {
        navigate('/Register');
    };
    const handleLogoutClick = () => {
        dispatch(logout());
    };
    return (
        <AppBar position="static" style={{ background: 'white' }}>
            <Toolbar>
                <Container
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img
                            src="https://054308f5.cdn.akinoncloud.com/static_omnishop/koton422/img/logo.svg"
                            alt="Koton Logo"
                            style={{ width: '150px', height: 'auto' }}
                        />
                    </Box>
                    {isAuthenticated ? (
                        <Box>
                            <Typography variant="body1" style={{ color: 'black', marginRight: '10px' }}>
                                {email}
                            </Typography>
                            <Button color="inherit" style={{ color: 'black' }} onClick={handleLogoutClick}>
                                Çıkış
                            </Button>
                        </Box>
                    ) : (
                        <Button color="inherit" style={{ color: 'black' }} onClick={handleLoginClick}>
                            <IoPersonSharp />
                        </Button>
                    )}
                    <Button color="inherit" style={{ color: 'black' }} onClick={handleBasketClick}>
                        <GrShop />
                        {totalItems > 0 && (
                            <span style={{ marginLeft: '5px', background: 'red', color: 'white', borderRadius: '12px', padding: '2px 5px', fontSize: '12px' }}>
                                {totalItems}
                            </span>
                        )}
                    </Button>
                </Container>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
