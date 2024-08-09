import React from "react";
import { Paper, Typography, Grid, Divider, Skeleton } from "@mui/material";

const OrderSkeleton: React.FC = () => {
  return (
    <Paper elevation={4} sx={{ my: 2, mx: 2, p: 3, width: "360px" }}>
      <Typography variant="h5" gutterBottom>
        <Skeleton width="60%" />
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Typography variant="body1">
            <Skeleton width="80%" />
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Skeleton width="60%" />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <Skeleton width="80%" />
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Skeleton width="60%" />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <Skeleton width="80%" />
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Skeleton width="60%" />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <Skeleton width="80%" />
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Skeleton width="60%" />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <Skeleton width="80%" />
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Skeleton width="60%" />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default OrderSkeleton;
