import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, loginAuth } from "../../services/apiAuth";

export function useAuthLogin() {
  const queryClient = useQueryClient()
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginAuth({ email, password }),
    onSuccess: (userData) => {
      toast.success("Login successfully");
      queryClient.setQueriesData(["user"], userData?.user)
      navigate("/dashboard");
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  return { login, isLoading };
}

export function useUser(){
  const {isLoading, data: userData, error} = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  })
  return {isLoading, userData, error, isAuthenticated: userData?.role === "authenticated"}
}
