import { useState, useEffect } from "react"
import type { CoinInterface } from "../interfaces/Coin"
import { Link } from "react-router-dom"
import { Star } from "lucide-react"

const Coin = ({id, name, symbol, current_price, image, price_change_percentage_24h}: CoinInterface) => {

  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    setIsFavorite(favorites.includes(id))
  }, [id])
  
  const handleFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    
    if (isFavorite) {
      // Quitar de favoritos
      const newFavorites = favorites.filter((favId: string) => favId !== id)
      localStorage.setItem("favorites", JSON.stringify(newFavorites))
      setIsFavorite(false)
    } else {
      // Agregar a favoritos
      localStorage.setItem("favorites", JSON.stringify([...favorites, id]))
      setIsFavorite(true)
    }
  }

  return (
    <tr className="hover:bg-gray-700 transition-colors">      
      <td className="px-6 py-4 text-sm text-gray-400">{id}</td>
      <td className="px-6 py-4">
        <Link to={`/coin/${id}`} className="flex items-center gap-3">
          <img src={image} alt={symbol} className="w-10 h-10 rounded-full" />
          <div className="flex flex-col">
            <span className="font-semibold text-gray-100">{name}</span>
            <span className="text-sm text-gray-500">{symbol}</span>
          </div>
        </Link>
      </td>
      <td className="px-6 py-4 text-sm font-medium text-gray-100">{current_price}</td>
      <td className="px-6 py-4 text-sm text-gray-400">{price_change_percentage_24h?.toFixed(2)}%</td>
      <td className="px-6 py-4">
        <button 
          onClick={handleFavorites}
          className="p-2 rounded-lg transition-all hover:bg-gray-600"
          title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          <Star 
            className={`w-6 h-6 transition-colors ${
              isFavorite 
                ? "fill-yellow-400 stroke-yellow-400" 
                : "fill-none stroke-gray-500"
            }`}
          />
        </button>
      </td>
    </tr>
  )
}

export default Coin