import { useState } from "react";
import heroImage from "../assets/images/heroImage.jpg";
import Reserv from "./components/Reserv";
import PropTypes from "prop-types";

import {
  Wrapper,
  HeroSection,
  ContextText,
  SectionPlats,
} from "../assets/style/homeStyle";

const Home = ({ imagesApi }) => {
  const [res, setRes] = useState(false);

  return (
    <Wrapper>
      {res && <Reserv res={setRes} />}
      <HeroSection>
        <div className="headerPage">
          <img src={heroImage} alt="accueil" loading="lazy" />
          <h1>Le Quai Antique</h1>
        </div>
        <ContextText>
          <p>
            Venez découvrir la Savoie à travers une expérience gastronomique,
            installé à Chambéry, Le Quai Antique saura vous satisfaire tout au
            long de votre repas.
          </p>
        </ContextText>
      </HeroSection>
      <SectionPlats>
        <p>
          Nos plats traditionnels de la Savoie charmeront à coup sûr vos
          papilles gustatives alors qu’attendez-vous ? <br />
          <br />
          Venez à table !
        </p>
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
        <button className="btnReserve" onClick={() => setRes(true)}>
          Réservez une table
        </button>
      </SectionPlats>
    </Wrapper>
  );
};

Home.propTypes = {
  imagesApi : PropTypes.array
}

export default Home;
