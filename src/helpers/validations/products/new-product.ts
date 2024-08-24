import * as Yup from "yup";

// TODO: Rename this in the future
export const NewProductSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  model: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  brand: Yup.string().required('Required'),
});
