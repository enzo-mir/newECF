import styled from "styled-components";

const LogContainer = styled.section`
  position: absolute;
  display: grid;
  place-items: center;
  grid-template-rows: auto auto 30cqh auto;
  gap: 30px;
  padding-block: 25px;
  width: 1000px;
  min-height: 500px;
  max-width: 100%;
  z-index: 150;
  background-color: #fff;

  &:has(> p) {
    grid-template-rows: auto auto auto 30cqh auto;
  }

  & p {
    text-align: center;
  }

  & h1 {
    font-size: var(--font-size-bigger);
    text-align: center;
  }
  .ctaLog {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 25px;

    p {
      font-size: var(--font-size-little);
      color: var(--darker-color);
      text-decoration: underline;
      :hover {
        cursor: pointer;
      }
    }

    @media screen and (max-width: 600px) {
      flex-direction: column;
    }
  }
`;

const ContentSignIn = styled.div`
  display: grid;
  place-items: center;
  row-gap: 4vh;

  & .adds {
    padding-block: 50px;
  }
  form {
    display: grid;
    place-items: center;
    row-gap: 4vh;
    
    div {
      display: flex;
      column-gap: 3vw;
      width: 80%;

      input {
        background-color: var(--primary-color);
        border: none;
        padding: 0.5rem 1em;
        font-size: var(--font-size);
        width: 50%;
        border-radius: 5px;
      }
    }
  }
`;
const ContentLogIn = styled.div`
  display: grid;
  place-items: center;
  gap: 5vh;

  input {
    background-color: var(--primary-color);
    border: none;
    padding: 0.5rem 1em;
    font-size: var(--font-size);
    border-radius: 5px;
  }

  & > div {
    display: flex;
    column-gap: 3vw;
    height: 100%;
  }
`;

export { LogContainer, ContentSignIn, ContentLogIn };
