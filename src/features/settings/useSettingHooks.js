import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getSettings, updateSetting as  updateSettingApi} from "../../services/apiSettings"
import toast from "react-hot-toast"


export function useFetchSettings(){
    const {isLoading, data: settingData, error} = useQuery({
        queryKey: ['settings'],
        queryFn: getSettings,
      })
      return {isLoading, settingData, error}
}

export function useUpdateSetting(){
    const queryClient = useQueryClient()
    const {mutate: updateSetting, isPending: isUpdating} = useMutation({
      mutationFn: updateSettingApi,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['settings']
        })
        toast.success("Setting successfully updated.")
      },
      onError: (err) => {
        console.log("Error : ", err)
        toast.error(err.message)
      }
    })
  
    return {updateSetting, isUpdating}
  }