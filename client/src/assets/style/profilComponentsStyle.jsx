import styled from "styled-components";
export const ContainerSettings = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 30px;
  padding-block: 25px;
  width: 1000px;
  min-height: 60%;
  max-width: 100%;
  z-index: 150;
  background-color: #fff;

  & > div {
    &.passwordField {
      grid-template-columns: 1fr;
    }
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr;
    place-items: center;

    @media screen and (max-width: 600px) {
      grid-template-columns: 1fr;
      row-gap: 2vh;
    }
  }

  & > div.cta {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 50px;
  }

  & input {
    border: 1px solid var(--darker-color-a30);
    padding: 0.7em;
    font-size: var(--font-size-little);
    border-radius: 10px;
  }

  .error {
    background-color: var(--primary-color);
    padding: 1rem;
    border-radius: 5px;
    text-align: center;
  }

  @media screen and (max-width: 600px) {
    justify-content: space-around;

    & > div.cta {
    }
  }
  @media screen and (max-height: 900px) {
    max-height: 500px;
  }
`;
