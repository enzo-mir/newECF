import { useEffect, useState } from "react";
import CardEdition from "./CardEdition";
import editBtn from "../../../assets/images/edit_btn.png";

const AdminCard = ({ card }) => {
  const [titleCardEdition, setTitleCardEdition] = useState("");
  const [descCardEdition, setDescCardEdition] = useState("");
  const [priceCardEdition, setPriceCardEdition] = useState("");
  const [formuleCardEdition, setFormuleCardEdition] = useState("");
  const [plat, setPlat] = useState(card.plat);
  const [entree, setEntree] = useState(card.entree);
  const [dessert, setDessert] = useState(card.dessert);
  const [menu, setMenu] = useState(card.menu);
  const [displayEditCard, setDisplayEditCard] = useState(false);
  const [choiceEat, setChoiceEat] = useState("");

  useEffect(() => {
    setPlat(card.plat);
    setEntree(card.entree);
    setDessert(card.dessert);
    setMenu(card.menu);
    displayEditCard
      ? (document.body.style.overflow = "hidden")
      : document.body.removeAttribute("style");
  }, [card, displayEditCard]);

  function editableCard(title, desc, price, formule, choiceEdit) {
    setTitleCardEdition(title);
    setDescCardEdition(desc);
    setPriceCardEdition(price);
    setFormuleCardEdition(formule);
    setChoiceEat(choiceEdit);
    setDisplayEditCard(true);
  }

  return (
    <>
      {displayEditCard ? (
        <CardEdition
          titleCarteEdition={titleCardEdition}
          formuleCarteEdition={formuleCardEdition}
          descCarteEdition={descCardEdition}
          priceCarteEdition={priceCardEdition}
          setDisplayEditCard={setDisplayEditCard}
          choiceEdit={choiceEat}
        />
      ) : null}

      <h1>Carte du restaurant</h1>
      <h2>Entrées</h2>
      <div className="content">
        <>
          <div className="seul">
            <h2>Seul</h2>
            {entree.map((food, id) => {
              return !food.partage ? (
                <div key={id}>
                  <h3>{food.nom}</h3>
                  <p>{food.description}</p>
                  <p>{food.prix}€</p>
                  <button
                    onClick={() =>
                      editableCard(
                        food.nom,
                        food.description,
                        food.prix,
                        null,
                        "entree"
                      )
                    }
                  >
                    <img src={editBtn} alt="edit btn" />
                  </button>
                </div>
              ) : null;
            })}
          </div>
          <div className="partage">
            <h2>Partager</h2>
            {entree.map((food, id) => {
              return food.partage ? (
                <div key={id}>
                  <h3>{food.nom}</h3>
                  <p>{food.description}</p>
                  <p>{food.prix}€</p>
                  <button
                    onClick={() =>
                      editableCard(
                        food.nom,
                        food.description,
                        food.prix,
                        null,
                        "entree"
                      )
                    }
                  >
                    <img src={editBtn} alt="edit btn" />
                  </button>
                </div>
              ) : null;
            })}
          </div>
        </>
      </div>
      <h2>Plats</h2>
      <div className="content">
        <>
          <div className="seul">
            <h2>Seul</h2>
            {plat.map((food, id) => {
              return !food.partage ? (
                <div key={id}>
                  <h3>{food.nom}</h3>
                  <p>{food.description}</p>
                  <p>{food.prix}€</p>
                  <button
                    onClick={() =>
                      editableCard(
                        food.nom,
                        food.description,
                        food.prix,
                        null,
                        "plat"
                      )
                    }
                  >
                    <img src={editBtn} alt="edit btn" />
                  </button>
                </div>
              ) : null;
            })}
          </div>
          <div className="partage">
            <h2>Partager</h2>
            {plat.map((food, id) => {
              return food.partage ? (
                <div key={id}>
                  <h3>{food.nom}</h3>
                  <p>{food.description}</p>
                  <p>{food.prix}€</p>
                  <button
                    onClick={() =>
                      editableCard(
                        food.nom,
                        food.description,
                        food.prix,
                        null,
                        "plat"
                      )
                    }
                  >
                    <img src={editBtn} alt="edit btn" />
                  </button>
                </div>
              ) : null;
            })}
          </div>
        </>
      </div>
      <h2>Desserts</h2>
      <div className="content">
        <div>
          {dessert.map((food, id) => {
            return (
              <div key={id} className="dessert">
                <h3>{food.nom}</h3>
                <p>{food.description}</p>
                <p>{food.prix}€</p>
                <button
                  onClick={() =>
                    editableCard(
                      food.nom,
                      food.description,
                      food.prix,
                      null,
                      "dessert"
                    )
                  }
                >
                  <img src={editBtn} alt="edit btn" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <h2>Menus</h2>
      <div className="content">
        <div>
          {menu.map((food, id) => {
            return (
              <div key={id} className="menu">
                <h3>{food.nom}</h3>
                <p>{food.description}</p>
                <p>{food.formule}</p>
                <button
                  onClick={() =>
                    editableCard(
                      food.nom,
                      food.description,
                      null,
                      food.formule,
                      "formule"
                    )
                  }
                >
                  <img src={editBtn} alt="edit btn" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AdminCard;
