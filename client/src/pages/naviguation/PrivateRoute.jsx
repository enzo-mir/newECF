import { Outlet, Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ isAdmin }) => {
  return isAdmin ? <Outlet /> : <Navigate to="/" />;
};
PrivateRoute.propTypes = {
  isAdmin: PropTypes.bool,
};
export default PrivateRoute;
