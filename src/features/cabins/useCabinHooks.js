import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createEditCabin, deleteCabin as deleteCabinApi, getCabins} from "../../services/apiCabins"
import toast from "react-hot-toast"

export function useFetchCabins(){
  const {isLoading, data: cabinData, error} = useQuery({
    queryKey: ['cabin'],
    queryFn: getCabins,
  })
  return {isLoading, cabinData, error}
}

export function useDeleteCabin(){
    const queryClient = useQueryClient()

    const {mutate: deleteCabin, isPending: isDeleting} = useMutation({
      mutationFn: deleteCabinApi,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['cabin']
        })
        toast.success("Cabin successfully deleted")
      },
      onError: (err) => {
        toast.error(err.message)
      }
    })

    return {isDeleting, deleteCabin}
}

export function useCreateCabin(){
  const queryClient = useQueryClient()

  const {mutate: createCabin, isPending: isCreating} = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cabin']
      })
      toast.success("New cabin successfully created.")
    },
    onError: (err) => {
      console.log("Error : ", err)
      toast.error(err.message)
    }
  })

  return {createCabin, isCreating}
}

export function useEditCabin(){
  const queryClient = useQueryClient()
  const {mutate: editCabin, isPending: isEditing} = useMutation({
    mutationFn: ({newCabinData, id})=> createEditCabin(newCabinData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cabin']
      })
      toast.success("Cabin successfully edited.")
    },
    onError: (err) => {
      console.log("Error : ", err)
      toast.error(err.message)
    }
  })

  return {editCabin, isEditing}
}