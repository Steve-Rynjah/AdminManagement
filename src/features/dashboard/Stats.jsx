import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

export function Stats({bookings, confirmedStays, numDays, cabinData}){
    //1.
    const numBooking = bookings?.length;
    //2.
    const sales = bookings?.reduce((acc, cur)=> acc + cur?.totalPrice, 0)
    //3.
    const checkin = confirmedStays?.length
    //4.
    const occupant = confirmedStays?.reduce((acc, cur)=> acc + cur?.numNights, 0) / (numDays * (cabinData?.length))
    //num of checked-in / all available nights (numb days * num cabins)

    return(
        <>
            <Stat
                title={"Bookings"}
                color={"blue"}
                icon={<HiOutlineBriefcase/>}
                value={numBooking}
            />
            <Stat
                title={"Sales"}
                color={"green"}
                icon={<HiOutlineBanknotes/>}
                value={formatCurrency(sales)}
            />
            <Stat
                title={"Check-ins"}
                color={"indigo"}
                icon={<HiOutlineCalendarDays/>}
                value={checkin}
            />
            <Stat
                title={"Occupany rate"}
                color={"yellow"}
                icon={<HiOutlineChartBar/>}
                value={Math.round(occupant * 100) + '%'}
            />
        </>
    )
}