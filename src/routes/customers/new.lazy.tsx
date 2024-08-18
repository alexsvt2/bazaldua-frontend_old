import { createLazyFileRoute } from '@tanstack/react-router';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { Button, Form as BootstrapForm, Container, Row, Col } from 'react-bootstrap';
import { SERVER_URL } from '../../constants';
import { toast } from 'react-toastify';

interface CustomerFormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const CustomerSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().required('Phone number is required').matches(/^[0-9\-]+$/, 'Phone number must contain only digits and dashes'),
  address: Yup.string().required('Address is required'),
});

export const Route = createLazyFileRoute('/customers/new')({
  component: () => <CustomerForm />,
})

const CustomerForm: React.FC = () => {
  const displayMessage = (text: string) => toast(text);
  const handleSubmit = async (values: CustomerFormValues, formikHelpers: FormikHelpers<CustomerFormValues>) => {
    const { setSubmitting } = formikHelpers;
    try {
      const response = await axios.post(`${SERVER_URL}/customers`, values);

      displayMessage('Customer created successfully');
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
            initialValues={{ name: '', email: '', phone: '', address: '' }}
            validationSchema={CustomerSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <BootstrapForm.Group controlId="formName">
                  <BootstrapForm.Label>Name</BootstrapForm.Label>
                  <Field
                    type="text"
                    name="name"
                    as={BootstrapForm.Control}
                    placeholder="Enter name"
                  />
                  <ErrorMessage name="name">
                    {msg => <div className="text-danger">{msg}</div>}
                  </ErrorMessage>
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="formEmail">
                  <BootstrapForm.Label>Email</BootstrapForm.Label>
                  <Field
                    type="email"
                    name="email"
                    as={BootstrapForm.Control}
                    placeholder="Enter email"
                  />
                  <ErrorMessage name="email">
                    {msg => <div className="text-danger">{msg}</div>}
                  </ErrorMessage>
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="formPhone">
                  <BootstrapForm.Label>Phone</BootstrapForm.Label>
                  <Field
                    type="text"
                    name="phone"
                    as={BootstrapForm.Control}
                    placeholder="Enter phone number"
                  />
                  <ErrorMessage name="phone">
                    {msg => <div className="text-danger">{msg}</div>}
                  </ErrorMessage>
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="formAddress" className="mb-2">
                  <BootstrapForm.Label>Address</BootstrapForm.Label>
                  <Field
                    type="text"
                    name="address"
                    as={BootstrapForm.Control}
                    placeholder="Enter address"
                  />
                  <ErrorMessage name="address">
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