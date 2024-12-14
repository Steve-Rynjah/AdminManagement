import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateCabin, useEditCabin } from "./useCabinHooks";

function CreateCabinForm({ cabinToEdit = {} , onClose}) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isLoading = isCreating || isEditing;

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  const onSubmit = (data) => {
    const image =
      typeof data?.image === "string" ? data?.image : data?.image[0];
    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        { onSuccess: () => reset() }
      );
    } else {
      createCabin({ ...data, image }, { onSuccess: () => {reset() , onClose?.()}});
    }
  };

  const onError = (err) => {
    //If require to console
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onClose ? "modal" : "regular"}>
      <FormRow label={"Cabin nam"} error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isLoading}
          {...register("name", {
            required: "This field is required.",
          })}
        />
      </FormRow>

      <FormRow label={"Maximum capacity"} error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isLoading}
          {...register("maxCapacity", {
            required: "This field is required.",
            min: {
              value: 1,
              message: "Capacity should atleast be 1",
            },
          })}
        />
      </FormRow>

      <FormRow label={"Regular price"} error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isLoading}
          {...register("regularPrice", {
            required: "This field is required.",
            min: {
              value: 1,
              message: "Capacity should atleast be 1",
            },
          })}
        />
      </FormRow>

      <FormRow label={"Discount"} error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isLoading}
          {...register("discount", {
            required: "This field is required.",
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "Discount should be less than the regular price",
          })}
        />
      </FormRow>

      <FormRow
        label={"Description for website"}
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isLoading}
          {...register("description", {
            required: "This field is required.",
          })}
        />
      </FormRow>

      <FormRow label={"Cabin photo"} error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required.",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={()=> {reset(), onClose?.()}}>
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isEditSession ? "Edit cabin" : "Create cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
