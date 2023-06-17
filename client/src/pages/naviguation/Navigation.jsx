import { Routes, Route, BrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import UndifinedRoute from "../UndifinedPage";
import { connectStore } from "../../data/stores/connect.store";
import Connect from "../../data/Connect";
import QueryCard from "../../queryComponent/QueryCard";
import QueryHome from "../../queryComponent/QueryHome";
import Header from "../components/Header";
import QueryAdmin from "../../queryComponent/QueryAdmin";
import Footer from "../components/Footer";

const Navigation = () => {
  const connectedAdmin = connectStore((state) => state.connectedAdmin);

  return (
    <>
      <Connect />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="*" element={<UndifinedRoute />} />
          <Route path="/" element={<QueryHome />} />
          <Route path="/carte" element={<QueryCard />} />
          {connectedAdmin && (
            <Route element={<PrivateRoute isAdmin={connectedAdmin} />}>
              <Route path="/admin" element={<QueryAdmin />} />
            </Route>
          )}
        </Routes>
        <Footer />
      </BrowserRouter>
      ;
    </>
  );
};

export default Navigation;
