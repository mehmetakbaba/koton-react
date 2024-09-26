import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import { Box } from '@mui/material';
import { GrShop } from "react-icons/gr";
import { IoPersonSharp } from "react-icons/io5";
const Header: React.FC = () => {
    return (
        <AppBar position="static" style={{background:'white'}}>
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
                            style={{ width: '150px', height: 'auto'}} 
                        />
                    </Box>
                    <Button color="inherit" style={{color:'black'}}><IoPersonSharp/></Button>
                    <Button color="inherit" style={{color:'black'}}><GrShop/></Button>
                    
                </Container>
                
            </Toolbar>
        </AppBar>
    );
};

export default Header;
