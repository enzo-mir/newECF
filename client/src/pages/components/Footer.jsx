import { useState } from "react";
import { Link } from "react-router-dom";
import { Wrapper } from "../../assets/style/footerStyle";
import Reserv from "./Reserv";
import { hourStore } from "../../data/stores/admin.store";

const Footer = () => {
  const [res, setRes] = useState(false);
  const hoursStore = hourStore((state) => state.hours);

  return (
    <>
      {res && <Reserv res={setRes} />}
      <Wrapper>
        <table id="horaires">
          <thead>
            <tr>
              <th>Horaires d&#39;ouvertures</th>
            </tr>
          </thead>
          <tbody>
            {hoursStore.length &&
              hoursStore?.map((elem, id) => {
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
