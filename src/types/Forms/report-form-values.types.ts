export interface ReportFormValues {
    customerId: number | null;
    userId: number;
    observationsEngineer: string;
    observationsCustomer: string;
    serviceType: 'PREVENTIVE' | 'CORRECTIVE';
    reportType: 'WARRANTY' | 'INVOICABLE';
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
    reportItems: {
      customerProductId: number;
      observations: string;
    }[];
  }
  