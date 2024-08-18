import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/about')({
  component: () => About()
})

const About = () => {

  return <div>Hello /about/About!</div>
}
