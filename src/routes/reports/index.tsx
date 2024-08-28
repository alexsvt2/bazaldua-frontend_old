import { createFileRoute } from '@tanstack/react-router';
import ReportsTable from '../../components/Reports/ReportsTable.tsx';
import { Button } from "react-bootstrap";
import { useGetReports } from '../../hooks/use-get-reports.tsx';

export const Route = createFileRoute('/reports/')({
  component: () => Reports()
})

const Reports = () => {
  const { data, isLoading, error } = useGetReports(1);

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container">
      <h2>Reports</h2>
      <div style={{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "20px"
      }}>
        <Button href="/reports/new">New Report</Button>
      </div>
      <ReportsTable items={data?.items} />
    </div>
  )
}
