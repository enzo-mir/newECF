import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import icon from "../../assets/images/icon.svg";
import Log from "./Log";
import {
  Wrapper,
  HeaderContainer,
  BtnMenu,
} from "../../assets/style/headerStyle";
import ProfilComponent from "./ProfilComponent";
import Reserv from "./Reserv";
import PropTypes from "prop-types";
import logout from "../../data/logout";
import PopReservation from "./PopReservation";
import { connectStore, userDataStore } from "../../data/stores/connect.store";

const Header = () => {
  const [logPage, setLogPage] = useState(false);
  const [profilPage, setProfilPage] = useState(false);
  const [res, setRes] = useState(false);
  const [togglePage, setTogglePage] = useState("");
  const [displayModalReservation, setDisplayModalReservation] = useState(false);
  const [displayHeader, setDisplayHeader] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const connectedUser = connectStore((state) => state.connectedUser);
  const [isAdmin, setConnectedAdmin] = connectStore((state) => [
    state.connectedAdmin,
    state.setConnectedAdmin,
  ]);
  const [data, reservations, setCurrentReservation] = userDataStore((state) => [
    state.userData,
    state.currentReservation,
    state.setCurrentReservation,
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (location.pathname !== "/admin" && isAdmin && !logPage) {
      logout();
      navigate("/");
      setConnectedAdmin(false);
    }
  }, [location, setConnectedAdmin, isAdmin, logPage, navigate]);

  useEffect(() => {
    displayModalReservation || logPage
      ? document.body.style.overflow == "hidden"
      : document.body.removeAttribute("class");
  }, [displayModalReservation, logPage]);

  let prevScroll = window.pageYOffset;

  document.addEventListener("scroll", () => {
    var currentScroll = window.pageYOffset;
    if (prevScroll > currentScroll) {
      setDisplayHeader(false);
    } else {
      setDisplayHeader(true);
    }
    prevScroll = currentScroll;
  });

  document.onmousedown = (e) => {
    let obj = document.querySelector("header");
    let dropDownContent = obj.children[1];
    if (!obj.contains(e.target)) {
      dropDownContent.classList.remove("display");
    }
  };
  const NavMenu = () => {
    return isAdmin ? (
      <HeaderContainer>
        <button
          onClick={() => {
            logout();
            navigate("/");
            setConnectedAdmin(false);
          }}
        >
          Déconnection
        </button>
      </HeaderContainer>
    ) : (
      <HeaderContainer>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Accueil</NavLink>
            </li>
            <li>
              <NavLink to="/carte">Carte</NavLink>
            </li>
            <li>
              <button className="btnReserve" onClick={() => setRes(true)}>
                Réserver
              </button>
            </li>
          </ul>
        </nav>
        <div className="profil">
          {!connectedUser ? (
            <>
              <button
                className="signIn"
                onClick={() => {
                  setTogglePage("signin");
                  setLogPage(true);
                }}
              >
                Inscription
              </button>
              <button
                className="logIn"
                onClick={() => {
                  setLogPage(true);
                  setTogglePage("login");
                }}
              >
                Connexion
              </button>
            </>
          ) : reservations ? (
            <>
              <button
                className="reservations"
                onClick={() => setDisplayModalReservation(true)}
              >
                {reservations.length}
              </button>
              <button id="profil" onClick={() => setProfilPage(true)}>
                {data ? data.userName.charAt(0) : null}
              </button>
            </>
          ) : (
            <button id="profil" onClick={() => setProfilPage(true)}>
              {data ? data.userName.charAt(0) : null}
            </button>
          )}
        </div>
      </HeaderContainer>
    );
  };

  return (
    <>
      {logPage ? (
        <Log displayPage={setLogPage} togglePage={togglePage} />
      ) : null}
      {profilPage ? <ProfilComponent setDisplayProfil={setProfilPage} /> : null}
      {res ? <Reserv res={setRes} /> : null}
      {displayModalReservation ? (
        <PopReservation
          data={reservations}
          setDisplay={setDisplayModalReservation}
          setData={setCurrentReservation}
        />
      ) : null}

      <Wrapper className={displayHeader ? "display" : ""}>
        <div className="imgContainer">
          <Link to="/">
            <img src={icon} alt="Icon du site" />
          </Link>
        </div>
        <NavMenu />
        <BtnMenu
          onClick={(e) =>
            e.target.parentNode.children[1].classList.toggle("display")
          }
        />
      </Wrapper>
    </>
  );
};

Header.propTypes = {
  data: PropTypes.object,
  isAdmin: PropTypes.bool,
  connectedUser: PropTypes.bool,
  display: PropTypes.bool,
  reservations: PropTypes.array,
};

export default Header;
