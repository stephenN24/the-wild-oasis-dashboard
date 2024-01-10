import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSettings as updateSettingsApi } from "../../services/apiSettings";

export default function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { mutate: updateSettings, isLoading: isUpdating } = useMutation({
    // mutationFn only accept 1 argument
    mutationFn: updateSettingsApi,
    onSuccess: () => {
      toast.success("Settings successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (error) => toast.error(error.message),
  });
  return { updateSettings, isUpdating };
}
