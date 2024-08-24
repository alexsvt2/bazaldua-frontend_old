import { createFileRoute } from '@tanstack/react-router'
import NewReport from "../../../components/Reports/NewReport.tsx";

export const Route = createFileRoute('/reports/new/')({
  component: () => NewReport()
})
