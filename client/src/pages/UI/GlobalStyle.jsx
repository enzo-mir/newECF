import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html{
  background-color: var(--primary-color);
}
    body{
        width: 100%;
        min-height: 100svh;
        background-color: #fff;
        font-family: var(--font-f-julius);
    }
    button {
        border: none;
        background-color: var(--darker-color);
        color : #fff;
        font-family: var(--font-f-julius);
        padding: 0.5rem;
        font-size: var(--font-size);
        border-radius: 5px;
        transition: all .2s ease-out;
      }
      button:hover {
        cursor: pointer;
        background-color: var(--darker-color-big);
      }
`;

export default GlobalStyle;
