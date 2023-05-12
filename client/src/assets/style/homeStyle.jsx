import styled from "styled-components";
const Wrapper = styled.main`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20vh;
`;

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 100svh;
  min-height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;

  & .headerPage {
    position: relative;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    grid-template-columns: 1fr 1fr;

    
    & img {
      height: 100%;
      width: 100%;
      z-index: -2;
      object-fit: cover;
      user-select: none;
      filter: brightness(70%);
    }
    
    @media screen and (max-width: 800px) {
      grid-template-columns: 1fr;
      grid-template-rows: 70% 1fr;
     
    }

    & > aside {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 20px;
      width: 100%;
      height: 100%;
      background: var(--primary-color);

      & > * {
        width: fit-content;
      }

      & h1 {
        font-size: var(--font-size-h1);
        user-select: text;
      }

      & h2 {
        font-size: var(--font-size-reg);
      }
      button a {
        color: white;
        text-decoration: none;
      }
    }
  }
`;

const SectionPlats = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10vh;
  width: clamp(300px, 80%, 1400px);

  & .textContent {
    scroll-margin-block-start: 150px;
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    gap: 5vw;
    font-size: var(--font-size);

    @media screen and (max-width: 800px) {
      flex-direction: column;
    }

    & p {
      width: 30%;
      line-height: 150%;
      padding: 2rem;
      height: 200px;

      @media screen and (max-width: 800px) {
        width: 70%;
        height: clamp(100px,15vh,150px);
      }

      &:first-child {
        background-color: var(--primary-color);
      }
      &:last-child {
        background-color: var(--darker-color);
        color: white;
      }
    }
  }
  & > button {
    width: fit-content;
  }

  & .imagesGalery {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(150px, 200px));
    place-items: center;
    justify-content: center;
    margin-bottom: auto;
    gap: 25px;

    & div {
      position: relative;
      text-align: center;

      @media (pointer: fine) {
        &:hover {
          & span {
            color: #fff;
          }
          & img {
            filter: brightness(50%);
          }
        }
      }

      @media (pointer: coarse) {
        &:not(:hover),
        &:hover {
          & span {
            color: #fff;
          }
          & img {
            filter: brightness(50%);
          }
        }
      }

      span {
        position: absolute;
        display: flex;
        flex-direction: column;
        gap: 25px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: clamp(5px, 1vw, 20px);
        color: transparent;
        transition: 0.15s ease-out;
        font-size: var(--font-size-little);
        width: 100%;
      }
    }
    & img {
      width: 100%;
      width: clamp(150px, 13vw, 200px);
      aspect-ratio: 1/1;
      object-fit: cover;
      border-radius: 10px;
      transition: 0.15s ease-out;
    }
    @media screen and (max-width: 600px) {
      width: 100%;
      grid-template-columns: 100%;
    }
  }

  & > p {
    width: 100%;
    grid-area: 1 / 2 / 2 / 3;
    text-align: center;
    font-size: var(--font-size);
    background-color: var(--primary-color);
    padding: 1em;
    line-height: 150%;
    border-radius: 10px;
  }
  & button {
    grid-area: 2 / 2 / 3 / 3;
    margin-bottom: auto;
    padding: 1em 0.5em;
    font-size: var(--font-size);
  }

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export { Wrapper, HeroSection, SectionPlats };
