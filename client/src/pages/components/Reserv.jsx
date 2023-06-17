import { useEffect, useState } from "react";
import postReservation from "../../data/postReservation";
import Allergie from "./Allergie";
import { Overlay } from "../../assets/style/overlay";
import {
  OptionsReserv,
  ReservationContainer,
  HoursList,
} from "../../assets/style/reserveStyle";
import { Cross } from "../../assets/style/cross";
import PropTypes from "prop-types";
import { useRef } from "react";
import { userDataStore } from "../../data/stores/connect.store";
import { hourStore } from "../../data/stores/admin.store";

export default function Reserv({ res }) {
  const [userData, setReservationData] = userDataStore((state) => [
    state.userData,
    state.setCurrentReservation,
  ]);
  const hours = hourStore((state) => state.hours);

  const [date, setDate] = useState(new Date().toLocaleDateString("Fr-ca"));
  const [guests, setGuests] = useState(userData?.convive || 1);
  const [email, setEmail] = useState(userData?.email || "");
  const [name, setName] = useState(userData?.userName || "");
  const [resError, setResError] = useState("");
  const [showAllergy, setShowAllergy] = useState(false);
  const [alergy, setAlergy] = useState(userData?.alergie || "");
  const [DTable, setDTable] = useState([]);
  const [LTable, setLTable] = useState([]);
  const hourTargeted = useRef(null);

  useEffect(() => {
    handleChangeDate();
    return () => {
      document.body.removeAttribute("style");
    };
  }, []);

  let lunchTable = [];
  let dinnerTable = [];

  document.body.style.overflow = "hidden";

  function handleChangeDate(e) {
    let dateDay = new Date(e?.target.value || date).toLocaleDateString(
      "fr-FR",
      {
        weekday: "long",
      }
    );

    let fullDate = new Date(e?.target.value || date).toLocaleDateString(
      "fr-CA"
    );

    setDate(fullDate);

    let hourFetchLunch;
    let hourFetchDinner;

    hours.forEach((elem) => {
      if (Object.values(elem)[1] === dateDay) {
        hourFetchLunch = elem.lunch;
        hourFetchDinner = elem.dinner;
        if (elem.lunch.indexOf("-") === -1) {
          setLTable("Fermer");
        }
        if (elem.dinner.indexOf("-") === -1) {
          setDTable("Fermer");
        }
      }
    });

    convertDataToHourTable(hourFetchLunch, lunchTable);
    convertDataToHourTable(hourFetchDinner, dinnerTable);

    function convertDataToHourTable(hourSlice, table) {
      if (hourSlice.indexOf("-") !== -1) {
        let splitingLunch = hourSlice.split(" - ");
        let splitHourLunch = splitingLunch[0].split("h");
        let splitMinuteLunch = splitingLunch[1].split("h");
        let startHourLunch = parseInt(splitHourLunch[0]);
        let endHourLunch = parseInt(splitMinuteLunch[0]);
        let startDecimalLunch = parseInt(splitHourLunch[1]) / 60;
        let endDecimalLunch = parseInt(splitMinuteLunch[1]) / 60;
        let fullStartLunch = isNaN(startDecimalLunch)
          ? startHourLunch
          : startHourLunch + startDecimalLunch;
        let fullEndLunch = isNaN(endDecimalLunch)
          ? endHourLunch
          : endHourLunch + endDecimalLunch;

        /* => tableau de données qui retrace les heures et leurs plages d'horaires avec décallage
           de 15 min (60 * 0.25) jusqu'à 30 min (60 * 0.5) avant la fin de la plage horaire */

        for (let i = fullStartLunch; i <= fullEndLunch - 0.5; i += 0.25) {
          table.push(i + "");
        }

        /* Conversion des heures décimales en heures traditionnelles ex => 6,25 -> 6h15 */
        table.forEach((elem) => {
          var sliceMinutes;
          if (elem.indexOf(".") !== -1) {
            sliceMinutes =
              elem.slice(3) / 100 === 0.05
                ? elem.slice(0, elem.indexOf(".")) +
                  "h" +
                  (elem.slice(3) * 6).toString()
                : elem.slice(0, elem.indexOf(".")) +
                  "h" +
                  (elem.slice(3) * 0.6).toString();
          } else sliceMinutes = elem + "h";

          /* push final */

          table.push(sliceMinutes);
        });

        switch (table) {
          case dinnerTable:
            setDTable(table.slice(table.length / 2));
            break;
          case lunchTable:
            setLTable(table.slice(table.length / 2));
            break;
        }
      }
    }
  }

  function unselectHours() {
    document.onmouseup = (e) => {
      let obj = document.querySelector(".selected");
      if (obj !== null) {
        if (
          obj !== e.target &&
          document.getElementById("submitRes") !== e.target
        ) {
          obj.classList.remove("selected");
        }
      }
    };
  }
  let time;

  function selectHours(e) {
    hourTargeted.current = e.target.innerText;

    unselectHours();
    let parentToGetJourney =
      e.target.parentNode.parentNode.parentNode.getAttribute("id");
    let oldTarget = document.querySelector(".selected");
    if (oldTarget) oldTarget.removeAttribute("class");
    let target = e.target;
    target.classList.add("selected");
    time = parentToGetJourney.slice(0, parentToGetJourney.indexOf("Hours"));
  }

  function submitReservation(e) {
    e.target.parentNode.parentNode.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    if (guests > 0 && guests < 10) {
      if (date !== null && new Date().getTime() <= new Date().getTime()) {
        if (email) {
          if (name) {
            if (hourTargeted.current !== null) {
              postReservation(
                guests,
                date,
                email,
                name,
                hourTargeted.current,
                alergy || "",
                time
              ).then((data) => {
                data.error
                  ? setResError(data.error)
                  : (setReservationData(data.valid), res(false));
              });
            } else setResError("Choisissez une heure de réservation");
          } else setResError("Veuillez renseignez un nom de réservation");
        } else setResError("Veuillez renseignez votre adresse e-mail");
      } else setResError("Choisissez une date de réservation valide");
    } else setResError("Le nombre de convives doit être compris entre 1 et 9");
  }

  return (
    <Overlay onClick={() => res(false)}>
      <ReservationContainer onClick={(e) => e.stopPropagation()}>
        <Cross onClick={() => res(false)} />
        <h1>Réservez votre table</h1>
        {resError ? <p>{resError}</p> : null}
        <OptionsReserv>
          <span></span>
          <input
            type="number"
            id="persons"
            placeholder="convives par défaut (1-9)"
            max="9"
            min="1"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            maxLength="2"
          />
          <input
            type="date"
            id="date"
            onChange={handleChangeDate}
            min={new Date().toLocaleDateString("fr-CA")}
            value={date}
          />
          <input
            type="email"
            id="email"
            required
            placeholder="Entrez votre e-mail"
            value={userData?.email || email}
            onChange={(e) => userData?.email || setEmail(e.target.value)}
          />
          <input
            type="text"
            id="name"
            required
            placeholder="Entrez votre nom"
            value={userData?.userName || name}
            onChange={(e) => userData?.userName || setName(e.target.value)}
          />
        </OptionsReserv>
        <div id="lunchHours">
          <h2>MIDI</h2>
          <div className="hours">
            <HoursList>
              {typeof LTable === "object" ? (
                LTable.map((lunch, id) => {
                  return (
                    <button key={id} onClick={selectHours} tabIndex={id}>
                      {lunch}
                    </button>
                  );
                })
              ) : (
                <p>{LTable}</p>
              )}
            </HoursList>
          </div>
        </div>
        <div id="dinerHours">
          <h2>SOIR</h2>
          <div className="hours">
            <HoursList>
              {typeof DTable === "object" ? (
                DTable.map((dinner, id) => {
                  return (
                    <button key={id} onClick={selectHours} tabIndex={id}>
                      {dinner}
                    </button>
                  );
                })
              ) : (
                <p>{DTable}</p>
              )}
            </HoursList>
          </div>
        </div>
        <div id="finalCase">
          <p
            onClick={() => {
              setShowAllergy(!showAllergy);
              setAlergy(alergy);
            }}
          >
            Allergie(s) ?
          </p>
          {showAllergy && (
            <Allergie
              value={alergy}
              onchange={(e) => setAlergy(e.target.value)}
            />
          )}
          <button
            id="submitRes"
            type="submit"
            onClick={(e) => submitReservation(e)}
          >
            Réservez la table
          </button>
        </div>
      </ReservationContainer>
    </Overlay>
  );
}
Reserv.propTypes = {
  res: PropTypes.func,
  userData: PropTypes.object,
  hours: PropTypes.array,
  setReservationData: PropTypes.func,
};
