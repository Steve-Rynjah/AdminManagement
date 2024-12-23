import ButtonIcon from "../../ui/ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useAuthLogout } from "./useAuthLogin";
import SpinnerMini from "../../ui/SpinnerMini";

export function Logout(){
    const {logout, isLoggingOut} = useAuthLogout()
    return (
        <ButtonIcon onClick={logout} disabled={isLoggingOut}>
            {isLoggingOut ? <SpinnerMini/> : <HiArrowRightOnRectangle />}
        </ButtonIcon>
    )
}