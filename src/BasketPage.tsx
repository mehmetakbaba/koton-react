import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/Store';
import { Typography, Box, IconButton, Button } from '@mui/material';
import { IoArrowBackCircle } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom'; 
import { incrementQuantity, decrementQuantity, removeFromCart } from './redux/ProductSlice';
import Footer from './Footer';
import axios from 'axios'; // Axios veya başka bir HTTP istemcisi kullanabilirsiniz

const BasketPage: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const handleBackClick = () => {
        navigate(-1); 
    };

    const handleOrder = async () => {
        try {
            const orderData = {
                items: cartItems,
                totalAmount: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
            };

            const response = await axios.post('/api/orders', orderData);
            console.log('Sipariş başarıyla verildi:', response.data);

        } catch (error) {
            console.error('Sipariş verme hatası:', error);
        }
    };

    return (
        <Box
            sx={{
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <Box sx={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        zIndex: 1000,
                    }}
                    onClick={handleBackClick} 
                >
                    <IoArrowBackCircle style={{ fontSize: '36px' }} />
                </IconButton>

                <Box sx={{ width: '40%', mb: 3 }}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/f/f5/Koton_brand.png"
                        alt="Koton Brand"
                        style={{ width: '100%', height: 'auto' }}
                    />
                </Box>

                <Box sx={{ width: '100%', maxWidth: '600px', paddingRight: '20px', alignSelf: 'flex-start' }}>
                    {cartItems.length === 0 ? (
                        <Typography variant="h6">Sepetiniz boş.</Typography>
                    ) : (
                        <Box>
                            {cartItems.map(item => (
                                <Box
                                    key={item.id}
                                    sx={{
                                        marginBottom: '20px',
                                        border: '1px solid #ccc',
                                        padding: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        backgroundColor: '#f9f9f9',
                                    }}
                                >
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        style={{ width: '100px', height: 'auto', marginRight: '20px' }}
                                    />
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="h6">{item.name}</Typography>
                                        <Typography>Fiyat: {item.price.toFixed(2)} TL</Typography>
                                        <Typography>Bedeni: {item.size}</Typography>
                                        <Typography>Miktar: {item.quantity}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Button 
                                            variant="outlined" 
                                            onClick={() => dispatch(decrementQuantity(item.id))}
                                            disabled={item.quantity === 1}
                                        >
                                            -
                                        </Button>
                                        <Typography sx={{ margin: '0 10px' }}>{item.quantity}</Typography>
                                        <Button 
                                            variant="outlined" 
                                            onClick={() => dispatch(incrementQuantity(item.id))}
                                        >
                                            +
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => dispatch(removeFromCart(item.id))}
                                            sx={{ marginLeft: '10px' }}
                                        >
                                            Sil
                                        </Button>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    )}
                </Box>
            </Box>

            {cartItems.length > 0 && (
                <Box sx={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
                    <Button 
                        variant="contained" 
                        sx={{ 
                            backgroundColor: 'black', 
                            color: 'white',
                            '&:hover': { 
                                backgroundColor: '#333',
                            }
                        }} 
                        onClick={handleOrder}
                    >
                        Sipariş Ver
                    </Button>
                </Box>
            )}
            <Footer />
        </Box>
    );
};

export default BasketPage;
