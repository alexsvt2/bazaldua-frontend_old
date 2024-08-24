export interface Report {
  id: number;
  customerId: number;
  userId: number;
  observationsEngineer: string;
  observationsCustomer: string;
  serviceType: "PREVENTIVE" | "CORRECTIVE";
  reportType: "WARRANTY" | "INVOICABLE";
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";  // I added some possible status values for completeness
  createdAt: string;  // ISO 8601 date string
  updatedAt: string;  // ISO 8601 date string
}
