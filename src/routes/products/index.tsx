import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Product } from '../../types/Product.ts';

export const Route = createFileRoute('/products/')({
  component: () => <Index />,
});

const Index = () => {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate({ from: '/products' });
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    const response = await axios.get(`${SERVER_URL}/products`);
    setProducts(response.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const navigateNewProduct = async () => {
    await navigate({ to: '/products/new' });
  };

  return (
    <>
      <div>Hello /products/!</div>

      <div>
        {products.map((product) => (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>
              {product.id} - {product.name}
            </Link>
          </div>
        ))}
      </div>

      <Button variant="primary" onClick={navigateNewProduct}>
        Add New Product
      </Button>
    </>
  );
};
