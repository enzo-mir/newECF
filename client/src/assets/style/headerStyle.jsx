import styled from "styled-components";
import hamburgerBtn from "../images/barre-de-menu.png";

const Wrapper = styled.header`
  position: fixed;
  width: 100%;
  height: 100px;
  display: flex;
  background-color: var(--primary-color);
  z-index: 50;

  & .imgContainer {
    padding: 1em;
    & img {
      height: 7vh;
    }
  }

  @media screen and (max-width: 600px) {
    height: auto;
    & .imgContainer {
      padding: 0.7em 0.5em;
    }
  }
`;
const BtnMenu = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: none;
  height: 4vh;
  aspect-ratio: 1/1;
  background-image: url("${hamburgerBtn}");
  background-size: contain;
  margin-inline: 1em;
  right: 0px;

  &:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 600px) {
    display: block;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  & nav {
    margin-left: auto;
    width: max-content;

    & ul {
      display: flex;
      justify-content: center;
      column-gap: 3vw;
      & li {
        display: grid;
        place-items: center;
        font-size: var(--font-size);
        & a {
          position: relative;
          color: var(--darker-color);
          text-decoration: none;
          &::after {
            content: "";
            position: absolute;
            transition: all 0.5s ease-out;
            right: 0px;
            left: auto;
            width: 0%;
            bottom: -5px;
            height: 2px;
            background-color: var(--darker-color);
          }

          &[aria-current="page"]::after {
            width: 100%;
            left: 0px;
            right: auto;
          }
        }
      }
    }
  }

  & #profil {
    width: 75px;
    height: 75px;
    border-radius: 50%;
    font-size: var(--font-size-bigger);
  }

  & .profil {
    margin-left: auto;
    display: flex;
    justify-content: center;
    column-gap: 2vw;
    padding-inline: 1em;
  }

  @media screen and (max-width: 600px) {
    background-color: var(--primary-color);
    position: absolute;
    flex-direction: column;
    row-gap: 3vh;
    padding-block: 0em;
    height: 0;
    overflow: hidden;
    transition: all 0.15s ease;

    &.display {
      transition: all 0.3s ease;
      height: 40vh;
      padding-block: 1em;
      gap: 25px;
      & .profil:has(button) {
        gap: 25px;
      }
    }

    a,
    button {
      font-size: var(--font-size-reg);
    }

    nav {
      margin-inline: auto;
      margin-top: auto;
      ul {
        flex-direction: column;
        row-gap: 3vh;
      }
    }

    .profil {
      margin-inline: auto;
      flex-direction: column;
      row-gap: 3vh;
      padding: 0;
    }
  }
`;

export { Wrapper, BtnMenu, HeaderContainer };
