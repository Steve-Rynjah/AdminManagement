import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import CustomTable from "../../ui/Table";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import { useFetchBookins } from "./useBookinHooks";

function BookingTable() {
  const bookings = [];
  const {isLoading, bookingData} = useFetchBookins()

  if(isLoading) return <Spinner/>

  if(!bookingData?.length) return <Empty resource={"bookings"}/>

  return (
    <Menus>
      <CustomTable columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <CustomTable.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </CustomTable.Header>

        <CustomTable.Body
          data={bookingData}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </CustomTable>
    </Menus>
  );
}

export default BookingTable;
