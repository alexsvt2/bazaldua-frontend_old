import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ToastContainer } from 'react-toastify';

const activeStyle = { color: 'red', fontWeight: 'bold' }

export const Route = createRootRoute({
  component: () => (
    <div className="container-fluid">
      <div className="p-2 flex gap-2">
        <Link to="/" activeProps={{ style: activeStyle}} className='mx-2'>
          Home
        </Link>{' '}
        <Link to="/about" activeProps={{ style: activeStyle}} className='mx-2'>
          About
        </Link>
        <Link to="/products" activeProps={{ style: activeStyle}} className='mx-2'>
          Products
        </Link>
        <Link to="/customers" activeProps={{ style: activeStyle}} className='mx-2'>
          Customers
        </Link>
        <Link to="/reports" activeProps={{ style: activeStyle}} className='mx-2'>
          Reports
        </Link>
        <Link to="/scanner" activeProps={{ style: activeStyle}} className='mx-2'>
          Scanner
        </Link>
      </div>
      <hr />
      <Outlet />
      <ToastContainer />
      <TanStackRouterDevtools />
    </div>
  ),
})
