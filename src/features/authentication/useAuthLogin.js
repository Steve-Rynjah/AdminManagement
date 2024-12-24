import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logoutAuth, loginAuth, signup as signupApi, updateCurrentUser} from "../../services/apiAuth";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      toast.success(
        "Account successfully created! Please verufy the new account from the user's email address."
      );
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

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("User account successfully updated");
      queryClient.setQueryData(["user"], user);
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}