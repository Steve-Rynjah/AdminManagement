import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({cabinToEdit = {}}) {
  const {id: editId, ...editValues} = cabinToEdit;
  const isEditSession = Boolean(editId)  
  const {register, handleSubmit, reset, getValues, formState} = useForm({
    defaultValues: isEditSession ? editValues : {},
  })
  const queryClient = useQueryClient()
  const {errors} = formState

  const {mutate, isPending} = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cabin']
      })
      toast.success("New cabin successfully created.")
      reset()
    },
    onError: (err) => {
      console.log("Error : ", err)
      toast.error(err.message)
    }
  })

  const onSubmit = (data) => {
    console.log("Data := ", data?.image[0])
    mutate({...data, image: data?.image[0]})
  }

  const onError = (err) => {
    //If require to console
  }


  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label={"Cabin nam"} error={errors?.name?.message}>
        <Input type="text" id="name" disabled={isPending} {...register("name", {
          required: "This field is required."
        })}/>
      </FormRow>

      <FormRow label={"Maximum capacity"} error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" disabled={isPending} {...register("maxCapacity", {
          required: "This field is required.",
          min: {
            value: 1,
            message: "Capacity should atleast be 1"
          }
        })}/>
      </FormRow>

      <FormRow label={"Regular price"} error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" disabled={isPending} {...register("regularPrice", {
          required: "This field is required.",
          min: {
            value: 1,
            message: "Capacity should atleast be 1"
          }
        })}/>
      </FormRow>

      <FormRow label={"Discount"} error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} disabled={isPending} {...register("discount", {
          required: "This field is required.",
          validate: (value) => Number(value) <= Number(getValues().regularPrice )|| "Discount should be less than the regular price"
        })}/>
      </FormRow>

      <FormRow label={"Description for website"} error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue="" disabled={isPending} {...register("description", {
          required: "This field is required."
        })}/>
      </FormRow>

      <FormRow label={"Cabin photo"} error={errors?.image?.message}>
        <FileInput id="image" accept="image/*"  {...register("image", {
          required: "This field is required."
        })}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={reset}>
          Cancel
        </Button>
        <Button disabled={isPending}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
