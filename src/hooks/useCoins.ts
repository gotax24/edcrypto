import { getCoins } from "../services/coin.service";
import { useQuery } from "@tanstack/react-query";

export const useCoins = () => {
  return useQuery({
    queryKey: ["coins"],
    queryFn: getCoins,
    //refetchOnWindowFocus: false,
    //  refetchInterval: 60000, // Refrescar cada 60 segundos
  });
};
