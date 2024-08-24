import Table from 'react-bootstrap/Table';
import { Report } from "../../types/Report/Report.ts";

interface Props {
  items: Report[] | undefined
}

function ReportsTable(props: Props) {
  const { items } = props;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer ID</th>
          <th>User ID</th>
          <th>Engineer Observations</th>
          <th>Customer Observations</th>
          <th>Service Type</th>
          <th>Report Type</th>
          <th>Status</th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody>
        {
          items &&
          items.map((report) => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{report.customerId}</td>
              <td>{report.userId}</td>
              <td>{report.observationsEngineer}</td>
              <td>{report.observationsCustomer}</td>
              <td>{report.serviceType}</td>
              <td>{report.reportType}</td>
              <td>{report.status}</td>
              <td>{new Date(report.createdAt).toLocaleString()}</td>
              <td>{new Date(report.updatedAt).toLocaleString()}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
}

export default ReportsTable;
