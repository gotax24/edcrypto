import { use, useEffect, useRef, useState } from "react";
import type { CoinInterface } from "../interfaces/Coin";
import CoinsTable from "./CoinsTable";
import CoinsNotFound from "./CoinsNotFound";
import Spinner from "./Spinner";
import { COINGECKO_API_KEY, URL_API, URL_COINS } from "../constants/api";
import { FavoritesContext } from "../context/FavoriteContext";

const WatchlistContainer = () => {
  const [coinsList, setCoinsList] = useState<CoinInterface[]>([]);
  const [coinsListOriginal, setCoinsListOriginal] = useState<CoinInterface[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const { favorites } = use(FavoritesContext);

  useEffect(() => {
    fetch(
      `${URL_API}${URL_COINS}&x_cg_demo_api_key=${COINGECKO_API_KEY}&ids=${favorites.join(",")}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setCoinsList(data);
        setCoinsListOriginal(data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
        setError("Error al obtener los datos");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [favorites]);

  const handleSearch = () => {
    const searchValue = searchInput.current?.value || "";
    const newCoinsList = coinsListOriginal.filter((coin) =>
      coin.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setCoinsList(newCoinsList);
  };

  const handleClearFavorites = () => {
    localStorage.removeItem("favorites");
    setCoinsList([]);
    setCoinsListOriginal([]);
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-red-500 text-center py-12">{error}</div>;
  }

  return (
    <>
      <div className="flex justify-end">
        <button
          onClick={handleClearFavorites}
          className="bg-red-700 text-white px-4 py-2 rounded-lg mb-4"
        >
          Limpiar favoritos
        </button>
      </div>
      <input
        type="text"
        placeholder="Buscar criptomoneda"
        ref={searchInput}
        onChange={handleSearch}
        className="w-full px-4 py-3 mb-4 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-gray-100 placeholder-gray-500"
      />
      {coinsList.length > 0 ? (
        <CoinsTable coins={coinsList} />
      ) : (
        <CoinsNotFound />
      )}
    </>
  );
};

export default WatchlistContainer;
