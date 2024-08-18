import { createFileRoute, useParams } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { SERVER_URL } from '../../constants'
import { Card, CardHeader } from 'react-bootstrap'

export const Route = createFileRoute('/customers/$customerId')({
  component: () => <Customer />
})

const Customer = () => {
  const { customerId } = useParams({
    from: '/customers/$customerId',
  });


  const [registeredProducts, setRegisteredProducts] = useState<any[]>([])


    const getRegisteredProducts = async () => {
      const response = await axios.get(`${SERVER_URL}/products/customer/${customerId}`);
      setRegisteredProducts(response.data);
    };
  useEffect(() => {

    getRegisteredProducts();

  }, [])



  return (
    <>
      <h1>Customer Products {customerId}</h1>

      {
        registeredProducts &&
        registeredProducts.map((product) => (
          <Card className='mb-3 shadow' key={product.id}>
            <Card.Header># {product.id}</Card.Header>
            <Card.Body>
              <p>SN: {product.serialNumber}</p>
              <p>Product: {product.product.name}</p>
              <p>Customer: {product.customer.name}</p>

              <h3>Previous reports</h3>
              {
                product.orderItems &&
                product.orderItems.map((orderItem: any) => (
                  <>
                    <p>Order Item: {orderItem.id}</p>
                    <p>Observations: {orderItem.observations}</p>
                    <hr />
                  </>
                ))
              }
            </Card.Body>
          </Card>
        ))
      }

    </>
  )
}