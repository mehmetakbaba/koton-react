import React from 'react';
import { useParams } from 'react-router-dom';

const Category: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>(); 
    return (
        <div>
            <h1 style={{ color: 'white' }}>{categoryId}</h1>
        </div>
    );
}

export default Category;
