import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../Home";
import Card from "../Card";
import Admin from "../Admin";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PrivateRoute from "./PrivateRoute";
import Connect from "../../data/Connect";
import UndifinedRoute from "../UndifinedPage";
import PropTypes from "prop-types";

const Navigation = ({ cardQuery, allDataQuery }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState(null);

  return (
    <>
      <Connect
        isConnected={setIsConnected}
        isAdmin={setIsAdmin}
        setData={setUserData}
      />
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
              <Card
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
      ;
    </>
  );
};
Navigation.propTypes = {
  allDataQuery: PropTypes.object,
  cardQuery: PropTypes.object,
};
export default Navigation;
