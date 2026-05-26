import { create } from "zustand";
import { persist } from "zustand/middleware";

// ─── INTERFAZ ─────────────────────────────────────────────────────────
// Misma idea que en FavoriteContext, pero Zustand no necesita Provider.
// El estado es "global" y cualquier componente lo puede leer/escribir
// llamando a useFavoriteStore().

interface FavoriteStore {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  countFavorites: () => number;
}

// ─── create ───────────────────────────────────────────────────────────
// create<FavoriteStore>()( ... ) son dobles paréntesis porque:
//   1. create<FavoriteStore>()    → devuelve una función
//   2. (...store definition...)   → llamás a esa función con el store
//
// ─── persist (middleware) ────────────────────────────────────────────
// persist envuelve el store y lo sincroniza con localStorage.
// { name: "favorite" } → en DevTools vas a ver una key "favorite"
// con tus favoritos guardados. Si recargás la página, NO se pierden.
//
// ─── set vs get ───────────────────────────────────────────────────────
// set: actualiza el estado (como setFavorites). React re-renderiza
//       automáticamente los componentes que usen esta parte del estado.
//
// get: Lee el valor ACTUAL del estado sin "suscribirse" al cambio.
//      Útil para funciones que devuelven un valor calculado (isFavorite,
//      countFavorites) sin causar re-renders innecesarios.
//
// 💡 DIFERENCIA CLAVE con useState:
//    En Context usábamos setFavorites([...favorites, id]).
//    Acá usamos set((state) => ({ favorites: [...state.favorites, id] })).
//    set recibe un callback que recibe el state actual y devuelve el
//    nuevo estado. Nunca tocamos el array directamente.

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (id: string) =>
        set((state) => ({ favorites: [...state.favorites, id] })),

      removeFavorite: (id: string) =>
        set((state) => ({
          favorites: state.favorites.filter((favorite) => favorite !== id),
        })),

      // get() lee el estado sin subscribirse.
      // Si usáramos set(), causaría un re-render al pedo.
      isFavorite: (id: string) => get().favorites.includes(id),
      countFavorites: () => get().favorites.length,
    }),
    { name: "favorite" },
  ),
);
