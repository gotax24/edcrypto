import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import CoinsContainer from "./components/CoinsContainer";
import NotFound from "./components/NotFound";
import WatchlistContainer from "./components/WatchlistContainer";
import CoinContainer from "./components/CoinContainer";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
//import FavoriteProvider from "./context/FavoriteProvider";

const App = () => {
  return (
    //<FavoriteProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CoinsContainer />} />
          <Route path="watchlist" element={<WatchlistContainer />} />
          <Route path="coin/:id" element={<CoinContainer />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </BrowserRouter>
    //</FavoriteProvider>
  );
};

export default App;
