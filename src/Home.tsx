import React from 'react';
import Sequential from './CustomGrid2';
import { Box } from '@mui/material';
import styled from 'styled-components';

const GlassmorphicCard = styled.div`
  padding: 20px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Home :  React.FC = () => {
  return (
    <Box sx={{ position: 'relative' }}>
      <Sequential />
      <GlassmorphicCard style={{ width: 300 }}>
      <Box sx={{ textAlign: 'center'}}>
      <img 
        src="https://054308f5.cdn.akinoncloud.com/static_omnishop/koton422/img/logo.svg" 
        alt="Koton Logo" 
        style={{ width: '150px', height: 'auto' }} 
      />
    </Box>
      </GlassmorphicCard>
    </Box>
  );
}

export default Home;
