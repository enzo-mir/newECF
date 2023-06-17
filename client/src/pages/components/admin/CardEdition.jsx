import { Overlay } from "../../../assets/style/overlay";
import { EditCardContainer } from "../../../assets/style/adminStyle";
import { Cross } from "../../../assets/style/cross";
import postUpdateCard from "../../../data/postUpdateCard";
import { cardStore } from "../../../data/stores/admin.store";
import { useState } from "react";

const CardEdition = ({
  titleCarteEdition,
  descCarteEdition,
  priceCarteEdition,
  formuleCarteEdition,
  setDisplayEditCard,
  choiceEdit,
}) => {
  const setCardStore = cardStore((state) => state.setCardStore);
  const [errorEditingCard, setErrorEditingCard] = useState(false);
  const [title, setTitle] = useState(titleCarteEdition);
  const [desc, setDesc] = useState(descCarteEdition);
  const [price, setPrice] = useState(priceCarteEdition);
  const [formule, setFormule] = useState(formuleCarteEdition);

  function submitEdition() {
    if (!errorEditingCard) {
      postUpdateCard(
        titleCarteEdition,
        descCarteEdition,
        title,
        desc,
        price,
        formule,
        choiceEdit
      ).then((data) =>
        data.error
          ? setErrorEditingCard(data.error)
          : (setCardStore(data), setDisplayEditCard(false))
      );
    }
  }

  return (
    <Overlay
      onClick={() => {
        setDisplayEditCard(false);
        setErrorEditingCard(false);
      }}
    >
      <EditCardContainer
        onClick={(e) => e.stopPropagation()}
        className="cardEditionCont"
      >
        <div>
          <Cross
            style={{ position: "absolute" }}
            onClick={() => {
              setDisplayEditCard(false);
              setErrorEditingCard(false);
            }}
          />
          <h1>Édition de la carte</h1>
          {errorEditingCard && (
            <p style={{ color: "red" }}>{errorEditingCard}</p>
          )}
        </div>
        <div>
          <p>titre : {title}</p>
          {formuleCarteEdition == null ? (
            <>
              <p>description : {desc}</p>
              <p>prix : {price}€</p>
            </>
          ) : (
            <p>
              formule : {formule}
              <br />
              <sub>(Séparer les formules par des virgules)</sub>
            </p>
          )}
        </div>
        <div>
          <input
            type="text"
            defaultValue={titleCarteEdition}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              !e.target.value
                ? setErrorEditingCard("Erreur : Champ(s) non-remplis")
                : setErrorEditingCard("");
            }}
          />
          {formuleCarteEdition == null ? (
            <>
              <input
                type="text"
                defaultValue={descCarteEdition}
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                  !e.target.value
                    ? setErrorEditingCard("Erreur : Champ(s) non-remplis")
                    : setErrorEditingCard("");
                }}
              />
              <input
                type="number"
                min="0"
                maxLength="5"
                defaultValue={priceCarteEdition}
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                  !e.target.value
                    ? setErrorEditingCard("Erreur : Champ(s) non-remplis")
                    : setErrorEditingCard("");
                }}
              />
            </>
          ) : (
            <input
              type="text"
              defaultValue={formuleCarteEdition}
              value={formule}
              onChange={(e) => {
                setFormule(e.target.value);
                !e.target.value
                  ? setErrorEditingCard("Erreur : Champ(s) non-remplis")
                  : setErrorEditingCard("");
              }}
            />
          )}
        </div>
        <button onClick={submitEdition}>Fin de l&lsquo;édition</button>
      </EditCardContainer>
    </Overlay>
  );
};

export default CardEdition;
