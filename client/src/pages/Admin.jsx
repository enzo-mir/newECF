import { useState, useEffect, useRef } from "react";
import editBtn from "../assets/images/edit_btn.png";
import adminHoursPost from "../data/adminHoursPost";
import AdminEditImages from "./components/admin/AdminEditImages";
import {
  HoursContainer,
  ImgWrapper,
  CardContainer,
  Wrapper,
} from "../assets/style/adminStyle";
import logout from "../data/logout";
import adminImageDeleted from "../data/adminImageDeleted";
import CardEdition from "./components/admin/CardEdition";
import PropTypes from "prop-types";

const Admin = ({ heures, imagesApi, entree, plat, dessert, menu }) => {
  const [hoursEdit, setHoursEdit] = useState(false);
  const [displayEditCarte, setDisplayEditCard] = useState(false);
  const [titleCarteEdition, setTitleCarteEdition] = useState("");
  const [descCarteEdition, setDescCarteEdition] = useState("");
  const [priceCarteEdition, setPriceCarteEdition] = useState("");
  const [errorEditingCarte, setErrorEditingCard] = useState(false);
  const [displayEditImage, setDisplayEditImage] = useState(false);
  const [imagesEditTitle, setImageEditTitle] = useState();
  const [imagesEditDesc, setImageEditDesc] = useState();
  const [imagesEditUrl, setImageEditUrl] = useState();
  const [addImage, setAddImage] = useState();
  const [errorHour, setErrorHour] = useState(false);
  const imageTitleDetails = useRef();
  const imageDescDetails = useRef();

  useEffect(() => {
    return () => {
      logout();
      location.reload();
    };
  }, []);

  function editingHours(event, text, day, time) {
    let element = document.createElement("input");
    element.classList.add(time);
    element.setAttribute("id", day);
    element.value = text;
    event.target.parentNode.replaceChild(element, event.target);
  }

  function submitHourEdition(elem) {
    let data = [];
    elem.forEach((element) => {
      let day = elem[0].parentElement.firstChild.textContent;
      let time = element.getAttribute("class");
      data.push({ day: day, time: time, target: element.value });
    });
    let hourRegexTesting;
    for (let i = 0; i < elem.length; i++) {
      let hourRegexe = new RegExp(
        /^(fermer)|([0-1][0-9]|2[0-4])h([1-5][0-9]|60|0[1-9]|[1-9]0)? - ([0-1][0-9]|2[0-4])h([1-5][0-9]|60|0[1-9]|[1-9]0)?$/dgim
      );
      const inputs = elem[i];
      hourRegexTesting = hourRegexe.test(inputs.value);
    }

    if (hourRegexTesting) {
      setErrorHour(false);
      adminHoursPost(data);
      window.location.reload();
    } else setErrorHour(true);
  }

  function editableCard(event) {
    let title = event.target.parentNode.firstChild.textContent;
    let desc = event.target.parentNode.children[1].textContent;
    let price = event.target.parentNode.children[2].textContent;
    setTitleCarteEdition(title);
    setDescCarteEdition(desc);
    setPriceCarteEdition(price);
    setDisplayEditCard(true);
  }

  function imageEdit(event, title, description) {
    imageTitleDetails.current = title;
    imageDescDetails.current = description;
    let parentElement = event.target.parentNode.parentNode;
    let imageTargeted = parentElement.querySelector("img");

    setImageEditUrl(imageTargeted.getAttribute("src"));
    setImageEditTitle(imageTitleDetails.current);
    setImageEditDesc(imageDescDetails.current);

    setAddImage(false);
    setDisplayEditImage(true);
  }

  function handleDelete(e) {
    let parentElement = e.target.parentNode.parentNode;
    let url = parentElement.querySelector("img").getAttribute("src");
    adminImageDeleted(url).then(location.reload());
  }

  function imageAdd() {
    setImageEditUrl(null);
    setImageEditTitle("");
    setImageEditDesc("");
    setAddImage(true);
    setDisplayEditImage(true);
  }

  return (
    <>
      <Wrapper>
        {displayEditImage ? (
          <AdminEditImages
            title={imagesEditTitle}
            description={imagesEditDesc}
            url={imagesEditUrl}
            displaying={setDisplayEditImage}
            adding={addImage}
          />
        ) : null}
        <ImgWrapper>
          <h1>Galerie d&#39;images</h1>
          <div className="imgGalery">
            {imagesApi.map((images, id) => {
              return (
                <div key={id}>
                  <img src={images.lien} alt="plats du chef" />
                  <p>
                    Titre : {images.titre}
                    <br />
                    <br />
                    Description : {images.description}
                  </p>
                  <aside>
                    <button
                      onClick={(e) =>
                        imageEdit(e, images.titre, images.description)
                      }
                    >
                      Éditer
                    </button>
                    <button onClick={(e) => handleDelete(e)}>Supprimer</button>
                  </aside>
                </div>
              );
            })}
            <button onClick={() => imageAdd()}>Ajouter +</button>
          </div>
        </ImgWrapper>
        <HoursContainer>
          <h1>Horaires d&#39;ouvertures</h1>
          <p>(Cliquez sur les horaires pour les éditer)</p>
          <p className={errorHour ? "format" : ""}>
            Format horaires, exemples : <br />
            12h - 15h, 12h30 - 15h10, fermer
          </p>
          <table>
            <thead>
              <tr>
                <td>jour</td>
                <td>midi</td>
                <td>soir</td>
              </tr>
              <tr>
                <td></td>
                <td>ouverture-fermeture</td>
                <td>ouverture-fermeture</td>
              </tr>
            </thead>
            <tbody>
              {heures.map((elem, id) => {
                return (
                  <tr key={id}>
                    <>
                      <td>{elem.day}</td>
                      <td
                        onClick={(e) => {
                          editingHours(
                            e,
                            e.target.textContent,
                            elem.day,
                            "lunch"
                          );
                          setHoursEdit(true);
                        }}
                      >
                        {elem.lunch}
                      </td>
                      <td
                        onClick={(e) => {
                          editingHours(
                            e,
                            e.target.textContent,
                            elem.day,
                            "dinner"
                          );
                          setHoursEdit(true);
                        }}
                      >
                        {elem.dinner}
                      </td>
                    </>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {hoursEdit ? (
            <div className="ctaEdit">
              <p>Édition finit</p>
              <button
                onClick={() =>
                  submitHourEdition(
                    document.querySelectorAll("article table tbody input")
                  )
                }
              >
                <img src={editBtn} alt="édition" />
              </button>
            </div>
          ) : null}
        </HoursContainer>
        <CardContainer>
          {displayEditCarte ? (
            <CardEdition
              errorEditingCarte={errorEditingCarte}
              titleCarteEdition={titleCarteEdition}
              descCarteEdition={descCarteEdition}
              priceCarteEdition={priceCarteEdition}
              setDisplayEditCard={setDisplayEditCard}
              setErrorEditingCard={setErrorEditingCard}
            />
          ) : null}
          <h1>Carte du restaurant</h1>
          <h2>Entrées</h2>
          <div className="content">
            {entree ? (
              <>
                <div className="seul">
                  <h2>Seul</h2>
                  {entree.map((food, id) => {
                    return !food.partage ? (
                      <div key={id}>
                        <h3>{food.nom}</h3>
                        <p>{food.description}</p>
                        <p>{food.prix}€</p>
                        <button onClick={(e) => editableCard(e)}>
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
                        <button onClick={(e) => editableCard(e)}>
                          <img src={editBtn} alt="edit btn" />
                        </button>
                      </div>
                    ) : null;
                  })}
                </div>
              </>
            ) : null}
          </div>
          <h2>Plats</h2>
          <div className="content">
            {plat ? (
              <>
                <div className="seul">
                  <h2>Seul</h2>
                  {plat.map((food, id) => {
                    return !food.partage ? (
                      <div key={id}>
                        <h3>{food.nom}</h3>
                        <p>{food.description}</p>
                        <p>{food.prix}€</p>
                        <button onClick={(e) => editableCard(e)}>
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
                        <button onClick={(e) => editableCard(e)}>
                          <img src={editBtn} alt="edit btn" />
                        </button>
                      </div>
                    ) : null;
                  })}
                </div>
              </>
            ) : null}
          </div>
          <h2>Desserts</h2>
          <div className="content">
            {dessert ? (
              <div>
                {dessert.map((food, id) => {
                  return (
                    <div key={id} className="dessert">
                      <h3>{food.nom}</h3>
                      <p>{food.description}</p>
                      <p>{food.prix}€</p>
                      <button onClick={(e) => editableCard(e)}>
                        <img src={editBtn} alt="edit btn" />
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
          {menu ? (
            <>
              <h2>Menus</h2>
              <div className="content">
                <div>
                  {menu.map((food, id) => {
                    return (
                      <div key={id} className="menu">
                        <h3>{food.nom}</h3>
                        <p>{food.description}</p>
                        <p>{food.formule}</p>
                        <button onClick={(e) => editableCard(e)}>
                          <img src={editBtn} alt="edit btn" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : null}
        </CardContainer>
        <article>
          <h1>
            Nombre de convives maximum du restaurant <br />
            35 personnes
          </h1>
        </article>
      </Wrapper>
    </>
  );
};

Admin.propTypes = {
  entree: PropTypes.object,
  plat: PropTypes.object,
  dessert: PropTypes.object,
  menu: PropTypes.object,
  heures: PropTypes.array,
  imagesApi: PropTypes.array,
};

export default Admin;
