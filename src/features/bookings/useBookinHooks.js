import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { getBooking, getBookings, deleteBooking as deleteBookingApi } from "../../services/apiBookings"
import { useParams, useSearchParams } from "react-router-dom"
import { PAGE_SIZE } from "../../utils/constant"

export function useFetchBookins(){
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams();

  //FILTER
  const filterValue = searchParams.get('status')
  const filter = !filterValue || filterValue === "all" ? null : {field: "status", value: filterValue}

  //SORTING
  const sortByRaw = searchParams.get('sortBy') || "startDate-desc";
  const [field, direction] = sortByRaw.split("-")
  const sortBy = {field, direction}

  //PAGINATIION
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get("page"))

  //QUERY
  const {isLoading, data: {data: bookingData, count} = {}, error,} = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: ()=> getBookings({filter, sortBy, page}),
  })

  //PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE)
  if(page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page+1],
      queryFn: ()=> getBookings({filter, sortBy, page: page + 1}),
    })
  }

  if(page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page-1],
      queryFn: ()=> getBookings({filter, sortBy, page: page - 1}),
    })
  }

  
  return {isLoading, bookingData, error, count, page}
}

export function useFetchBookingDetail(){
    const {bookingId} = useParams()
    const {isLoading, data: bookingDetailData, error} = useQuery({
      queryKey: ['bookingDetal', bookingId],
      queryFn: ()=> getBooking(bookingId),
      retry: false
    })
    return {isLoading, bookingDetailData, error}
}

export function useDeleteBooking(){
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient()

  const {mutate: deleteBooking, isPending: isDeleting} = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bookings']
      })
      toast.success("Booking successfully deleted")
      // if (searchParams.get("page")) searchParams.set("page", 1);
      // setSearchParams(searchParams);
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })

  return {isDeleting, deleteBooking}
}

