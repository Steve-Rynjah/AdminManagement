import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { getBookings } from "../../services/apiBookings"
import { useSearchParams } from "react-router-dom"

export function useFetchBookins(){
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get('status')
  const filter = !filterValue || filterValue === "all" ? null : {field: "status", value: filterValue}

  const sortByRaw = searchParams.get('sortBy') || "startDate-desc";
  const [field, direction] = sortByRaw.split("-")
  const sortBy = {field, direction}

  const {isLoading, data: bookingData, error} = useQuery({
    queryKey: ['bookings', filter, sortBy],
    queryFn: ()=> getBookings({filter, sortBy}),
  })

  return {isLoading, bookingData, error}
}