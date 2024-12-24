import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import { Stats } from "./Stats";
import { useFetchCabins } from "../cabins/useCabinHooks";
import { SalesChart } from "./SalesChart";
import { DurationChart } from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export function DashboardLayout(){
  const {bookings, isLoading: bookingLoading} = useRecentBookings()
  const {confirmedStays, isLoading: stayLoading, numDays} = useRecentStays()
  const {cabinData, isLoading: cabinLoading} = useFetchCabins()

  if(bookingLoading || stayLoading || cabinLoading) return <Spinner/>

  return(
    <StyledDashboardLayout>
      <Stats confirmedStays={confirmedStays} bookings={bookings} numDays={numDays} cabinData={cabinData}/>
      <TodayActivity/>
      <DurationChart confirmedDays={confirmedStays}/>
      <SalesChart bookings={bookings} numDays={numDays}/>
    </StyledDashboardLayout>
  )
}
