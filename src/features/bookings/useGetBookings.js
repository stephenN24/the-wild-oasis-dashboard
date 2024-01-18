import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

function useGetBookings() {
  const { isLoading, data: bookings } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });
  return { isLoading, bookings };
}

export default useGetBookings;
