import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingFn } from "../../services/apiBookings";
import toast from "react-hot-toast";

export default function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isLoading: isDeletingBooking } = useMutation({
    mutationFn: (bookingId) => deleteBookingFn(bookingId),

    onSuccess: (data) => {
      toast.success(`Booking successfully deleted`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => {
      toast.error("There was an issue while deleting booking");
    },
  });
  return { deleteBooking, isDeletingBooking };
}
