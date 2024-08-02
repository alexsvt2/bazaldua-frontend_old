import { Button, Card } from 'react-bootstrap'
import './App.css'
import Navbar from './Navbar'

function App() {

  return (
    <>
      <Navbar />
      <div className='container mt-5'>
        <button type='button' className='btn btn-danger'
          onClick={() => alert('Hello')}
        >Hello</button>

        <Button variant='danger' onClick={() => alert('Hello Chido')}>Hello Chido</Button>

        <hr className='mt-5'/>

        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="https://picsum.photos/200" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default App
