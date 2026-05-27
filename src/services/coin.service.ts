import { COINGECKO_API_KEY, URL_API, URL_COINS } from "../constants/api";
import type { CoinInterface } from "../interfaces/Coin";

export const getCoins = async (): Promise<CoinInterface[]> => {
  const response = await fetch(
    `${URL_API}${URL_COINS}&x_cg_demo_api_key=${COINGECKO_API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Error al obtener los datos");
  }

  const data = await response.json();
  return data;
};
