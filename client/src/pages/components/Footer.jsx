import { useState } from "react";
import { Link } from "react-router-dom";
import { Wrapper } from "../../assets/style/footerStyle";
import Reserv from "./Reserv";

const Footer = ({ hours }) => {
  const [res, setRes] = useState(false);

  return (
    <>
      {res && <Reserv res={setRes} />}
      <Wrapper>
        <table id="horaires">
          <thead>
            <tr>
              <th>Horaires d'ouvertures</th>
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

export default Footer;
