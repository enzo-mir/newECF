import { useState, useRef } from "react";
import editBtn from "../assets/images/edit_btn.png";
import adminHoursPost from "../data/adminHoursPost";
import AdminEditImages from "./components/admin/AdminEditImages";
import {
  HoursContainer,
  ImgWrapper,
  CardContainer,
  Wrapper,
} from "../assets/style/adminStyle";
import adminImageDeleted from "../data/adminImageDeleted";
import PropTypes from "prop-types";
import { hourStore, imageStore } from "../data/stores/admin.store";
import { useNavigate } from "react-router-dom";
import AdminCard from "./components/admin/AdminCard";

const Admin = ({ imagesApi, card }) => {
  const [hoursEdit, setHoursEdit] = useState(false);
  const [displayEditImage, setDisplayEditImage] = useState(false);
  const [imagesEditTitle, setImageEditTitle] = useState();
  const [imagesEditDesc, setImageEditDesc] = useState();
  const [imagesEditUrl, setImageEditUrl] = useState();
  const [addImage, setAddImage] = useState();
  const [errorHour, setErrorHour] = useState(false);
  const [hours, setHour] = hourStore((state) => [state.hours, state.setHours]);
  const imageTitleDetails = useRef();
  const imageDescDetails = useRef();
  const navigate = useNavigate();

  const setImages = imageStore((state) => state.setImages);
  function editingHours(event, text, day, time, reverse) {
    if (reverse) {
      let inputs = document.querySelectorAll("table tr input");
      inputs.forEach((input) => {
        let element = document.createElement("td");
        element.innerText = input.value;
        input.parentNode.replaceChild(element, input);
        let childs = element.parentNode.children;
        element.onclick = (e) => {
          editingHours(
            e,
            e.target.textContent,
            element.parentNode.firstChild.textContent,
            childs[1] == element ? "lunch" : "dinner"
          );
          setHoursEdit(true);
        };
      });
    } else {
      let element = document.createElement("input");
      element.classList.add(time);
      element.setAttribute("id", day);
      element.onkeydown = (e) => {
        if (e.code === "Enter") {
          submitHourEdition(
            document.querySelectorAll("article table tbody input")
          );
        }
      };
      element.value = text;
      event.target.parentNode.replaceChild(element, event.target);
    }
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
    console.log(hourRegexTesting);
    if (hourRegexTesting) {
      setErrorHour(false);
      adminHoursPost(data).then((data) => {
        data.heures
          ? (setHoursEdit(false),
            setHour(data.heures),
            editingHours(null, null, null, null, true))
          : (setErrorHour(true), setHoursEdit(true));
      });
    } else setErrorHour(true);
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
  function handleDeleteImage(e) {
    let parentElement = e.target.parentNode.parentNode;
    let url = parentElement.querySelector("img").getAttribute("src");
    adminImageDeleted(url).then((data) =>
      data?.valid ? setImages(data.valid) : navigate(0)
    );
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
                    <button
                      onClick={(e) => {
                        handleDeleteImage(e);
                        e.target.disabled = true;
                      }}
                    >
                      Supprimer
                    </button>
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
              {hours?.map((elem, id) => {
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
          <AdminCard card={card} />
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
  imagesApi: PropTypes.array,
  card: PropTypes.object,
};

export default Admin;
