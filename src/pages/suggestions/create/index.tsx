import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createSuggestion } from 'apiSdk/suggestions';
import { Error } from 'components/error';
import { suggestionValidationSchema } from 'validationSchema/suggestions';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { DocumentInterface } from 'interfaces/document';
import { UserInterface } from 'interfaces/user';
import { getDocuments } from 'apiSdk/documents';
import { getUsers } from 'apiSdk/users';
import { SuggestionInterface } from 'interfaces/suggestion';

function SuggestionCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: SuggestionInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createSuggestion(values);
      resetForm();
      router.push('/suggestions');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<SuggestionInterface>({
    initialValues: {
      content: '',
      document_id: (router.query.document_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: suggestionValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Suggestion
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="content" mb="4" isInvalid={!!formik.errors?.content}>
            <FormLabel>Content</FormLabel>
            <Input type="text" name="content" value={formik.values?.content} onChange={formik.handleChange} />
            {formik.errors.content && <FormErrorMessage>{formik.errors?.content}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<DocumentInterface>
            formik={formik}
            name={'document_id'}
            label={'Select Document'}
            placeholder={'Select Document'}
            fetcher={getDocuments}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.content}
              </option>
            )}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'suggestion',
    operation: AccessOperationEnum.CREATE,
  }),
)(SuggestionCreatePage);
