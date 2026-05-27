import { useQuery } from "@tanstack/react-query";
import { getCoinById } from "../services/coin.service";

export const useCoin = (id: string) => {
  return useQuery({
    queryKey: ["coin", id],
    queryFn: () => getCoinById(id),
    enabled: !!id,
    //refetching: false,
    //refetchInterval: 5000,
  });
};
