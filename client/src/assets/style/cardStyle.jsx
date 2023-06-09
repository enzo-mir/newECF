import styled from "styled-components";

const CarteContainer = styled.main`
  position: relative;
  max-width: 1000px;
  margin: auto;
  min-height: max-content;
  padding-block: 150px 100px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2vw;
  background-color: var(--primary-color);
  padding-inline: 2vw;

  & h1 {
    position: relative;
    font-size: var(--font-size-h1);
    color: black;
    padding: .5em;

    ::after,
    ::before {
      content: "";
      position: absolute;
      left: 0;
      width: 100%;
      height: 2px;
      background: var(--darker-color);
      border-radius: 10px;
    }
    ::after {
      top: 0;
    }
    ::before {
      bottom: 0;
    }
  }

  & h2 {
    font-size: var(--font-size-bigger);
    color: var(--darker-color);
  }

  .desc {
    font-size: var(--font-size-little);
    color: var(--darker-color);
  }
`;

const MenuContainer = styled.div`
  position: relative;
  max-width: 100%;
  width: 100vw;
  min-height: max-content;
  display: grid;
  gap: 25px;
  grid-template-columns: repeat(2, 1fr);

  & > div {
    height: 100%;
    margin-block: 50px;

    & p {
      text-align: left;
      width: auto;
      font-size: var(--font-size-reg);
    }
    &:not(:nth-child(3)) > div > div {
      display: grid;
      place-items: center;
      grid-template-columns: auto 0.5fr;
      column-gap: 20px;
      width: 80%;

      > div {
        width: 100%;
      }
    }
  }

  @media screen and (max-width: 1050px) {
    display: flex;
    flex-direction: column;

    & > div {
      padding-block: 2em;
      border-radius: 10px;
    }
  }
`;

const LunchSection = styled.div`
  width: 100%;
  background-color: #fff;
  grid-area: 1 / 1 / 2 / 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;

  & > div {
    min-width: max-content;
    width: auto;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 25px;
  }
`;
const PlatSection = styled.div`
  width: 100%;
  background-color: #fff;
  grid-area: 1 / 2 / 2 / 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;

  & > div {
    min-width: max-content;
    width: 80%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 25px;

    > div {
      display: grid;
      place-items: center;
      grid-template-columns: auto 0.5fr;
      column-gap: 20px;
      width: 80%;

      > div {
        width: 100%;
      }
    }
  }
`;
const DessertSection = styled.div`
  width: 100%;
  grid-area: 2 / 1 / 3 / 3;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  column-gap: 50px;
  place-items: center;
  background-color: #fff;

  h2 {
    grid-area: 1 / 1 / 2 / 3;
  }

  & > div {
    display: grid;
    grid-template-columns: 1fr auto;
    column-gap: 20px;
    width: 60%;
  }

  @media screen and (max-width: 1050px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    row-gap: 1.5em;

    & > div {
      height: 50px;
      width: 80%;
    }
  }
`;
const MenuSection = styled.div`
  width: 100%;
  background-color: #fff;
  grid-area: 3 / 1 / 4 / 3;
  display: flex;
  flex-direction: column;
  gap: 3vh;
  justify-content: space-around;
  align-items: center;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: 25px;

    article {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 25px;
      font-size: var(--font-size);

      > p {
        color: var(--darker-color);
        text-align: center;
      }
      aside {
        display: grid;
        gap: 10px;
      }
    }
  }
`;

export {
  CarteContainer,
  MenuContainer,
  LunchSection,
  PlatSection,
  DessertSection,
  MenuSection,
};
