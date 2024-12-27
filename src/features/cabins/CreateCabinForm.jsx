/** @format */

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../services/apiCabins';

import toast from 'react-hot-toast';
import FormRow from '../../ui/FormRow';

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `;

function CreateCabinForm() {
  const { register, handleSubmit, reset, formState, getValues } = useForm();

  const queryClient = useQueryClient();

  const { errors } = formState;
  const { isLoading: isCreating, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created.');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });

      reset();
    },

    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    mutate(data);
  }

  // function onError(errors) {
  //   console.log(errors);
  // }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label={'Cabin name'} error={errors?.name?.message} id="name">
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register('name', { required: 'this field is required' })}
        />
      </FormRow>

      <FormRow
        label={'Maximum capacity'}
        error={errors?.maxCapacity?.message}
        id="maxCapacity"
      >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          {...register('maxCapacity', {
            required: 'this field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow
        label={'Regular price'}
        error={errors?.regularPrice?.message}
        id="regularPrice"
      >
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          {...register('regularPrice', {
            required: 'this field is required',
            min: {
              value: 1,
              message: 'Regular Price should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow
        label={'Discount'}
        error={errors?.discount?.message}
        id="discount"
      >
        <Input
          type="number"
          id="discount"
          disabled={isCreating}
          min="0"
          {...register('discount', {
            required: 'this field is required',
            validate: (value) =>
              +value <= +getValues().regularPrice ||
              'Discount should be less then regular price',
          })}
          defaultValue={0}
        />
      </FormRow>

      <FormRow
        label={'Description for website'}
        error={errors?.description?.message}
        id="description"
      >
        <Textarea
          type="number"
          id="description"
          disabled={isCreating}
          {...register('description', { required: 'this field is required' })}
          defaultValue=""
        />
      </FormRow>

      <FormRow label={'Cabin photo'}>
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', { required: 'this field is required' })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
