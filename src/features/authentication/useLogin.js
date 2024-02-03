import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: (credential) => loginApi(credential),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      navigate("/dashboard");
    },
    onError: (error) => {
      console.log("ERROR", error);
      toast.error("Provided email/passord is incorrect");
    },
  });

  return { login, isLoading };
}
