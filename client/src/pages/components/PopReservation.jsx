import PropTypes from "prop-types";
import styled from "styled-components";
import { Overlay } from "../../assets/style/overlay";
import { FiDelete } from "react-icons/fi";
import { useEffect, useState } from "react";
import { deleteReservation } from "../../data/deleteReservation";

const PopReservation = ({ data, setDisplay, setData }) => {
  const [errorMessage, setErrorMessage] = useState("");


  return (
    <Overlay onClick={() => setDisplay(false)}>
      <Container onClick={(e) => e.stopPropagation()}>
        <caption>Réservation(s) en cours :</caption>
        {errorMessage ? <p>{errorMessage}</p> : null}
        <thead>
          <tr>
            <td>Convives</td>
            <td>Date</td>
            <td>Heure</td>
            <td>Email</td>
            <td>&nbsp;</td>
          </tr>
        </thead>
        <tbody>
          {data.map((reservation, id) => {
            return (
              <tr key={id} className="reservationSettings">
                <td>{reservation.convive}</td>
                <td>{new Date(reservation.date).toLocaleDateString()}</td>
                <td>{reservation.heures}</td>
                <td>
                  {reservation.email.slice(0, 3)}**
                  {reservation.email.slice(
                    reservation.email.indexOf("@"),
                    reservation.email.length
                  )}
                </td>
                <td>
                  <button
                    onClick={() =>
                      deleteReservation(
                        reservation.convive,
                        new Date(reservation.date).toLocaleDateString("fr-CA"),
                        reservation.heures,
                        reservation.email
                      ).then((data) =>
                        data.error
                          ? setErrorMessage(data.error)
                          : (setErrorMessage(""), setData(data.valid))
                      )
                    }
                  >
                    <FiDelete />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Container>
    </Overlay>
  );
};

const Container = styled.table`
  display: flex;
  position: relative;
  width: clamp(500px, 70%, 1000px);
  min-width: fit-content;
  height: 400px;
  overflow-y: auto;
  flex-direction: column;
  gap: 25px;
  padding: 1rem;
  background-color: #fff;
  p {
    text-align: center;
    font-weight: 600;
  }

  caption {
    font-size: var(--font-size-reg);
  }

  tbody {
    display: flex;
    flex-direction: column;
    gap: 2vh;
  }

  tr {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    justify-items: center;
    align-items: center;
    font-size: var(--font-size);
    padding-top: 10px;

    td button {
      display: grid;
      place-items: center;

      svg {
        user-select: none;
        pointer-events: none;
      }
    }
  }
  @media screen and (max-width: 600px) {
    width: 100%;
    padding: 0.5rem;

    tr {
      font-size: var(--font-size-little);
    }

    tr {
      td:not(:last-child) {
        max-width: 100px;
        overflow-x: auto;
      }
    }
  }
`;

PopReservation.propTypes = {
  data: PropTypes.array,
  setDisplay: PropTypes.func,
  setData: PropTypes.func,
};
export default PopReservation;
