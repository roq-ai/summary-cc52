import * as yup from 'yup';

export const suggestionValidationSchema = yup.object().shape({
  content: yup.string().required(),
  document_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
