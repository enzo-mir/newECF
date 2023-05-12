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

const Header = ({ isConnected, data, hours, isAdmin, reservations }) => {
  const [logPage, setLogPage] = useState(false);
  const [profilPage, setProfilPage] = useState(false);
  const [res, setRes] = useState(false);
  const [togglePage, setTogglePage] = useState("");
  const [displayModal, setDisplayModal] = useState();
  const [dataReservation, setDataReservation] = useState(reservations);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setDataReservation(reservations);
  }, [reservations]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  document.onmouseup = (e) => {
    let obj = document.querySelector("header");
    let dropDownContent = obj.children[1];
    if (dropDownContent.classList.contains("display")) {
      if (!obj.contains(e.target)) {
        dropDownContent.classList.remove("display");
      }
    }
  };
  const NavMenu = () => {
    return isAdmin ? (
      <HeaderContainer>
        <button
          onClick={() => {
            logout();
            navigate("/");
            navigate(0);
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
              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/carte"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                Carte
              </NavLink>
            </li>
            <li>
              <button className="btnReserve" onClick={() => setRes(true)}>
                Réserver
              </button>
            </li>
          </ul>
        </nav>
        <div className="profil">
          {!isConnected ? (
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
                onClick={() => setDisplayModal(true)}
              >
                {dataReservation ? dataReservation.length : reservations.length}
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
      {profilPage ? (
        <ProfilComponent displayProfil={setProfilPage} userData={data} />
      ) : null}
      {res ? <Reserv res={setRes} userData={data} hours={hours} setReservationData={setDataReservation} /> : null}
      {displayModal ? (
        <PopReservation
          data={dataReservation || reservations}
          setDisplay={setDisplayModal}
          setData={setDataReservation}
        />
      ) : null}

      <Wrapper>
        <div className="imgContainer">
          <Link to="/">
            <img src={icon} alt="Icon du site" />
          </Link>
        </div>
        <NavMenu />
        <BtnMenu
          onClick={(e) => {
            e.target.parentNode.children[1].classList.toggle("display");
            let elemLink = Object.values(
              e.target.parentNode.children[1].children
            );

            elemLink.map((el) => {
              Object.values(el.querySelectorAll("a")).map((a) => {
                a.onclick = () =>
                  document
                    .querySelector(".display")
                    .classList.remove("display");
              });
              Object.values(el.querySelectorAll("button")).map((button) => {
                button.onclick = () =>
                  document
                    .querySelector(".display")
                    .classList.remove("display");
              });
            });
          }}
        />
      </Wrapper>
    </>
  );
};

Header.propTypes = {
  data: PropTypes.object,
  isAdmin: PropTypes.bool,
  isConnected: PropTypes.bool,
  display: PropTypes.bool,
  hours: PropTypes.array,
  reservations: PropTypes.array,
};

export default Header;
