import * as Yup from "yup";

export const ReportSchema = Yup.object().shape({
  customerId: Yup.number().required('Required'),
  userId: Yup.number().required('Required'),
  observationsEngineer: Yup.string().required('Required'),
  observationsCustomer: Yup.string().required('Required'),
  serviceType: Yup.string().oneOf(["PREVENTIVE", "CORRECTIVE"]).required('Required'),
  reportType: Yup.string().oneOf(["WARRANTY", "INVOICABLE"]).required('Required'),
  status: Yup.string().oneOf(["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"]).required('Required'),
  reportItems: Yup.array().of(
    Yup.object().shape({
      customerProductId: Yup.number().required('Product is required'),
      observations: Yup.string().required('Observations are required'),
    })
  ).required('At least one report item is required'),
});
