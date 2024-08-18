import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/products/instance/')({
  component: () => <div>Hello /products/instance/!</div>
})