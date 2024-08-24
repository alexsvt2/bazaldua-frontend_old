import { createFileRoute } from '@tanstack/react-router';
import axios from 'axios';
import { useEffect, useState } from "react";
import ReportsTable from '../../components/Reports/ReportsTable.tsx';
import { Report } from '../../types/Report.tsx';
import { Button } from "react-bootstrap";
import { useGetReports } from '../../hooks/use-get-reports.tsx';
// import { Report } from '../../types/Report.tsx';

export const Route = createFileRoute('/reports/')({
  component: () => Reports()
})

const Reports = () => {
  const {data, isLoading, error} = useGetReports(1);

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
      <ReportsTable items={data?.items as Report[]} />
    </div>
  )
}
