import React from 'react';
import { useParams } from 'react-router-dom';
import ProductGrid from './ProductGrid';
import SampleVideo from './assets/videos/v.mp4'; 
import './Category.css'; 
import Header from './Header';
const Category: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>(); 

    return (
        <div className="category-container">
           <Header/>
            <video className="category-video" autoPlay loop muted>
                <source src={SampleVideo} type="video/mp4" />
            </video>
            <div className="product-grid">
                <ProductGrid apiUrl={`https://localhost:7159/api/Product/category/${categoryId}`} />
            </div>
        </div>
    );
}

export default Category;
