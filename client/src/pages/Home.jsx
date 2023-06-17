import { useState } from "react";
import Reserv from "./components/Reserv";
import PropTypes from "prop-types";
import { Wrapper, HeroSection, SectionPlats } from "../assets/style/homeStyle";

const Home = ({ imagesApi }) => {
  const [res, setRes] = useState(false);

  return (
    <Wrapper>
      {res && <Reserv res={setRes} />}
      <HeroSection>
        <div className="headerPage">
          <img
            src="https://images.unsplash.com/photo-1520209268518-aec60b8bb5ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=978&q=80"
            alt="accueil"
          />
          <aside>
            <h1>Le Quai Antique</h1>
            <h2>Votre restaurant de la savoie</h2>
            <button>
              <a href="#contextText">Découvrir</a>
            </button>
          </aside>
        </div>
      </HeroSection>

      <SectionPlats>
        <div className="textContent" id="contextText">
          <p>
            Venez découvrir la Savoie à travers une expérience gastronomique,
            installé à Chambéry, Le Quai Antique saura vous satisfaire tout au
            long de votre repas.
          </p>
          <p>
            Nos plats traditionnels de la Savoie charmeront à coup sûr vos
            papilles gustatives alors qu’attendez-vous ? <br />
            <br />
            Venez à table !
          </p>
        </div>
        <button className="btnReserve" onClick={() => setRes(true)}>
          Réservez une table
        </button>
        <div className="imagesGalery">
          {imagesApi.map((images, id) => {
            return (
              <div key={id}>
                <img src={images.lien} alt="plat du chef" loading="lazy" />
                <span>
                  <h1>{images.titre}</h1>
                  <p>{images.description}</p>
                </span>
              </div>
            );
          })}
        </div>
      </SectionPlats>
    </Wrapper>
  );
};

Home.propTypes = {
  imagesApi: PropTypes.array,
  hours: PropTypes.array,
  setReservation: PropTypes.func,
};

export default Home;
