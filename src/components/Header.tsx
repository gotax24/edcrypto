import { Link } from "react-router-dom";
import { useFavoriteStore } from "../store/favoriteStore";

const Header = () => {
  const { countFavorites } = useFavoriteStore();
  return (
    <header className="bg-gray-900 text-white py-4 px-6 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-blue-400 transition-colors">
            Crypto
            <span className="text-blue-400">App</span>
          </Link>
        </div>

        <nav className="flex gap-6">
          <Link to="/" className="hover:text-blue-400 transition-colors">
            Home
          </Link>
          <Link
            to="/watchlist"
            className="hover:text-blue-400 transition-colors"
          >
            Favorites({countFavorites()})
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
