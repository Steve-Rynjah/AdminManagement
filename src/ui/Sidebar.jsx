import styled from "styled-components"
import Logo from "./Logo"
import MainNav from "./MainNav"
import Uploader from "../data/Uploader"


export default function Sidebar() {
  const StyledSideBar = styled.aside`
    background-color: var(--color-grey-0);
    padding: 4rem;
    grid-row: 1/-1;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  `  
  return (
    <StyledSideBar>
      <Logo/>
      <MainNav/>
    </StyledSideBar>
  )
}
