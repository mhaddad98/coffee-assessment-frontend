import React from "react";
import { Paper, Typography, Grid, Divider, Button, Box } from "@mui/material";
import axios from "axios";

export type CoffeeOrderProps = {
  page?: boolean;
  task: string;
  workflowId: string;
  order: {
    id: string;
    beanType: "Arabica" | "Robusta";
    grindSize: "Fine" | "Medium" | "Coarse";
    waterTemperature: number;
    brewMethod: "french-press" | "espresso" | "pour-over";
    brewTimeInSeconds: number;
    servingSize: "Small" | "Medium" | "Large";
  };
};

const Order: React.FC<CoffeeOrderProps> = ({
  order,
  task,
  workflowId,
  page,
}) => {
  const handleServe = async (signalValue: boolean) => {
    await axios.post("http://localhost:3001/order/signal", {
      workflowId,
      signalName: "serveSignal",
      signalValue,
      order,
    });
  };
  return (
    <Paper elevation={4} sx={{ my: 2, mx: 2, p: 3, width: "360px" }}>
      <Typography variant="h5" gutterBottom>
        Coffee Order <strong>{order.id}</strong>
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Typography variant="body1">Bean Type:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" fontWeight="bold">
            {order.beanType}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">Grind Size:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" fontWeight="bold">
            {order.grindSize}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">Water Temperature:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" fontWeight="bold">
            {order.waterTemperature}°C
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">Brew Method:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" fontWeight="bold">
            {order.brewMethod}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">Brew Time:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" fontWeight="bold">
            {order.brewTimeInSeconds} seconds
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">Serving Size:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" fontWeight="bold">
            {order.servingSize}
          </Typography>
        </Grid>
      </Grid>
      {task === "serve" && !page ? (
        <Box mt={2}>
          <Button
            variant="contained"
            sx={{ mx: 2 }}
            onClick={() => {
              handleServe(true);
            }}
          >
            Serve
          </Button>
          <Button
            variant="outlined"
            sx={{ mx: 2 }}
            onClick={() => {
              handleServe(false);
            }}
          >
            Reject
          </Button>
        </Box>
      ) : (
        <span></span>
      )}
    </Paper>
  );
};

export default Order;
