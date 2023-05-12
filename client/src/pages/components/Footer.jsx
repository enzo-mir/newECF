import { useState } from "react";
import { Link } from "react-router-dom";
import { Wrapper } from "../../assets/style/footerStyle";
import Reserv from "./Reserv";
import PropTypes from "prop-types";

const Footer = ({ hours, data, setReservation }) => {
  const [res, setRes] = useState(false);

  return (
    <>
      {res && (
        <Reserv
          res={setRes}
          userData={data}
          setReservationData={setReservation}
        />
      )}
      <Wrapper>
        <table id="horaires">
          <thead>
            <tr>
              <th>Horaires d&#39;ouvertures</th>
            </tr>
          </thead>
          <tbody>
            {hours.map((elem, id) => {
              return (
                <tr key={id}>
                  <td>{elem.day}</td>
                  <td>{elem.lunch}</td>
                  <td>{elem.dinner}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <nav>
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/carte">Carte</Link>
            </li>
            <li>
              <button className="btnReserve" onClick={() => setRes(true)}>
                Réserver
              </button>
            </li>
          </ul>
        </nav>
        <p>Tous droits réservés</p>
      </Wrapper>
    </>
  );
};

Footer.propTypes = {
  hours: PropTypes.array,
  setReservation: PropTypes.func,
  data: PropTypes.object,
};

export default Footer;
