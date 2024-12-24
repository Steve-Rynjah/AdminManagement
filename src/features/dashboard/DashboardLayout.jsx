import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import { Stats } from "./Stats";
import { useFetchCabins } from "../cabins/useCabinHooks";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export function DashboardLayout(){
  const {bookings, isLoading: bookingLoading} = useRecentBookings()
  const {stays, confirmedStays, isLoading: stayLoading, numDays} = useRecentStays()
  const {cabinData, isLoading: cabinLoading} = useFetchCabins()

  if(bookingLoading || stayLoading || cabinLoading) return <Spinner/>

  return(
    <StyledDashboardLayout>
      <Stats confirmedStays={confirmedStays} bookings={bookings} numDays={numDays} cabinData={cabinData}/>
      <div>{"Today's activity"}</div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  )
}
