import styled from "styled-components";
import PropTypes from "prop-types";

const Allergie = ({ onchange, value }) => {
  return (
    <Wrapper>
      <input
        type="texte"
        placeholder="Entrez vos allergies"
        value={value}
        onChange={onchange}
      />
    </Wrapper>
  );
};

Allergie.propTypes = {
  onchange: PropTypes.func,
  value: PropTypes.string,
};

const Wrapper = styled.div`
  position: relative;
  width: 200px;
  z-index: 500;
  & input {
    width: 100%;
    padding: 0.5em 1em;
    font-size: var(--font-size);
    &::placeholder {
      color: var(--color-blackless);
    }
  }
`;
export default Allergie;
