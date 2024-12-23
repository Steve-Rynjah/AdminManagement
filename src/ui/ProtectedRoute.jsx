import styled from "styled-components";
import { useUser } from "../features/authentication/useAuthLogin";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //1. Load the auth user
  const { isLoading, isAuthenticated } = useUser();
  //2. If there are no authenticated user
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  //3. While Loading
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //4. If user is authenticated
  if (isAuthenticated) return children;
}
