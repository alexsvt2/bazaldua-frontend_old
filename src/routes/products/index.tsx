import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { Button } from 'react-bootstrap';
import { useGetProducts } from '../../hooks/use-get-products.tsx';

export const Route = createFileRoute('/products/')({
  component: () => <Index />,
});

const Index = () => {
  const navigate = useNavigate({ from: '/products' });
  const {data, isLoading, error} = useGetProducts(1);

  const navigateNewProduct = async () => {
    await navigate({ to: '/products/new' });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div>Hello /products/!</div>

      <div>
        {data?.items.map((product) => (
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
