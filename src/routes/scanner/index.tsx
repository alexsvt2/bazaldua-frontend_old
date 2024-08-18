import { createFileRoute } from '@tanstack/react-router';
import { Scanner } from '../../components/Scanner.tsx';

export const Route = createFileRoute('/scanner/')({
  component: () => (
    <>
      <h1>QR Scanner</h1>
      <Scanner onScan={(e) => console.log(e)} />
    </>
  ),
});
