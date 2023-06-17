import { useEffect, useRef, useState } from "react";
import { Overlay } from "../../../assets/style/overlay";
import { Cross } from "../../../assets/style/cross";
import PropTypes from "prop-types";
import { imageStore } from "../../../data/stores/admin.store";
import { useNavigate } from "react-router-dom";
import { ContainerWrapperEditImage } from "../../../assets/style/adminStyle";

const AdminEditImages = ({ title, description, url, displaying, adding }) => {
  const [titleChange, setTitleChange] = useState(title);
  const [descChange, setDescChange] = useState(description);
  const [imgSrc, setImgSrc] = useState(url);
  const [error, setError] = useState(false);
  const setImages = imageStore((state) => state.setImages);

  let navigate = useNavigate();

  useEffect(() => {
    return () => {
      document.body.removeAttribute("style");
    };
  }, []);

  document.body.style.overflow = "hidden";

  const [imgTargetFile, setImgTargetFile] = useState();
  let fd = useRef(null);

  function handleChange(event) {
    let file = event.target.files[0];
    setImgTargetFile(file);
    let urlChanging = URL.createObjectURL(file);
    fd.current = new FormData();
    fd.current.append("file", file);
    fd.current.append("upload_preset", "wd7vsf01");
    setImgSrc(urlChanging);
  }

  function handleSubmitEdition(e) {
    e.target.disabled = true;
    if (imgTargetFile) {
      if (
        imgTargetFile.type === "image/png" ||
        imgTargetFile.type === "image/jpeg" ||
        imgTargetFile.type === "image/jpg"
      ) {
        fetch(`https://api.cloudinary.com/v1_1/dbo6hyl8t/image/upload`, {
          method: "POST",
          body: fd.current,
        })
          .then((response) => response.json())
          .then(async (data) => {
            await data;
            fetch("/adminImageEdited", {
              method: "POST",
              headers: {
                "Content-Type": "application/json; charset=utf-8",
                Connection: "keep-alive",
                Accept: "*",
              },
              body: JSON.stringify({
                titre: titleChange,
                desc: descChange,
                oldUrl: url,
                newUrl: data.secure_url,
                pubId: data.public_id,
                add: false,
              }),
            })
              .then((resp) => resp.json())
              .then((data) => {
                data?.valid
                  ? (setImages(data.valid),
                    setError(data.message),
                    displaying(false))
                  : (setError("Erreur lors de la modification"),
                    (e.target.disabled = false));
              });
          });
        setError(false);
      } else {
        setError("Erreur de format, format convenus : JPG, PNG, JPEG ");
      }
    } else {
      fetch("/adminImageEdited", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Connection: "keep-alive",
          Accept: "*",
        },
        body: JSON.stringify({
          titre: titleChange,
          desc: descChange,
          oldUrl: url,
          newUrl: url,
          pubId: null,
          add: false,
        }),
      }).then(location.reload());
    }
  }

  function handleSubmitAdd() {
    if (
      imgTargetFile.type === "image/png" ||
      imgTargetFile.type === "image/jpeg" ||
      imgTargetFile.type === "image/jpg"
    ) {
      if (imgTargetFile) {
        if (titleChange) {
          if (descChange) {
            fetch(`https://api.cloudinary.com/v1_1/dbo6hyl8t/image/upload`, {
              method: "POST",
              body: fd.current,
            })
              .then((response) => response.json())
              .then((data) => {
                fetch("/adminImageEdited", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    Connection: "keep-alive",
                    Accept: "*",
                  },
                  body: JSON.stringify({
                    titre: titleChange,
                    desc: descChange,
                    oldUrl: data.secure_url,
                    newUrl: data.secure_url,
                    pubId: data.public_id,
                    add: true,
                  }),
                })
                  .then((resp) => resp.json())
                  .then((data) => {
                    data?.valid
                      ? (setImages(data.valid),
                        setError(data.message),
                        displaying(false))
                      : navigate(0);
                  });
              });
          }
        }
      }
    } else {
      setError("Erreur de format, format convenus : JPG, PNG, JPEG ");
    }
  }

  return (
    <Overlay onClick={() => displaying(false)}>
      <ContainerWrapperEditImage onClick={(e) => e.stopPropagation()}>
        <Cross onClick={() => displaying(false)} />
        {error && <p>{error}</p>}
        <input
          type="file"
          id="imageAdminChange"
          onChange={(e) => {
            handleChange(e);
          }}
          accept="image/png, image/jpeg, image/jpg"
        />
        <label htmlFor="imageAdminChange">
          {adding ? (
            <div
              className="addImageCase"
              style={{
                background: imgSrc ? "url(" + imgSrc + ")" : "black",
              }}
            ></div>
          ) : (
            <img src={imgSrc} alt="plat du chef" />
          )}
        </label>
        <p>Titre</p>
        <input
          type="text"
          onChange={(e) => {
            setTitleChange(e.target.value);
          }}
          value={titleChange}
        />
        <p>Description</p>
        <input
          type="text"
          onChange={(e) => {
            setDescChange(e.target.value);
          }}
          value={descChange}
        />
        {adding ? (
          <button onClick={() => handleSubmitAdd()}>Ajouter</button>
        ) : (
          <button onClick={(e) => handleSubmitEdition(e)}>Envoyer</button>
        )}
      </ContainerWrapperEditImage>
    </Overlay>
  );
};

AdminEditImages.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  displaying: PropTypes.func,
  adding: PropTypes.bool,
};

export default AdminEditImages;
