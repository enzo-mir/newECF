import { Overlay } from "../../../assets/style/overlay";
import { EditCardContainer } from "../../../assets/style/adminStyle";
import { Cross } from "../../../assets/style/cross";
import postUpdateCard from "../../../data/postUpdateCard";
import { useEffect } from "react";

const CardEdition = ({
  errorEditingCarte,
  titleCarteEdition,
  descCarteEdition,
  priceCarteEdition,
  setDisplayEditCard,
  setErrorEditingCard,
}) => {
  useEffect(() => {
    return () => {
      document.body.removeAttribute("style");
    };
  }, []);

  document.body.style.overflow = "hidden";

  return (
    <Overlay
      onClick={() => {
        setDisplayEditCard(false);
        setErrorEditingCard(false);
      }}
    >
      <EditCardContainer onClick={(e) => e.stopPropagation()}>
        <div>
          <Cross
            style={{ position: "absolute" }}
            onClick={() => {
              setDisplayEditCard(false);
              setErrorEditingCard(false);
            }}
          />
          <h1>Édition de la carte</h1>
          {errorEditingCarte && <p>{errorEditingCarte}</p>}
        </div>
        <div>
          <p>titre : {titleCarteEdition}</p>
          {descCarteEdition ? (
            <>
              <p>
                description :{" "}
                <strong style={{ textAlign: "center" }}>
                  {descCarteEdition}
                </strong>
              </p>
              <p>prix : {priceCarteEdition}</p>
            </>
          ) : (
            <p>
              formule : {priceCarteEdition}
              <sub>(Séparer les formules par des ",")</sub>
            </p>
          )}
        </div>
        <div>
          <input type="text" defaultValue={titleCarteEdition} />
          {descCarteEdition ? (
            <>
              <input type="text" defaultValue={descCarteEdition} />
              <input type="number" min="0" />
            </>
          ) : (
            <input type="text" defaultValue={priceCarteEdition} />
          )}
        </div>
        <button
          onClick={(e) => {
            e.target.parentNode.querySelectorAll("input").forEach((inputs) => {
              if (inputs.value === "") {
                setErrorEditingCard("erreur : champs non-remplis");
              } else {
                descCarteEdition
                  ? postUpdateCard(
                      titleCarteEdition,
                      descCarteEdition,
                      e.target.parentNode.children[2].firstChild.value,
                      e.target.parentNode.children[2].children[1].value,
                      e.target.parentNode.children[2].children[2].value,
                      null
                    )
                  : postUpdateCard(
                      titleCarteEdition,
                      descCarteEdition,
                      e.target.parentNode.children[2].firstChild.value,
                      null,
                      null,
                      e.target.parentNode.children[2].children[1].value
                    );
                window.location.reload();
                setErrorEditingCard(false);
              }
            });
          }}
        >
          Fin de l'édition
        </button>
      </EditCardContainer>
    </Overlay>
  );
};

export default CardEdition;
