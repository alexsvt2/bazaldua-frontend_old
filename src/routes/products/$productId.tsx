import {
  createFileRoute,
  useNavigate,
  useParams,
} from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import type { Product } from '../../types/product.types.ts';
import axios from 'axios';
import { Button } from 'react-bootstrap';

export const Route = createFileRoute('/products/$productId')({
  component: () => <Product />,
});

const Product = () => {
  const SEVER_URL = import.meta.env.VITE_SERVER_URL;
  const [product, setProduct] = useState<Product>();
  const { productId } = useParams({
    from: '/products/$productId',
  });
  const navigation = useNavigate({ from: '/products/$productId' });

  const getProductById = async () => {
    const response = await axios.get(`${SEVER_URL}/products/${productId}`);
    setProduct(response.data);
  };

  const navigateToRecordProduct = () => {
    navigation({ to: '/products/instance/new' });
  };

  useEffect(() => {
    getProductById();
  }, []);

  return (
    <>
      {product && (
        <div>
          <h1>Product Details</h1>
          <p>
            <strong>ID:</strong> {product.id}
          </p>
          <p>
            <strong>Name:</strong> {product.name}
          </p>
          <p>
            <strong>Model:</strong> {product.model}
          </p>
          <p>
            <strong>Description:</strong> {product.description}
          </p>
          <p>
            <strong>Created At:</strong>{' '}
            {new Date(product.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Updated At:</strong>{' '}
            {new Date(product.updatedAt).toLocaleString()}
          </p>
        </div>
      )}

      <Button onClick={navigateToRecordProduct}>
        Record Product With Serial Number for Client
      </Button>
    </>
  );
};
