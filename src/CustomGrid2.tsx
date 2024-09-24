import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import axios from 'axios';
import { RiShirtFill } from "react-icons/ri"; // gömlek
import { FaShirt } from "react-icons/fa6"; // tişört
import { GiLargeDress } from "react-icons/gi"; // elbise
import { PiHoodieLight } from "react-icons/pi"; // sweatshirt
import { GiPirateCoat } from "react-icons/gi"; // kaban
import { RiWomenLine } from "react-icons/ri";
import { RiMenLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

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
  const [showText, setShowText] = useState<boolean[]>([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get<ApiResponse>('https://localhost:7159/api/Product');
        const productImages = response.data.data.map(product => product.productImageUrl[0]).reverse();
        setImages(productImages);
        const defaultHeights = [288, 232, 290, 281, 215, 232, 210, 236, 222, 400, 400, 238, 180, 204, 270, 185, 214, 261, 298, 183, 290, 250, 225, 200, 292, 218, 245];
        const adjustedHeights = productImages.map((_, idx) => defaultHeights[idx % defaultHeights.length]);
        setHeights(adjustedHeights);
        setShowText(new Array(productImages.length).fill(false));
      } catch (error) {
        setError('Hata: ' + (axios.isAxiosError(error) ? error.message : 'Bilinmeyen hata'));
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newShowText = new Array(images.length).fill(false);
      newShowText[9] = true;
      newShowText[10] = true;
      setShowText(newShowText);
    }, 1500);

    return () => clearTimeout(timer);
  }, [images]);

  const handleTextClick = (categoryId: string) => {
    navigate(`/Category/${categoryId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Masonry columns={5} spacing={2}>
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              perspective: '1000px',
              width: 200,
              height: heights[index],
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                transition: 'transform 3.5s',
                transform: showText[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                backfaceVisibility: 'hidden',
              }}
            >
              <img
                src={image}
                alt={`Product ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                transform: showText[index] ? 'rotateY(0deg)' : 'rotateY(180deg)',
                backfaceVisibility: 'hidden',
                transition: 'transform 3.5s',
              }}
            >
              {index === 10 ? (
                <>
                  <RiMenLine />
                  <h4 onClick={() => handleTextClick("66f2aeccbf5bd07cf3ea39e4")} style={{ cursor: 'pointer' }}>Tişört <FaShirt /></h4>
                  <h4 onClick={() => handleTextClick("66f2aed5bf5bd07cf3ea39e5")} style={{ cursor: 'pointer' }}>Sweatshirt <PiHoodieLight /></h4>
                  <h4 onClick={() => handleTextClick("66f2aedabf5bd07cf3ea39e6")} style={{ cursor: 'pointer' }}>Kaban <GiPirateCoat /></h4>
                  <h4 onClick={() => handleTextClick("66f2aee1bf5bd07cf3ea39e7")} style={{ cursor: 'pointer' }}>Gömlek <RiShirtFill /></h4>
                </>
              ) : (
                <>
                  <RiWomenLine />
                  <h4 onClick={() => handleTextClick("66f2aeeebf5bd07cf3ea39e8")} style={{ cursor: 'pointer' }}>Tişört <FaShirt /></h4>
                  <h4 onClick={() => handleTextClick("66f2aef9bf5bd07cf3ea39e9")} style={{ cursor: 'pointer' }}>Sweatshirt <PiHoodieLight /></h4>
                  <h4 onClick={() => handleTextClick("66f2aefbbf5bd07cf3ea39ea")} style={{ cursor: 'pointer' }}>Elbise <GiLargeDress /></h4>
                  <h4 onClick={() => handleTextClick("66f2af03bf5bd07cf3ea39eb")} style={{ cursor: 'pointer' }}>Gömlek <RiShirtFill /></h4>
                </>
              )}
            </div>
          </div>
        ))}
      </Masonry>
    </Box>
  );
};

export default SSRMasonry;
