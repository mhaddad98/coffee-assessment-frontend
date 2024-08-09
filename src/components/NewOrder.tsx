import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Container,
  FormGroup,
  Typography,
  TextField,
  Button,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Alert,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
const orderSchema = z.object({
  beanType: z.enum(["Arabica", "Robusta"], {
    required_error: "Select a valid bean type",
  }),
  grindSize: z.enum(["Fine", "Medium", "Coarse"], {
    required_error: "Select a valid grind size",
  }),
  waterTemperature: z
    .number()
    .min(0, { message: "Water temperature must be positive" }),
  brewMethod: z.enum(["french-press", "espresso", "pour-over"], {
    required_error: "Select a valid brew method",
  }),
  brewTimeInSeconds: z
    .number()
    .min(1, { message: "Brew time must be at least 1 second" }),
  servingSize: z.enum(["Small", "Medium", "Large"], {
    required_error: "Select a valid serving size",
  }),
});

type OrderFormInputs = z.infer<typeof orderSchema>;

export default function CoffeeOrderForm() {
  const mutation = useMutation({
    mutationFn: (newOrder: OrderFormInputs) => {
      return axios.post("http://localhost:3001/order", newOrder);
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<OrderFormInputs>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      beanType: "Arabica",
      grindSize: "Medium",
      waterTemperature: 90,
      brewMethod: "french-press",
      brewTimeInSeconds: 10,
      servingSize: "Medium",
    },
  });

  const onSubmit = (data: OrderFormInputs) => {
    mutation.mutate(data);
    // console.log(data);
  };

  return (
    <Container maxWidth="xl" sx={{ mb: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" mb={2}>
          New Coffee Order
        </Typography>
        {mutation.isError ? (
          <Alert severity="error">
            An error occurred:<strong>{mutation.error.message}.</strong>
          </Alert>
        ) : null}
        {mutation.isPending ? (
          <Alert severity="error">
            <Alert severity="info">Pending...</Alert>
          </Alert>
        ) : null}

        {mutation.isSuccess ? (
          <Alert severity="success" sx={{ mb: 3 }}>
            <strong>Order Added.</strong>
          </Alert>
        ) : null}

        <FormGroup>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth error={!!errors.beanType}>
                <FormLabel id="bean-type-label">Bean Type</FormLabel>
                <Controller
                  name="beanType"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field}>
                      <FormControlLabel
                        value="Arabica"
                        control={<Radio />}
                        label="Arabica"
                      />
                      <FormControlLabel
                        value="Robusta"
                        control={<Radio />}
                        label="Robusta"
                      />
                    </RadioGroup>
                  )}
                />
                {errors.beanType && (
                  <Typography color="error">
                    {errors.beanType.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth error={!!errors.grindSize}>
                <FormLabel id="grind-size-label">Grind Size</FormLabel>
                <Controller
                  name="grindSize"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field}>
                      <FormControlLabel
                        value="Fine"
                        control={<Radio />}
                        label="Fine"
                      />
                      <FormControlLabel
                        value="Medium"
                        control={<Radio />}
                        label="Medium"
                      />
                      <FormControlLabel
                        value="Coarse"
                        control={<Radio />}
                        label="Coarse"
                      />
                    </RadioGroup>
                  )}
                />
                {errors.grindSize && (
                  <Typography color="error">
                    {errors.grindSize.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name="waterTemperature"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Water Temperature (°C)"
                    type="number"
                    fullWidth
                    {...field}
                    value={field.value !== undefined ? field.value : ""}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    error={!!errors.waterTemperature}
                    helperText={errors.waterTemperature?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth error={!!errors.brewMethod}>
                <FormLabel id="brew-method-label">Brew Method</FormLabel>
                <Controller
                  name="brewMethod"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field}>
                      <FormControlLabel
                        value="french-press"
                        control={<Radio />}
                        label="French Press"
                      />
                      <FormControlLabel
                        value="espresso"
                        control={<Radio />}
                        label="Espresso"
                      />
                      <FormControlLabel
                        value="pour-over"
                        control={<Radio />}
                        label="Pour Over"
                      />
                    </RadioGroup>
                  )}
                />
                {errors.brewMethod && (
                  <Typography color="error">
                    {errors.brewMethod.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name="brewTimeInSeconds"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Brew Time (Seconds)"
                    type="number"
                    fullWidth
                    {...field}
                    value={field.value !== undefined ? field.value : ""}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    error={!!errors.brewTimeInSeconds}
                    helperText={errors.brewTimeInSeconds?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth error={!!errors.servingSize}>
                <FormLabel id="serving-size-label">Serving Size</FormLabel>
                <Controller
                  name="servingSize"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field}>
                      <FormControlLabel
                        value="Small"
                        control={<Radio />}
                        label="Small"
                      />
                      <FormControlLabel
                        value="Medium"
                        control={<Radio />}
                        label="Medium"
                      />
                      <FormControlLabel
                        value="Large"
                        control={<Radio />}
                        label="Large"
                      />
                    </RadioGroup>
                  )}
                />
                {errors.servingSize && (
                  <Typography color="error">
                    {errors.servingSize.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>
          </Grid>

          <Box mt={3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={mutation.isPending}
            >
              Submit
            </Button>
          </Box>
        </FormGroup>
      </form>
    </Container>
  );
}
