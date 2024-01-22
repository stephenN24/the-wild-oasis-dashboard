import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

function useGetBookings() {
  const [searchParam] = useSearchParams();

  //FILTER
  const filterValue = searchParam.get("status");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const { isLoading, data: bookings } = useQuery({
    queryKey: ["bookings", filter],
    queryFn: () => getBookings({ filter }),
  });
  return { isLoading, bookings };
}

export default useGetBookings;
