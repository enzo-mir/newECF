import styled from "styled-components";

export const Cross = styled.span`
  position: relative;
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  margin-left: calc(100% - 100px);
  background-color: var(--darker-color);
  border-radius: 5px;
  padding: 0.2em;

  &::after,
  &::before {
    content: "";
    position: absolute;
    background-color: white;
    height: 70%;
    width: 1px;
    left: 50%;
  }
  &::after {
    transform: rotate(45deg);
  }
  &::before {
    transform: rotate(-45deg);
  }
  &:hover {
    cursor: pointer;
    filter: brightness(70%);
  }
`;
