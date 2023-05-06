import { useEffect, useState } from "react";
import { Overlay } from "../../assets/style/overlay";
import { ContainerSettings } from "../../assets/style/profilComponentsStyle";
import updateProfil from "../../data/updateProfil";
import logout from "../../data/logout";
import deleteAccount from "../../data/deleteAccount";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ProfilComponent = ({ displayProfil, userData }) => {
  const navigate = useNavigate();
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(userData.userName);
  const [email, setEmail] = useState(userData.email);
  const [guests, setGuests] = useState(userData.convive);
  const [alergy, setAlergy] = useState(userData.alergie);
  const [validationMessage, setValidationMessage] = useState();
  const [mdp, setMdp] = useState(userData.password);
  let oldEmail = userData.email;
  let oldPassword = userData.password;

  useEffect(() => {
    return () => {
      document.body.removeAttribute("style");
    };
  }, []);

  document.body.style.overflow = "hidden";

  let updateData = {
    name,
    email,
    mdp,
    guests,
    alergy,
    oldEmail,
    oldPassword,
  };

  function edit(content) {
    if (!editable) {
      return <strong>{content}</strong>;
    } else {
      switch (content) {
        case name:
          return (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          );
        case email:
          return (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          );
        case guests:
          return (
            <input
              type="number"
              min="1"
              max="9"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          );
        case alergy:
          return (
            <input
              type="text"
              value={alergy}
              onChange={(e) => setAlergy(e.target.value)}
            />
          );
        case mdp:
          <input
            type="text"
            value={mdp}
            onChange={(e) => setMdp(e.target.value)}
          />;
          return;
        default:
          break;
      }
    }
  }

  function validationForm(obj) {
    let values = Object.values(obj);
    var nameRegex = new RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/);
    var emailRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g
    );
    var pwdRegex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/);
    var alergyRegex = new RegExp(/^([a-z+A-Z\\,]+[a-z+A-Z])$/gm);
    var guestsRegex = new RegExp(/^([1-9])$/);

    if (nameRegex.test(values[0]) && values[0]) {
      if (emailRegex.test(values[1]) && values[1]) {
        if (guestsRegex.test(values[3]) && values[3]) {
          if (alergyRegex.test(values[4]) || !values[4]) {
            if (pwdRegex.test(values[2] && values[2])) {
              updateProfil(
                values[0],
                values[1],
                values[2],
                values[3],
                values[4],
                values[5],
                values[6]
              ).then((data) =>
                Object.keys(data) == "error"
                  ? setValidationMessage(data.error)
                  : (setValidationMessage(data.valid), navigate(0))
              );
            } else {
              setValidationMessage(
                "le mot de passe doit être composé d'une majuscule, minuscule, d'un chiffre et avoir une longueur de 8 charactères"
              );
            }
          } else
            setValidationMessage(
              "aucuns caractères spéciaux ni numériques dans les alèrgies"
            );
        } else
          setValidationMessage(
            "le nombres de convives doit être entre 1 et 9 compris"
          );
      } else setValidationMessage("email invalide");
    } else
      setValidationMessage(
        "le champs nom et vide ou comporte autre choses que des lettres"
      );
  }

  function deletingAcc() {
    deleteAccount(name, email)
      .then((response) => response.json())
      .then((data) => {
        data.success
          ? location.reload()
          : data.error
          ? setValidationMessage(data.error)
          : null;
      });
  }

  return (
    <Overlay onClick={() => displayProfil(false)}>
      <ContainerSettings onClick={(e) => e.stopPropagation()}>
        {validationMessage ? (
          <p className="error">{validationMessage}</p>
        ) : null}
        <div className="profilAcount">
          <p>nom : {edit(name)}</p>
          <p>e-mail : {edit(email)}</p>
        </div>
        <div className="addsOn">
          <p>convives (par défaut) : {edit(guests)}</p>
          <p>alergies : {edit(alergy)}</p>
        </div>
        <div className="passwordField">
          <p>mot de passe : {edit(mdp)}</p>
        </div>
        <div className="cta">
          {!editable ? (
            <button
              onClick={() => {
                setEditable(!editable);
              }}
            >
              Éditer les infos
            </button>
          ) : (
            <button
              onClick={() => {
                setEditable(!editable);
                validationForm(updateData);
              }}
            >
              Édition finit
            </button>
          )}
          <button
            onClick={() => {
              logout();
              location.reload();
            }}
          >
            Déconnection
          </button>
          <button onClick={() => deletingAcc()}>supprimer le compte</button>
        </div>
      </ContainerSettings>
    </Overlay>
  );
};
ProfilComponent.propTypes = {
  userData: PropTypes.object,
  displayProfil: PropTypes.bool,
};
export default ProfilComponent;
