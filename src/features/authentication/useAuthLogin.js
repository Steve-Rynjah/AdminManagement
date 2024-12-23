import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logoutAuth, loginAuth, signupAuth } from "../../services/apiAuth";

export function useAuthSignup() {
  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: () => signupAuth,
    onSuccess: (userData) => {
      toast.success("User successfully created");
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  return { signup, isLoading };
}

export function useAuthLogin() {
  const queryClient = useQueryClient()
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginAuth({ email, password }),
    onSuccess: (userData) => {
      toast.success("Login successfully");
      queryClient.setQueryData(["user"], userData?.user)
      navigate("/dashboard", {replace: true});
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

export function useAuthLogout(){
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {mutate: logout, isPending: isLoggingOut} = useMutation({
    mutationFn: logoutAuth,
    onSuccess:()=>{
      queryClient.removeQueries()
      navigate("/login", {replace: true})
    }
  })

  return {logout, isLoggingOut}
}