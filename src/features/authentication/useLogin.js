import { useMutation } from "@tanstack/react-query";
import loginApi from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: (credential) => loginApi(credential),
    onSuccess: (user) => {
      console.log(user);
      navigate("/dashboard");
    },
    onError: (error) => {
      console.log("ERROR", error);
      toast.error("Provided email/passord is incorrect");
    },
  });

  return { login, isLoading };
}
