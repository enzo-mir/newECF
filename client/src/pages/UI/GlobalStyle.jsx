import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body{
        width: 100%;
        min-height: 100vh;
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
        border-radius: 10px;
        transition: all .2s ease-out;
      }
      button:hover {
        cursor: pointer;
        background-color: var(--darker-color-a70);
      }
`;

export default GlobalStyle;
