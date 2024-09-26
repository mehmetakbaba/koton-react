import React from 'react';

interface ProductCardProps {
  image: string;
  title: string;
  subtitle: string;
  price: number;
  onClick: () => void; 
}

const ProductCard: React.FC<ProductCardProps> = ({ image, title, subtitle, price, onClick }) => {
  return (
    <div 
      onClick={onClick} 
      style={{ 
        border: '1px solid #ccc', 
        padding: '16px', 
        borderRadius: '8px', 
        textAlign: 'center', 
        color: 'black', 
        maxWidth: '250px', 
        margin: '0 auto', 
        cursor: 'pointer' 
      }}
    >
      <img 
        src={image} 
        alt={title} 
        style={{ 
          width: '100%', 
          height: 'auto', 
          objectFit: 'cover', 
          borderRadius: '8px',
          maxHeight: '200px' 
        }} 
      />
      <h2 style={{ fontSize: '1.2rem' ,color :'white'}}>{title}</h2>
      <p style={{color:'white'}}>{subtitle}</p>
      <p style={{color:'white'}}>{price} TL</p>
    </div>
  );
};

export default ProductCard;
