import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { getBookings } from "../../services/apiBookings"

export function useFetchBookins(){
  const {isLoading, data: bookingData, error} = useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings,
  })

  return {isLoading, bookingData, error}
}