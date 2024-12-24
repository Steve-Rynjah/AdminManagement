import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getStaysTodayActivity, updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useChecking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: ({bookingId, breakfast}) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data?.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => toast.error("There are some errors while checking in."),
  });

  return { checkin, isCheckingIn };
}

export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out"
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data?.id} successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("There are some errors while checking in."),
  });

  return { checkout, isCheckingOut };
}

export function useTodayActivity(){
  const { isLoading, data: activities } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"],
  });

  return { activities, isLoading };
}

