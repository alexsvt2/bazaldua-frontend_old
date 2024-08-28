import { useState } from 'react';
import { Field, FieldArray, Form, Formik, FormikHelpers } from 'formik';
import ReactSelect from 'react-select';
import { Button, Col, Form as BootstrapForm, Row } from 'react-bootstrap';
import { NewProduct } from '../Modals/Products/NewProduct.tsx'; // Assuming you have a Product type
import { useGetCustomers } from '../../hooks/use-get-customers.tsx';
import { useGetProducts } from '../../hooks/use-get-products.tsx';
import { useGetCustomerProducts } from '../../hooks/use-get-customer-products.tsx';
import { formatCustomerProductsOptions, formatCustomersOptions, formatProductsOptions } from '../../helpers/array-react-select-transform.ts';
import { ReportFormValues } from '../../types/Forms/report-form-values.types.ts';
import { ReportSchema } from '../../helpers/validations/reports/new-report.ts';
import { createReport } from '../../api/reports.ts';

const ReportForm = () => {
  const [showNewProductModal, setShowNewProductModal] =
    useState<boolean>(false);

  const { data: customers } = useGetCustomers(1);
  const { data: products } = useGetProducts(1);
  const { data: customerProducts } = useGetCustomerProducts(1);

  const customerOptions = formatCustomersOptions(customers?.items || []);
  const productOptions = formatProductsOptions(products?.items || []);
  const customerProductOptions = formatCustomerProductsOptions(customerProducts?.items || []);

  const handleSubmit = async (
    values: ReportFormValues,
    formikHelpers: FormikHelpers<ReportFormValues>,
  ) => {
    const { setSubmitting, } = formikHelpers;
    try {
      const response = await createReport(values);
      // if(response.status === 201) {
      // }
      console.log(response);
      // if (response)
      console.log(response)
    } catch (error) {
      console.error('There was an error creating the report:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        customerId: 1,
        userId: 1,
        observationsEngineer: '',
        observationsCustomer: '',
        serviceType: 'PREVENTIVE',
        reportType: 'WARRANTY',
        status: 'PENDING',
        reportItems: [{
          customerProductId: 0,
          observations: ''
        }],
      }}
      validationSchema={ReportSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, setFieldValue, values }) => (
        <Form>
          <h1>Values</h1>
          {
            JSON.stringify(values)
          }
          <hr />
          <h2>
            Errors
          </h2>
          {
            JSON.stringify(errors)
          }
          <hr />
          <Row>
            <Col className='text-end'>
              <Button className="me-2" onClick={() => setShowNewProductModal(true)}>
                Add New Product
              </Button>
              <Button onClick={() => console.log('Add New Customer')}>
                Add New Customer
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <BootstrapForm.Group controlId="customerId">
                <BootstrapForm.Label>Customer</BootstrapForm.Label>
                <ReactSelect
                  placeholder="Select customer"
                  isSearchable
                  id='customerId'
                  name='customerId'
                  isClearable
                  options={customerOptions}
                  onChange={(option) => setFieldValue('customerId', option ? option.value : null)}
                  value={customerOptions.find((option) => option.value === values.customerId)}
                />
                {errors.customerId && touched.customerId ? (
                  <div className="text-danger">{errors.customerId}</div>
                ) : null}
              </BootstrapForm.Group>

              <BootstrapForm.Group controlId="observationsEngineer">
                <BootstrapForm.Label>Engineer Observations</BootstrapForm.Label>
                <Field name="observationsEngineer" className="form-control" />
                {errors.observationsEngineer && touched.observationsEngineer ? (
                  <div className="text-danger">
                    {errors.observationsEngineer}
                  </div>
                ) : null}
              </BootstrapForm.Group>

              <BootstrapForm.Group controlId="serviceType">
                <BootstrapForm.Label>Service Type</BootstrapForm.Label>
                <Field as="select" name="serviceType" className="form-control">
                  <option value="PREVENTIVE">Preventive</option>
                  <option value="CORRECTIVE">Corrective</option>
                </Field>
                {errors.serviceType && touched.serviceType ? (
                  <div className="text-danger">{errors.serviceType}</div>
                ) : null}
              </BootstrapForm.Group>

              <BootstrapForm.Group controlId="reportType">
                <BootstrapForm.Label>Report Type</BootstrapForm.Label>
                <Field as="select" name="reportType" className="form-control">
                  <option value="WARRANTY">Warranty</option>
                  <option value="INVOICABLE">Invoicable</option>
                </Field>
                {errors.reportType && touched.reportType ? (
                  <div className="text-danger">{errors.reportType}</div>
                ) : null}
              </BootstrapForm.Group>

              <BootstrapForm.Group controlId="status">
                <BootstrapForm.Label>Status</BootstrapForm.Label>
                <Field as="select" name="status" className="form-control">
                  <option value="PENDING">Pending</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </Field>
                {errors.status && touched.status ? (
                  <div className="text-danger">{errors.status}</div>
                ) : null}
              </BootstrapForm.Group>
            </Col>

            <Col md={6}>
              <BootstrapForm.Group controlId="observationsCustomer">
                <BootstrapForm.Label>Customer Observations</BootstrapForm.Label>
                <Field name="observationsCustomer" className="form-control" />
                {errors.observationsCustomer && touched.observationsCustomer ? (
                  <div className="text-danger">
                    {errors.observationsCustomer}
                  </div>
                ) : null}
              </BootstrapForm.Group>

              <FieldArray name="reportItems">
                {({ insert, remove, push }) => (
                  <div>
                    <BootstrapForm.Label>Report Items</BootstrapForm.Label>
                    {values.reportItems.map((item, index) => (
                      <div key={index} className="mb-3">
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1">
                            <BootstrapForm.Group
                              controlId={`reportItems[${index}].customerProductId`}
                            >
                              <BootstrapForm.Label>Customer Product </BootstrapForm.Label>

                              <ReactSelect
                                options={customerProductOptions}
                                isClearable
                                onChange={(option) =>
                                  setFieldValue(
                                    `reportItems[${index}].customerProductId`,
                                    option ? option.value : null,
                                  )
                                }
                                value={
                                  customerProductOptions.find(
                                    (option) =>
                                      option.value === item.customerProductId,
                                  ) || null
                                }
                              />
                              {errors.reportItems &&
                              errors.reportItems[index] &&
                              errors.reportItems[index]?.customerProductId ? (
                                <div className="text-danger">
                                  {errors.reportItems[index]?.customerProductId}
                                </div>
                              ) : null}
                            </BootstrapForm.Group>
                          </div>
                          <Button
                            type="button"
                            variant="danger"
                            className="ms-2"
                            onClick={() => remove(index)}
                          >
                            Remove
                          </Button>
                        </div>
                        <BootstrapForm.Group
                          controlId={`reportItems[${index}].observations`}
                        >
                          <BootstrapForm.Label>
                            Observations
                          </BootstrapForm.Label>
                          <Field
                            name={`reportItems[${index}].observations`}
                            className="form-control"
                          />
                          {errors.reportItems &&
                            errors.reportItems[index] &&
                            errors.reportItems[index].observations ? (
                            <div className="text-danger">
                              {errors.reportItems[index].observations}
                            </div>
                          ) : null}
                        </BootstrapForm.Group>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() =>
                        push({ customerProductId: 0, observations: '' })
                      }
                    >
                      Add Report Item
                    </Button>
                  </div>
                )}
              </FieldArray>
            </Col>
          </Row>

          <Button
            variant="primary"
            type="submit"
            disabled={isSubmitting}
            className="mt-2"
          >
            Submit
          </Button>
          <NewProduct
            props={{
              show: showNewProductModal,
              onHide: () => {
                setShowNewProductModal(false);
                // resetForm();
              },
            }}
          />
        </Form>
      )}
    </Formik>
  );
};

export default ReportForm;
