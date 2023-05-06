import { useState } from "react";
import Reserv from "./components/Reserv";
import {
  CarteContainer,
  MenuContainer,
  LunchSection,
  PlatSection,
  DessertSection,
  MenuSection,
} from "../assets/style/carteStyle";

export default function Carte({ entree, plat, dessert, menu }) {
  const [res, setRes] = useState(false);


  function mapingSimilarityFood(food, title) {
    return food === entree || food === plat ? (
      <>
        <h2>{title}</h2>
        <div className="noshare">
          {food.map((element, id) => {
            return !element.partage ? (
              <div key={id}>
                <div>
                  <p>{element.nom}</p>
                  <p className="desc">{element.description}</p>
                </div>
                <p>{element.prix}€</p>
              </div>
            ) : null;
          })}
        </div>
        <div className="share">
          <h2>à partager (ou pas . . .)</h2>
          {food.map((element, id) => {
            return element.partage ? (
              <div key={id}>
                <div>
                  <p>{element.nom}</p>
                  <p className="desc">{element.description}</p>
                </div>
                <p>{element.prix}€</p>
              </div>
            ) : null;
          })}
        </div>
      </>
    ) : food === dessert ? (
      <>
        <h2>{title}</h2>
        {food.map((element, id) => {
          return (
            <div key={id}>
              <div>
                <p>{element.nom}</p>
                <p className="desc">{element.description}</p>
              </div>
              <p>{element.prix}€</p>
            </div>
          );
        })}
      </>
    ) : (
      <>
        <h2>{title}</h2>
        {food.map((element, id) => {
          return (
            <div key={id}>
              <p>{element.nom}</p>
              <article>
                <p>Formules : </p>
                <aside>
                  {element.formule.split(",").map((formule, index) => {
                    return <div key={index}>{formule}</div>;
                  })}
                </aside>
              </article>
            </div>
          );
        })}
      </>
    );
  }

  return (
    <>
      {res && <Reserv res={setRes} />}
      <CarteContainer>
        <h1>La carte</h1>
        <MenuContainer>
          <LunchSection>
            {mapingSimilarityFood(entree, "les entrées")}
          </LunchSection>
          <PlatSection>{mapingSimilarityFood(plat, "les plats")}</PlatSection>
          <DessertSection>
            {mapingSimilarityFood(dessert, "les desserts")}
          </DessertSection>
          <MenuSection>{mapingSimilarityFood(menu, "les menus")}</MenuSection>
        </MenuContainer>
      </CarteContainer>
    </>
  );
}
