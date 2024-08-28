import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Field, Form, Formik, FormikHelpers } from "formik";
import { Form as BootstrapForm } from "react-bootstrap";
import axios from "axios";
import { NewProductSchema } from "../../../helpers/validations/products/new-product.ts";
import { createProduct } from '../../../api/products.ts';
import { displayMessage } from '../../../helpers/toast.tsx';

interface ProductFormValues {
  name: string;
  model: string;
  description: string;
  brand: string;
}

interface NewProductModal {
  show: boolean;
  onHide: () => void;
}


export function NewProduct({ props }: { props: NewProductModal }) {
  const handleSubmit = async (values: ProductFormValues, formikHelpers: FormikHelpers<ProductFormValues>) => {
    const { setSubmitting } = formikHelpers;
    try {
      const response = await createProduct(values);
      if (response.status === 201) {
        displayMessage('Product created successfully');
      }
      console.log(response.data);
    } catch (error) {
      console.error('There was an error!', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: '', model: '', description: '', brand: '' }}
          validationSchema={NewProductSchema}
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

              <BootstrapForm.Group controlId="brand">
                <BootstrapForm.Label>Brand</BootstrapForm.Label>
                <Field name="brand" className="form-control" />
                {errors.brand && touched.brand ? (
                  <div className="text-danger">{errors.brand}</div>
                ) : null}
              </BootstrapForm.Group>

              <BootstrapForm.Group controlId="description" className="mb-3">
                <BootstrapForm.Label>Description</BootstrapForm.Label>
                <Field name="description" as="textarea" className="form-control" />
                {errors.description && touched.description ? (
                  <div className="text-danger">{errors.description}</div>
                ) : null}
              </BootstrapForm.Group>

              {/* Move Modal Order */}
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}