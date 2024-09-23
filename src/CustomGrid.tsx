import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import axios from 'axios';

interface Product {
  id: string;
  productName: string;
  productImageUrl: string[];
}

interface ApiResponse {
  data: Product[];
}

const SSRMasonry: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [heights, setHeights] = useState<number[]>([]);
  const [widths, setWidths] = useState<number[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get<ApiResponse>('https://localhost:7159/api/Product');
        const productImages = response.data.data.map(product => product.productImageUrl[0]).reverse();
        setImages(productImages);
        const { heights, widths } = getRandomDimensions(productImages.length);
        setHeights(heights);
        setWidths(widths);
      } catch (error) {
        setError('Hata: ' + (axios.isAxiosError(error) ? error.message : 'Bilinmeyen hata'));
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const getRandomDimensions = (count: number) => {
    const heights = Array.from({ length: count }, () => Math.floor(Math.random() * (300 - 100 + 1)) + 120);
    const widths = Array.from({ length: count }, () => Math.floor(Math.random() * (200 - 100 + 1)) + 100);
    return { heights, widths };
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box sx={{ width: '100vw', height: '100vh', overflow: 'hidden', margin: 0, padding: 0 , display: 'flex',
        justifyContent: 'center',
      }}>
      <Masonry columns={5} spacing={2}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Product ${index + 1}`}
            style={{ width: 200, height: heights[index], objectFit: 'cover' }}
          />
        ))}
      </Masonry>
    </Box>
  );
}

export default SSRMasonry;
