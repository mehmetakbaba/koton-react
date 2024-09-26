import React, { useEffect, useState } from 'react';
import { CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import ProductCard from './ProductCard';
import ProductDrawer from './ProductDrawer'; 

interface ProductSizeQuantity {
  [size: string]: number;
}

interface Product {
  id: string;
  productName: string;
  productPrice: number;
  productImageUrl: string[];
  productColor: string;
  productDescription: string;
  categoryId: string;
  productSizeQuantity: ProductSizeQuantity;
}

interface ProductGridProps {
  apiUrl: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ apiUrl }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        if (Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        } else if (response.data.data.products) {
          setProducts(response.data.data.products);
        } else {
          setError('Beklenmeyen bir yanıt yapısı alındı.');
        }
        setLoading(false);
      })
      .catch(error => {
        setError('Ürünleri yüklerken bir hata oluştu. Lütfen tekrar deneyin.');
        setLoading(false);
      });
  }, [apiUrl]);

  const handleOpenDrawer = (product: Product) => {
    setSelectedProduct(product);
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setSelectedProduct(null);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {products.map((product) => (
          <div key={product.id} style={{ flex: '1 1 calc(33.33% - 16px)', boxSizing: 'border-box' }}>
            <ProductCard
              image={product.productImageUrl[0]}
              title={product.productName}
              subtitle={product.productColor}
              price={product.productPrice}
              onClick={() => handleOpenDrawer(product)} 
            />
          </div>
        ))}
      </div>

      <ProductDrawer
        openDrawer={openDrawer}
        handleCloseDrawer={handleCloseDrawer}
        selectedProduct={selectedProduct}
      />
    </>
  );
};

export default ProductGrid;
