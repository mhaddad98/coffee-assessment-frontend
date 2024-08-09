import { Alert, Box, Paper, Stack, Typography } from "@mui/material";
import Order, { CoffeeOrderProps } from "./Order";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import OrderSkeleton from "./OrderSkeleton";
import { useEffect } from "react";
import mqtt from "mqtt";

interface Props {
  service: string;
  status: string;
}

async function fetchData(service: string, status: string) {
  const response = await axios.get(
    `http://localhost:3001/activities/${service}/${status}`
  );

  return response.data;
}

function Column({ service, status }: Props) {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: [`${service}`],
    queryFn: () => fetchData(service, status),
  });
  const queryClient = useQueryClient();

  const statusColor =
    status === "started" ? "green" : status === "finished" ? "blue" : "red";

  useEffect(() => {
    const client = mqtt.connect("ws://localhost:15675/ws", {
      protocol: "ws",
      clientId: `${service}-${Math.random()}`,
      reconnectPeriod: 5000,
    });

    client.on("connect", () => {
      console.log("Connected to MQTT broker");
      client.subscribe(`order.${service}`, (err) => {
        if (err) {
          console.error("Subscription error:", err);
        }
      });
    });

    client.on("error", (err) => {
      console.error("MQTT Error:", err);
    });

    client.on("message", (topic, message) => {
      console.log("New message:", message.toString(), "on:", topic);
      queryClient.invalidateQueries([`${service}`] as any); // Trigger a refetch
    });

    return () => {
      client.end();
    };
  }, [queryClient, service]);

  if (isError) {
    return (
      <>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Stack direction={"row"} alignItems={"baseline"}>
            <Typography variant="h4" mb={3}>
              {service}
            </Typography>
            <Typography variant="h6" ml={2} mb={3} color={statusColor}>
              {status}
            </Typography>
          </Stack>
          <Alert severity="error">
            An error occurred. <strong>{error.message}</strong>
          </Alert>
        </Paper>
      </>
    );
  }
  if (isLoading) {
    return (
      <>
        <Paper
          elevation={2}
          sx={{
            p: 2,
            width: "400px",
            m: 2,
            maxHeight: "1000px", // Set a fixed height
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack direction="row" alignItems="baseline" mb={2}>
            <Typography variant="h4" mb={3}>
              {service}
            </Typography>
            <Typography variant="h6" ml={2} mb={3} color={statusColor}>
              {status}
            </Typography>
          </Stack>
          <Box
            sx={{
              overflowY: "auto",
              flexGrow: 1,
            }}
          >
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="stretch"
              flexWrap="wrap"
            >
              <OrderSkeleton />
              <OrderSkeleton />
              <OrderSkeleton />
              <OrderSkeleton />
              <OrderSkeleton />
            </Stack>
          </Box>
        </Paper>
      </>
    );
  }

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        width: "400px",
        m: 2,
        maxHeight: "1000px", // Set a fixed height
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack direction="row" alignItems="baseline" mb={2}>
        <Typography variant="h4">{service}</Typography>
        <Typography variant="h6" ml={2} color={statusColor}>
          {status}
        </Typography>
        <Typography variant="h6" ml={2}>
          {data.length}
        </Typography>
      </Stack>
      <Box
        sx={{
          overflowY: "auto",
          flexGrow: 1,
        }}
      >
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="stretch"
          flexWrap="wrap"
        >
          {data.length === 0 ? "No Orders" : ""}
          {data.map(
            (item: {
              order: CoffeeOrderProps["order"];
              workflowId: string;
            }) => (
              <Order
                key={item.order.id}
                order={item.order}
                task={service}
                workflowId={item.workflowId}
              />
            )
          )}
        </Stack>
      </Box>
    </Paper>
  );
}

export default Column;
