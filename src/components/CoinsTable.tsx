import type { CoinInterface } from "../interfaces/Coin";
import Coin from "./Coin";

const CoinsTable = ({ coins }: { coins: CoinInterface[] }) => {
  return (
    <table className="w-full bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <thead className="bg-gray-900 border-b border-gray-700">
        <tr>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
            Orden
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
            Nombre
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
            Precio
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
            Cambio 24h
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
            Favorito
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-700">
        {coins.map((coin) => (
          <Coin
            key={coin.id}
            id={coin.id}
            name={coin.name}
            symbol={coin.symbol}
            current_price={coin.current_price}
            price_change_percentage_24h={coin.price_change_percentage_24h}
            image={coin.image}
          />
        ))}
      </tbody>
    </table>
  );
};

export default CoinsTable;
