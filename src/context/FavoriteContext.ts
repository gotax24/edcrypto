import { createContext } from "react";

// ─── TIPOS (TypeScript) ─────────────────────────────────────────────
// Esto es una "interfaz" (interface). Es como un contrato que dice:
// "cualquier objeto que sea de tipo FavoritesContextType OBLIGATORIAMENTE
// va a tener estas 4 cosas: favorites, addFavorite, removeFavorite, isFavorite"
//
// ─── DIFERENCIA CON JS PLANO ─────────────────────────────────────────
// En JS normal una función puede devolver cualquier cosa y nadie se queja.
// En TS nosotros DECLARAMOS la forma que tienen los datos y si alguien
// no respeta esa forma, TS te marca error en el editor ANTES de ejecutar.
// Eso es útil para no cometer errores tontos (ej: poner un número donde
// va un string).

export interface FavoritesContextType {
  // favorites: un ARRAY de strings (los IDs de las criptos favoritas)
  // string[] es lo mismo que Array<string>
  favorites: string[];

  // addFavorite: una FUNCIÓN que recibe un string (el id de la cripto)
  // y NO devuelve nada (void = "vacío", no retorna valor)
  addFavorite: (id: string) => void;

  // removeFavorite: igual, recibe un id y no devuelve nada
  removeFavorite: (id: string) => void;

  // isFavorite: una FUNCIÓN que recibe un id y DEVUELVE un boolean
  // (true/false). Fíjate que acá dice "=> boolean" en vez de "=> void"
  isFavorite: (id: string) => boolean;
}

// ─── ¿QUÉ SIGNIFICA <FavoritesContextType>? ──────────────────────────
// Eso de "<>" son los "genéricos" de TypeScript.
// Es como pasarle un "argumento de tipo" a la función createContext.
//
// createContext espera que le digas: "che, ¿qué forma tienen los datos
// que vas a guardar acá?". Y nosotros le pasamos nuestra interfaz:
//
//   createContext<FavoritesContextType>(...)
//
// O sea: "este contexto va a guardar un objeto con la forma de
// FavoritesContextType (favorites, addFavorite, removeFavorite, isFavorite)".
//
// ─── ¿Y ESO DE "{} as FavoritesContextType"? ─────────────────────────
// createContext necesita un valor inicial (default).
// Nosotros le pasamos un objeto vacío {}.
//
// El problema: {} NO coincide con la interfaz FavoritesContextType
// (porque espera favorites, addFavorite, etc.).
//
// Por eso usamos "as FavoritesContextType".
// "as" es un "casting" de TypeScript. Le decimos:
// "confía en mí, tratá este {} como si fuera un FavoritesContextType".
//
// Es medio un "truco" porque el valor real lo vamos a poner después
// (en el provider, cuando envolvamos la app).

export const FavoritesContext = createContext<FavoritesContextType>({} as FavoritesContextType);
