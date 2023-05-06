import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../Home";
import Carte from "../Carte";
import Admin from "../Admin";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PrivateRoute from "./PrivateRoute";
import Connect from "../../data/Connect";
import UndifinedRoute from "../UndifinedPage";
import { query } from "../../data/fetchAllData";
import { QueryClient, QueryClientProvider, useQueries } from "react-query";
import Loading from "../Loading";
import { carteQuery } from "../../data/fetchCarteData";
const client = new QueryClient();

const Navigation = ({ connected, admin }) => {
  const [isConnected, setIsConnected] = useState(connected);
  const [isAdmin, setIsAdmin] = useState(admin);
  const [userData, setUserData] = useState(null);

  const DataProvider = () => {
    const [cardQuery, allDataQuery] = useQueries([
      { queryKey: ["card"], queryFn: carteQuery },
      { queryKey: ["usesData"], queryFn: query },
    ]);

    return cardQuery.isLoading || allDataQuery.isLoading ? (
      <Loading />
    ) : cardQuery.error || allDataQuery.error ? (
      <div>error</div>
    ) : cardQuery.data && allDataQuery.data ? (
      <BrowserRouter>
        <Header
          isConnected={isConnected}
          display={true}
          data={userData}
          hours={allDataQuery.data.heures}
          isAdmin={isAdmin}
        />
        <Routes>
          <Route path="*" element={<UndifinedRoute />} />
          <Route
            path="/"
            element={<Home imagesApi={allDataQuery.data.image} />}
          />
          <Route
            path="/carte"
            element={
              <Carte
                entree={cardQuery.data.entree}
                plat={cardQuery.data.plat}
                dessert={cardQuery.data.dessert}
                menu={cardQuery.data.menu}
              />
            }
          />
          {isAdmin && (
            <Route element={<PrivateRoute isAdmin={isAdmin} />}>
              <Route
                path="/admin"
                element={
                  <Admin
                    heures={allDataQuery.data.heures}
                    imagesApi={allDataQuery.data.image}
                    entree={cardQuery.data.entree}
                    plat={cardQuery.data.plat}
                    dessert={cardQuery.data.dessert}
                    menu={cardQuery.data.menu}
                  />
                }
              />
            </Route>
          )}
        </Routes>
        <Footer hours={allDataQuery.data.heures} />
      </BrowserRouter>
    ) : null;
  };

  return (
    <QueryClientProvider client={client}>
      <DataProvider />
      <Connect
        isConnected={setIsConnected}
        isAdmin={setIsAdmin}
        setData={setUserData}
      />
    </QueryClientProvider>
  );
};

export default Navigation;
