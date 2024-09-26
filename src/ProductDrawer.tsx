import React, { useState } from 'react';
import { Box, IconButton, SwipeableDrawer, Typography, Button } from '@mui/material';
import { IoArrowBackCircle } from 'react-icons/io5';

interface Product {
  id: string;
  productName: string;
  productPrice: number;
  productImageUrl: string[];
  productColor: string;
  productDescription: string;
  productSizeQuantity: { [key: string]: number }; 
}

interface ProductDrawerProps {
  openDrawer: boolean;
  handleCloseDrawer: () => void;
  selectedProduct: Product | null;
}

const ProductDrawer: React.FC<ProductDrawerProps> = ({ openDrawer, handleCloseDrawer, selectedProduct }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleSizeClick = (size: string) => {
    setSelectedSize(size); 
  };
 
  return (
    <SwipeableDrawer
      anchor="bottom"
      open={openDrawer}
      onClose={handleCloseDrawer}
      onOpen={() => {}}
      ModalProps={{ keepMounted: true }}
      transitionDuration={500}
    >
      <Box
        padding={2}
        role="presentation"
        sx={{
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#fff',
        }}
      >
        <IconButton onClick={handleCloseDrawer} sx={{ alignSelf: 'flex-start' }}>
          <IoArrowBackCircle size={24} />
        </IconButton>
        {selectedProduct && (
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              textAlign: 'left',
              padding: 2,
              height: '100%', 
            }}
          >
            <Box
              sx={{
                flex: 2,
                display: 'flex',
                justifyContent: 'center', 
                alignItems: 'center', 
              }}
            >
              <img
                src={selectedProduct.productImageUrl[0]}
                alt={selectedProduct.productName}
                style={{
                  maxWidth: '80%',
                  maxHeight: '400px',
                  objectFit: 'contain',
                }}
              />
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingLeft: 2, flex: 1 }}>
              <Typography variant="h5" sx={{ marginBottom: '8px' }}>{selectedProduct.productName}</Typography>
              <Typography variant="body1" sx={{ marginBottom: '8px' }}>{selectedProduct.productDescription}</Typography>
              <Typography variant="body1" sx={{ marginBottom: '8px' }}>Price: {selectedProduct.productPrice} TL</Typography>
              <Typography variant="body1" sx={{ marginBottom: '16px' }}>Color: {selectedProduct.productColor}</Typography>
              
              <Typography variant="body1" sx={{ marginBottom: '16px' }}>Available Sizes:</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {Object.entries(selectedProduct.productSizeQuantity).map(([size, quantity]) => (
                  <Box key={size} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Button
                      variant={selectedSize === size ? "contained" : "outlined"} 
                      color={selectedSize === size ? "primary" : "secondary"} 
                      disabled={quantity === 0}
                      onClick={() => handleSizeClick(size)} 
                    >
                      {size} 
                    </Button>
                    {quantity < 10 && quantity > 0 && (
                      <Typography variant="caption" color="error">Az Kaldı</Typography> 
                    )}
                    {quantity === 0 && (
                      <Typography variant="caption" color="error">Stok Yok</Typography>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </SwipeableDrawer>
  );
};

export default ProductDrawer;
