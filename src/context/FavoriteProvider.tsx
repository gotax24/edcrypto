import { useState } from "react";
import { FavoritesContext } from "./FavoriteContext";

const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
  // useState<T>(valorInicial) recibe un "genérico" <T> y un valor inicial.
  //
  // Retorna un ARRAY de 2 elementos:
  //   1. El valor actual del estado  → favorites
  //   2. Una función para actualizarlo → setFavorites
  //
  // Acá le decimos: el estado es un array de strings, arranca vacío [].
  //
  // 📦 CADA VEZ QUE LLAMÁS A setFavorites, React:
  //    1. Guarda el nuevo valor
  //    2. RE-RENDERIZA este componente y sus hijos
  //    3. Así la UI se actualiza automaticamente 🎉
  //
  // ⚠️  IMPORTANTE: NO hagas favorites.push(nuevoId).
  //    React necesita un NUEVO array (nueva referencia en memoria)
  //    para detectar el cambio. Por eso usamos spread (...):
  //    creamos un array NUEVO con todos los viejos + el nuevo.
  const [favorites, setFavorites] = useState<string[]>([]);

  const addFavorite = (id: string) => {
    setFavorites([...favorites, id]);
  };

  const removeFavorite = (id: string) => {
    // favorites.filter() crea un NUEVO array SIN el elemento que matchee.
    //
    // Cada elemento de favorites es un string (el ID directamente),
    // NO un objeto con propiedad .id.
    // Por eso comparamos favorite !== id (string vs string).
    // Si fuera un objeto {...} sería favorite.id !== id.
    setFavorites(favorites.filter((favorite) => favorite !== id));
  };

  const isFavorite = (id: string) => {
    return favorites.includes(id);
  };

  return (
    <FavoritesContext.Provider
      // value es lo que cualquier componente "consumidor" va a recibir.
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoriteProvider;
