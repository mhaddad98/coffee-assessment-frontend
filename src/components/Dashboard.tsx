import { Stack } from "@mui/material";
import NewOrder from "./NewOrder";
import Column from "./Column";

export default function Dashboard() {
  return (
    <>
      <NewOrder />
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        flexWrap="wrap"
      >
        <Column service="boilWater" status="started" />
        <Column service="grindBeans" status="started" />
        <Column service="brewCoffee" status="started" />
        <Column service="serve" status="started" />
      </Stack>
    </>
  );
}
