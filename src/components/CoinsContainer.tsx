import { useState } from "react";
import CoinsTable from "./CoinsTable";
import CoinsNotFound from "./CoinsNotFound";
import Spinner from "./Spinner";
import { useCoins } from "../hooks/useCoins";

const CoinsContainer = () => {
  const [search, setSearch] = useState("");

  const { data: coinsList, isLoading, error } = useCoins();

  const filteredCoins = coinsList?.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-12">{error.message}</div>
    );
  }

  return (
    <>
      <input
        type="text"
        placeholder="Buscar criptomoneda"
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-3 mb-4 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-gray-100 placeholder-gray-500"
      />
      {filteredCoins && filteredCoins.length > 0 ? (
        <CoinsTable coins={filteredCoins} />
      ) : (
        <CoinsNotFound />
      )}
    </>
  );
};

export default CoinsContainer;
