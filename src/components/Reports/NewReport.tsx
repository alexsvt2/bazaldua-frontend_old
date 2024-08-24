import { useEffect, useState } from 'react';
import { Field, FieldArray, Form, Formik, FormikHelpers } from 'formik';
import axios from 'axios';
import Select from 'react-select';
import { Button, Col, Form as BootstrapForm, Row } from 'react-bootstrap';
import { CustomerProduct } from '../../types/customer-product.types.ts';
import { Customer } from '../../types/customer.types.ts';
import { Product } from '../../types/product.types.ts';
import { NewProductSchema } from '../../helpers/validations/products/new-product.ts';
import { NewProduct } from '../Modals/Products/NewProduct.tsx'; // Assuming you have a Product type

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

const ReportForm = () => {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const [customers, setCustomers] = useState<
    { value: number; label: string }[]
  >([]);
  const [customerProducts, setCustomerProducts] = useState<
    { value: number; label: string }[]
  >([]);
  const [products, setProducts] = useState<{ value: number; label: string }[]>(
    [],
  );
  const [showNewProductModal, setShowNewProductModal] =
    useState<boolean>(false);

  console.log(products);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get<Customer[]>(`${SERVER_URL}/customers`);
        const customerOptions = response.data.map((customer) => ({
          value: customer.id,
          label: customer.name,
        }));
        setCustomers(customerOptions);
      } catch (error) {
        console.error('Error fetching customers', error);
      }
    };

    const fetchCustomerProducts = async () => {
      try {
        const response = await axios.get<CustomerProduct[]>(
          `${SERVER_URL}/customer-products`,
        );
        const productOptions = response.data.map((product) => ({
          value: product.id,
          label: product.serialNumber + ' - ' + product.product.name,
        }));
        setCustomerProducts(productOptions);
      } catch (error) {
        console.error('Error fetching customer products', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(`${SERVER_URL}/products`);
        const productOptions = response.data.map((product) => ({
          value: product.id,
          label: product.name,
        }));
        setProducts(productOptions);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchCustomers();
    fetchCustomerProducts();
    fetchProducts();
  }, [SERVER_URL]);

  const createProduct = async (product: {
    name: string;
    brand: string;
    model: string;
    description: string;
  }) => {
    try {
      const response = await axios.post<Product>(
        `${SERVER_URL}/products`,
        product,
      );
      return response.data;
    } catch (error) {
      console.error('Error creating product', error);
      throw error;
    }
  };

  const createCustomerProduct = async (customerProduct: {
    serialNumber: string;
    internalControl: string;
    tecnoControl: string;
    productId: number;
    customerId: number;
  }) => {
    try {
      const response = await axios.post<CustomerProduct>(
        `${SERVER_URL}/customer-products`,
        customerProduct,
      );
      return response.data;
    } catch (error) {
      console.error('Error creating customer product', error);
      throw error;
    }
  };

  const handleSubmit = async (
    values: ReportFormValues,
    formikHelpers: FormikHelpers<ReportFormValues>,
  ) => {
    const { setSubmitting } = formikHelpers;
    try {
      // Create products and customer products if they don't exist
      for (const item of values.reportItems) {
        const customerProductExists = customerProducts.find(
          (cp) => cp.value === item.customerProductId,
        );
        if (!customerProductExists) {
          // Assume product creation is needed
          const newProduct = await createProduct({
            name: 'New Product',
            brand: 'Brand X',
            model: 'Model Z',
            description: 'Description of new product',
          });

          await createCustomerProduct({
            serialNumber: 'NEW_SERIAL',
            internalControl: 'IC-NEW',
            tecnoControl: 'TC-NEW',
            productId: newProduct.id,
            customerId: values.customerId!,
          });
        }
      }

      await axios.post(`${SERVER_URL}/reports`, values);
      console.log('Report created successfully');
    } catch (error) {
      console.error('There was an error creating the report:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        customerId: null,
        userId: 1, // Example value
        observationsEngineer: '',
        observationsCustomer: '',
        serviceType: 'PREVENTIVE',
        reportType: 'WARRANTY',
        status: 'PENDING',
        reportItems: [{ customerProductId: 0, observations: '' }],
      }}
      validationSchema={NewProductSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, setFieldValue, values }) => (
        <Form>
          <Row>
            <Col>
              <Button onClick={() => setShowNewProductModal(true)}>
                Add New Product
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <BootstrapForm.Group controlId="customerId">
                <BootstrapForm.Label>Customer</BootstrapForm.Label>
                <Select
                  options={customers}
                  onChange={(option) =>
                    setFieldValue('customerId', option ? option.value : null)
                  }
                  value={
                    customers.find(
                      (option) => option.value === values.customerId,
                    ) || null
                  }
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
                              <BootstrapForm.Label>Product</BootstrapForm.Label>
                              <Select
                                options={customerProducts}
                                onChange={(option) =>
                                  setFieldValue(
                                    `reportItems[${index}].customerProductId`,
                                    option ? option.value : null,
                                  )
                                }
                                value={
                                  customerProducts.find(
                                    (option) =>
                                      option.value === item.customerProductId,
                                  ) || null
                                }
                              />
                              {errors.reportItems &&
                              errors.reportItems[index] &&
                              errors.reportItems[index].customerProductId ? (
                                <div className="text-danger">
                                  {errors.reportItems[index].customerProductId}
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
