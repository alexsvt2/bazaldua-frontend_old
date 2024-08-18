import { createFileRoute } from '@tanstack/react-router';
import * as Yup from 'yup';
import { Formik, Form, Field, FormikHelpers } from "formik";
import axios from 'axios';
import { Button, Form as BootstrapForm } from 'react-bootstrap';

interface ProductFormValues {
  name: string;
  model: string;
  description: string;
}

const ProductSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  model: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
});

export const Route = createFileRoute('/products/new/')({
  component: () => ProductForm(),
});

const ProductForm = () => {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const handleSubmit = async (values: ProductFormValues, formikHelpers: FormikHelpers<ProductFormValues>) => {
    const { setSubmitting } = formikHelpers;
    try {
      const response = await axios.post(`${SERVER_URL}/products`, values);
      console.log(response.data);
    } catch (error) {
      console.error('There was an error!', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ name: '', model: '', description: '' }}
      validationSchema={ProductSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <BootstrapForm.Group controlId="name">
            <BootstrapForm.Label>Product Name</BootstrapForm.Label>
            <Field name="name" className="form-control" />
            {errors.name && touched.name ? (
              <div className="text-danger">{errors.name}</div>
            ) : null}
          </BootstrapForm.Group>

          <BootstrapForm.Group controlId="model">
            <BootstrapForm.Label>Model</BootstrapForm.Label>
            <Field name="model" className="form-control" />
            {errors.model && touched.model ? (
              <div className="text-danger">{errors.model}</div>
            ) : null}
          </BootstrapForm.Group>

          <BootstrapForm.Group controlId="description" className="mb-3">
            <BootstrapForm.Label>Description</BootstrapForm.Label>
            <Field name="description" as="textarea" className="form-control" />
            {errors.description && touched.description ? (
              <div className="text-danger">{errors.description}</div>
            ) : null}
          </BootstrapForm.Group>

          <Button variant="primary" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};
