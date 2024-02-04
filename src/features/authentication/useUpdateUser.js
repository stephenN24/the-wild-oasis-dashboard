import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser as updateCurrentUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    // mutationFn only accept 1 argument
    mutationFn: updateCurrentUserApi,
    onSuccess: () => {
      toast.success("User successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (error) => toast.error(error.message),
  });
  return { updateUser, isUpdating };
}
