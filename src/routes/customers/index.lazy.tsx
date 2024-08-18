import { createLazyFileRoute, Link, useNavigate } from '@tanstack/react-router'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { Customer } from '../../types/Customers';
import { Card, CardLink } from 'react-bootstrap';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const Route = createLazyFileRoute('/customers/')({
  component: () => <Index />,
})

const Index = () => {

  const [customers, setCustomers] = useState<Customer[]>([])
  const navigation = useNavigate({ from: '/customers' });

  const getCustomers = async () => {
    const response = await axios.get(`${SERVER_URL}/customers`);
    console.log(response.data);
    setCustomers(response.data);
  };

  const handleClickCustomerNavigation = (customerId: number) => {
    navigation({ to: `/customers/${customerId}` })
  }

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <>

      <Link to="/customers/new">New Customer</Link>
      <hr />
      {
        customers &&
        customers.map((customer) => (
          <Card key={customer.id} className="mb-3 shadow" >
            <Card.Header># {customer.id}</Card.Header>
            <Card.Body>
              <p>{customer.email}</p>
              <p>{customer.phone}</p>
              <p>{customer.address}</p>
              <CardLink onClick={() => handleClickCustomerNavigation( customer.id )} 
                style={{ cursor: 'pointer' }}
                >See Customer Products</CardLink>
            </Card.Body>
          </Card>
        ))
      }
    </>
  )
}