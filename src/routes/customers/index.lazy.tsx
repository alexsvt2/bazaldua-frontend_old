import { createLazyFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Card, CardLink } from 'react-bootstrap';
import { useGetCustomers } from '../../hooks/use-get-customers';

export const Route = createLazyFileRoute('/customers/')({
  component: () => <Index />,
})

const Index = () => {
  const navigation = useNavigate({ from: '/customers' });
  const { data, isLoading, error} = useGetCustomers(1);

  const handleClickCustomerNavigation = (customerId: number) => {
    navigation({ to: `/customers/${customerId}` })
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <>

      <Link to="/customers/new">New Customer</Link>
      <hr />
      {
        data?.items &&
        data?.items.map((customer) => (
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