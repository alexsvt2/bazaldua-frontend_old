import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { Button, Form as BootstrapForm, Container, Row, Col } from 'react-bootstrap';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

// Define la forma del formulario
interface ProductInstanceFormValues {
  serialNumber: string;
  productId: number;
  customerId: number;
}

const ProductInstanceSchema = Yup.object().shape({
  serialNumber: Yup.string().required('Serial Number is required'),
  productId: Yup.number().required('Product ID is required').positive().integer(),
  customerId: Yup.number().required('Customer ID is required').positive().integer()
});

export const Route = createFileRoute('/products/instance/new')({
  component: () => <ProductInstanceForm />,
});

const ProductInstanceForm: React.FC = () => {
  const handleSubmit = async (values: ProductInstanceFormValues, formikHelpers: FormikHelpers<ProductInstanceFormValues>) => {
    const { setSubmitting } = formikHelpers;
    try {
      const response = await axios.post(`${SERVER_URL}/products/register-customer`, values);
      console.log(response.data);
    } catch (error) {
      console.error('There was an error!', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Formik
            initialValues={{ serialNumber: '', productId: 0, customerId: 0 }}
            validationSchema={ProductInstanceSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <BootstrapForm.Group controlId="formSerialNumber">
                  <BootstrapForm.Label>Serial Number</BootstrapForm.Label>
                  <Field
                    type="text"
                    name="serialNumber"
                    as={BootstrapForm.Control}
                    placeholder="Enter Serial Number"
                  />
                  <ErrorMessage name="serialNumber">
                    {msg => <div className="text-danger">{msg}</div>}
                  </ErrorMessage>
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="formProductId">
                  <BootstrapForm.Label>Product ID</BootstrapForm.Label>
                  <Field
                    type="number"
                    name="productId"
                    as={BootstrapForm.Control}
                    placeholder="Enter Product ID"
                  />
                  <ErrorMessage name="productId">
                    {msg => <div className="text-danger">{msg}</div>}
                  </ErrorMessage>
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="formCustomerId" className='mb-2'>
                  <BootstrapForm.Label>Customer ID</BootstrapForm.Label>
                  <Field
                    type="number"
                    name="customerId"
                    as={BootstrapForm.Control}
                    placeholder="Enter Customer ID"
                  />
                  <ErrorMessage name="customerId">
                    {msg => <div className="text-danger">{msg}</div>}
                  </ErrorMessage>
                </BootstrapForm.Group>

                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};
