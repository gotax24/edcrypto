import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import { useCoin } from "../hooks/useCoin";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Activity,
  Coins,
  Calendar,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

const CoinContainer = () => {
  const { id } = useParams();
  const { data: coin, isLoading, isRefetching, error } = useCoin(id!);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 text-lg">
          Error al cargar la moneda: {error.message}
        </p>
      </div>
    );
  }

  if (!coin) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">
          No se encontró información de la moneda
        </p>
      </div>
    );
  }

  const isPriceUp = coin.price_change_percentage_24h >= 0;
  const formatNumber = (num: number | null) => {
    if (num === null || num === undefined) return "N/A";
    return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(
      num,
    );
  };
  const formatCurrency = (num: number | null) => {
    if (num === null || num === undefined) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header Section */}
      <div className="bg-gray-800 rounded-lg p-8 mb-6">
        <div className="flex items-center gap-6 mb-6">
          <img
            src={coin.image}
            alt={coin.name}
            className="w-20 h-20 rounded-full"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-100">{coin.name}</h1>
            <p className="text-xl text-gray-500 uppercase">{coin.symbol}</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-gray-100">
              {formatCurrency(coin.current_price)}
            </div>
            <div
              className={`flex items-center justify-end gap-2 mt-2 text-lg font-semibold ${isPriceUp ? "text-green-500" : "text-red-500"}`}
            >
              {isPriceUp ? (
                <TrendingUp size={20} />
              ) : (
                <TrendingDown size={20} />
              )}
              <span>{coin.price_change_percentage_24h?.toFixed(2)}%</span>
              <span className="text-gray-400 text-sm">
                ({formatCurrency(coin.price_change_24h)})
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Market Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="text-blue-400" size={24} />
            <h3 className="text-sm font-medium text-gray-400">Market Cap</h3>
          </div>
          <p className="text-2xl font-bold text-gray-100">
            {formatCurrency(coin.market_cap)}
          </p>
          <p
            className={`text-sm mt-1 ${coin.market_cap_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}`}
          >
            {coin.market_cap_change_percentage_24h?.toFixed(2)}% (24h)
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="text-blue-400" size={24} />
            <h3 className="text-sm font-medium text-gray-400">Volume 24h</h3>
          </div>
          <p className="text-2xl font-bold text-gray-100">
            {formatCurrency(coin.total_volume)}
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <Coins className="text-blue-400" size={24} />
            <h3 className="text-sm font-medium text-gray-400">
              Market Cap Rank
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-100">
            #{coin.market_cap_rank || "N/A"}
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="text-blue-400" size={24} />
            <h3 className="text-sm font-medium text-gray-400">
              Fully Diluted Valuation
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-100">
            {formatCurrency(coin.fully_diluted_valuation)}
          </p>
        </div>
      </div>

      {/* Price Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-100 mb-4 flex items-center gap-2">
            <ArrowUp className="text-green-500" size={24} />
            All-Time High
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Price:</span>
              <span className="text-lg font-semibold text-gray-100">
                {formatCurrency(coin.ath)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Change:</span>
              <span className="text-lg font-semibold text-red-500">
                {coin.ath_change_percentage?.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Date:</span>
              <span className="text-sm text-gray-100">
                {formatDate(coin.ath_date)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-100 mb-4 flex items-center gap-2">
            <ArrowDown className="text-red-500" size={24} />
            All-Time Low
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Price:</span>
              <span className="text-lg font-semibold text-gray-100">
                {formatCurrency(coin.atl)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Change:</span>
              <span className="text-lg font-semibold text-green-500">
                +{coin.atl_change_percentage?.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Date:</span>
              <span className="text-sm text-gray-100">
                {formatDate(coin.atl_date)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 24h Price Range */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-100 mb-4">
          24h Price Range
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm text-gray-400">Low</span>
              <p className="text-xl font-bold text-gray-100">
                {formatCurrency(coin.low_24h)}
              </p>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-400">High</span>
              <p className="text-xl font-bold text-gray-100">
                {formatCurrency(coin.high_24h)}
              </p>
            </div>
          </div>
          <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="absolute h-full bg-linear-to-r from-blue-400 to-blue-600 rounded-full"
              style={{
                width: `${((coin.current_price - coin.low_24h) / (coin.high_24h - coin.low_24h)) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Supply Information */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-100 mb-4">
          Supply Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">
              Circulating Supply
            </h3>
            <p className="text-xl font-bold text-gray-100">
              {formatNumber(coin.circulating_supply)}
            </p>
            <p className="text-xs text-gray-500 mt-1 uppercase">
              {coin.symbol}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">
              Total Supply
            </h3>
            <p className="text-xl font-bold text-gray-100">
              {formatNumber(coin.total_supply)}
            </p>
            <p className="text-xs text-gray-500 mt-1 uppercase">
              {coin.symbol}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">
              Max Supply
            </h3>
            <p className="text-xl font-bold text-gray-100">
              {coin.max_supply ? formatNumber(coin.max_supply) : "∞"}
            </p>
            <p className="text-xs text-gray-500 mt-1 uppercase">
              {coin.max_supply ? coin.symbol : "Unlimited"}
            </p>
          </div>
        </div>
      </div>

      {/* Last Updated */}
      <div className="mt-6 text-center text-sm text-gray-500">
        Last updated: {formatDate(coin.last_updated)}
      </div>

      {/* Mini spinner de refetching — aparece cuando se está actualizando en background */}
      {isRefetching && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-gray-800/80 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
          <div className="w-5 h-5 border-[3px] border-gray-600 border-t-blue-500 rounded-full animate-spin" />
          <span className="text-xs text-gray-300">Actualizando...</span>
        </div>
      )}
    </div>
  );
};

export default CoinContainer;
