// Header.tsx
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Container, Box } from '@mui/material';
import { GrShop } from "react-icons/gr";
import { IoPersonSharp } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { RootState } from './redux/Store';
import { useNavigate } from 'react-router-dom'; // useNavigate import edin

const Header: React.FC = () => {
    const navigate = useNavigate(); // useNavigate hook'u ile yönlendirme işlemleri yapacağız
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    const handleCartClick = () => {
        navigate('/Basket'); 
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
                    <Button color="inherit" style={{ color: 'black' }}><IoPersonSharp /></Button>
                    <Button color="inherit" style={{ color: 'black' }} onClick={handleCartClick}>
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
