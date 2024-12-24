import styled from "styled-components"
import { Logout } from "../features/authentication/Logout"
import { HeaderMenu } from "./HeaderMenu"
import { UserAvatar } from "../features/authentication/UserAvatar"

export default function Header() {

  const StyledHeader = styled.header`
    background-color: var(--color-grey-0);
    padding: 2rem;

    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 2.4rem;
  `  

  return (
    <StyledHeader>
      <UserAvatar/>
      <HeaderMenu/>
    </StyledHeader>
  )
}
