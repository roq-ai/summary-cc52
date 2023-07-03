import * as yup from 'yup';

export const documentValidationSchema = yup.object().shape({
  content: yup.string().required(),
  summary: yup.string(),
  paraphrase: yup.string(),
  organization_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
