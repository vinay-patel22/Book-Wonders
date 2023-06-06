import {
  Breadcrumbs,
  Button,
  Divider,
  FormControl,
  Typography,
} from "@mui/material";
import React from "react";
import {useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Formik } from "formik";
import * as Yup from "yup";
import authService from "../service/auth.service";
import { toast, ToastContainer } from "react-toastify";
import { useAuthContext } from "../context/auth";

function Login() {
  const navigate = useNavigate();
  const authContext = useAuthContext();

  const initialValues = {
    email: "",
    password: "",
  };

  // Form validation schema using Yup
  const validate = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is Required"),
    password: Yup.string()
      .min(5, "Password must be 5 characters minimum")
      .required("Password is required"),
  });

  // Function called when the form is submitted
  const onSubmit = (values) => {
    authService
      .login(values)
      .then((res) => {
        delete res._id;
        delete res.__v;
        authContext.setUser(res);
        navigate("/");
        toast.success("Successfully logged in");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Breadcrumbs for navigation
  // Comment down by me
  const breadcrumbs = [
    // <Link to={"/"} underline="hover" key="1" color="inherit" href="/">
    //   Home
    // </Link>,
    // <Typography key="2" color={{ color: "#bf0cf0" }}>
    //   Login
    // </Typography>,
  ];

  return (
      <div className="flex-1">
      <ToastContainer />

      {/* Breadcrumbs */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{
          display: "flex",
          marginTop: "50px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {breadcrumbs}
      </Breadcrumbs>

      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          display: "flex",
          // marginTop: "10px",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          color: "#bf0cf0",
        }}
      >
        Login or Create an Account
      </Typography>

      {/* Divider */}
      <div className="flex items-center justify-center m-6">
        <div className="border-t-2 border-[#0cf099] w-32"></div>
      </div>

      {/* Grid layout for form */}
      <div className="grid grid-cols-2 gap-36 mt-12">
        {/* New Customer */}
        <div className="ml-40">
          <Typography variant="h6">New Customer</Typography>
          <Divider sx={{ marginTop: "20px" }} />
          <Typography variant="body2" sx={{ marginTop: "20px" }}>
            Registration is free and easy.
          </Typography>

          <ul className="list-disc mt-5 ml-5">
            <li>Faster Checkout</li>
            <li>Save Multiple shipping addresses</li>
            <li>View and track orders and more</li>
          </ul>

          {/* Create an Account button */}
          <Button
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: "#a40cf0",
              "&:hover": {
                backgroundColor: "#a40cf0",
              },
              textTransform: "capitalize",
              marginTop: "165px",
            }}
            onClick={() => {
              navigate("/register");
            }}
          >
            Create an Account
          </Button>
        </div>

        {/* Registered Customers */}
        <div>
          <Typography variant="h6">Registered Customers</Typography>
          <Divider
            sx={{
              marginTop: "20px",
              marginRight: "160px",
            }}
          />
          <Typography variant="body2" sx={{ marginTop: "20px" }}>
            If you have an account with us, please log in.
          </Typography>

          {/* Form using Formik */}
          <Formik
            initialValues={initialValues}
            validationSchema={validate}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit} className="">
                {/* Email field */}
                <FormControl fullWidth sx={{ marginTop: "20px" }}>
                  <label>Email Address*</label>
                  <TextField
                    size="small"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    sx={{ width: "357px" }}
                  />
                  <div className="text-red-600">
                    {errors.email && touched.email && errors.email}
                  </div>
                </FormControl>

                {/* Password field */}
                <FormControl fullWidth sx={{ marginTop: "40px" }}>
                  <label>Password*</label>
                  <TextField
                    type="password"
                    name="password"
                    size="small"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    sx={{ width: "357px" }}
                  />
                  <div className="text-red-600">
                    {errors.password && touched.password && errors.password}
                  </div>
                </FormControl>

                {/* Submit button */}
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    color: "white",
                    backgroundColor: "#a40cf0",
                    "&:hover": {
                      backgroundColor: "#a40cf0",
                    },
                    marginTop: "60px",
                  }}
                >
                  Submit
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;
