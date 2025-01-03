import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useFetchBookingDetail } from "../bookings/useBookinHooks";
import Spinner from "../../ui/Spinner";
import { useParams } from "react-router-dom";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useChecking } from "./useCheckin";
import { useFetchSettings } from "../settings/useSettingHooks";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const [isPaid, setIsPaid] = useState(false)
  const [addBreakfast, setAddBreakFast] = useState(false)
  const { bookingDetailData, isLoading, error } = useFetchBookingDetail();
  const {checkin, isCheckingIn} = useChecking()
  const {settingData, isLoading: settingLoading} = useFetchSettings()

  useEffect(()=>{
    setIsPaid(bookingDetailData?.isPaid ?? false)
  },[bookingDetailData])

  if (isLoading || settingLoading) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = bookingDetailData;

  function handleCheckin() {
    if(!isPaid) return;
    if(addBreakfast){
      checkin({bookingId, breakfast : {
        hasBreakfast: true,
        extraPrice: optionalBreakfastPrice,
        totalPrice: totalPrice + optionalBreakfastPrice
      }})
    } else {
      checkin({bookingId, breakfast:{}})
    }
  }

  const optionalBreakfastPrice = settingData?.breakfastPrice * numNights * numGuests

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={bookingDetailData} />

      {!hasBreakfast && (
         <Box>
         <Checkbox checked={addBreakfast} onChange={()=> {
           setAddBreakFast(!addBreakfast)
           setIsPaid(false)
         }}
           id={'breakfast'}
         >
           Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}
         </Checkbox>
       </Box>
      )}

      <Box>
        <Checkbox id="confirmed" checked={isPaid} onChange={()=> setIsPaid(!isPaid)} disabled={isPaid || isCheckingIn}>
          I confirm that {guests?.fullName} has paid the full amount of {!addBreakfast ? formatCurrency(totalPrice) : `${formatCurrency(totalPrice + optionalBreakfastPrice)}`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!isPaid || isCheckingIn}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
