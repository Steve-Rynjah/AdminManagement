import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useFetchCabins } from "./useCabinHooks";
import CustomTable from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

export default function CabinTable() {
  const { isLoading, cabinData, error } = useFetchCabins();
  const [searchParams] = useSearchParams();

  const filter = searchParams.get("discount") || "all";

  let filteredCabins;
  if (filter === "all") filteredCabins = cabinData;
  if (filter === "no-discount")
    filteredCabins = cabinData?.filter((item) => item?.discount === Number(0));
  if (filter === "with-discount")
    filteredCabins = cabinData?.filter((item) => item?.discount > Number(0));

  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins?.sort((a, b) => {
    const valueA = a[field] ?? 0;
    const valueB = b[field] ?? 0;

    if (typeof valueA === "string" && typeof valueB === "string") {
      return valueA.localeCompare(valueB) * modifier;
    } else if (typeof valueA === "number" && typeof valueB === "number") {
      return (valueA - valueB) * modifier;
    } else {
      console.warn(`Unexpected field type: ${field}`, { valueA, valueB });
      return 0;
    }
  });
  
  if (isLoading) return <Spinner />;

  if(!cabinData?.length) return <Empty resource={"cabins"}/>

  return (
    <Menus>
      <CustomTable columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <CustomTable.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </CustomTable.Header>

        <CustomTable.Body
          // data={filteredCabins}
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin?.id} cabin={cabin} />}
        />
      </CustomTable>
    </Menus>
  );
}
