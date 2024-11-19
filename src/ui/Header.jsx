import styled from "styled-components"

export default function Header() {

  const StyledHeader = styled.header`
    background-color: var(--color-grey-0);
    padding: 2rem;
  `  

  return (
    <StyledHeader>
      HEADER
    </StyledHeader>
  )
}
