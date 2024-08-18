import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen'
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


const router = createRouter({
  routeTree
})
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
