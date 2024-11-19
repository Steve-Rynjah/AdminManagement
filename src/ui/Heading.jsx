// Heading.js
import styled from "styled-components";

const fontSizes = {
  h1: "3rem",
  h2: "4rem",
  h3: "5rem",
  h4: "10rem"
};

const colorPattern = {
  h2: `var(--color-brand-500)`,
  h3: `var(--color-brand-900)`,
  h4: `var(--color-red-800)`,
};

const weightPattern = {
    h1: 500,
    h2: 600,
    h3: 700,
    h4: 800,
}

const Heading = styled.h1`
  font-weight: ${(props)=> props.type === "200" ? 800 :  weightPattern[props.as] || 100};
  font-size: ${(props) => fontSizes[props.as] || "3rem"};
  color: ${(props) =>
    props.as === "h1"
      ? props.state
        ? `var(--color-brand-100)`
        : `var(--color-red-800)`
      : colorPattern[props.as] || `var(--color-red-800)`};
`;

export default Heading;
