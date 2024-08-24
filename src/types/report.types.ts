export interface Report {
    id: number;
    customerId: number;
    userId: number;
    observationsEngineer: string;
    observationsCustomer: string;
    serviceType: 'PREVENTIVE' | 'CORRECTIVE';
    reportType: 'WARRANTY' | 'INVOICABLE';
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
    createdAt: string;
    updatedAt: string;
  }