import {
  Breadcrumbs,
  Button,
  Divider,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Formik } from "formik";
import * as Yup from "yup";
import userService from "../service/user.service";
import authService from "../service/auth.service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const navigate = useNavigate();

  // Breadcrumbs for navigation
  // Comment down by me
  const breadcrumbs = [
    // <Link to={"/"} underline="hover" key="1" color="inherit" href="/">
    //   Home
    // </Link>,
    // <Typography key="2" color={{ color: "#bf0cf0"}}>
    //   Create an Account
    // </Typography>,
  ];

  // Initial values for form fields
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    roleId: "",
    password: "",
    confirmPassword: "",
  };

  // Form validation schema
  const validate = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("FirstName is Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("LastName is Required"),
    email: Yup.string().email("Invalid email").required("Email is Required"),
    password: Yup.string().required("Password must Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
    roleId: Yup.string().required("Role is required"),
  });

  // Form submission handler
  const onSubmit = (values) => {
    delete values.confirmPassword;
    authService
      .create(values)
      .then((res) => {
        setTimeout(() => {
          toast.success("Successfully Registered");
        }, 2000);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [roleList, setRoleList] = useState([]);

  // Fetching roles from the server
  const getRoles = () => {
    userService
      .getAllRoles()
      .then((res) => {
        setRoleList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <div className="">
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

      {/* Page title */}
      <Typography
        variant="h4"
        sx={{
          display: "flex",
          // marginTop: "50px",
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
        {/* backgroundColor: "#a40cf0", */}
      </div>

      {/* Personal Information section */}
      <Typography variant="h6" sx={{ marginTop: "50px", marginLeft: "160px" }}>
        Personal Information
      </Typography>

      {/* Divider */}
      <Divider
        sx={{ marginTop: "20px", marginLeft: "160px", marginRight: "160px" }}
      />

      {/* Description */}
      <Typography
        variant="body2"
        sx={{ marginTop: "20px", marginLeft: "160px" }}
      >
        Please enter the following information to create your account
      </Typography>

      {/* Formik form */}
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
          <form onSubmit={handleSubmit} className="flex-1 ml-40 mr-40">
            {/* Grid layout */}
            <div className="grid grid-cols-2 gap-5 mt-5 ">
              {/* First Name field */}
              <FormControl fullWidth>
                <label>First Name*</label>
                <TextField
                  size="small"
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  sx={{ height: "40px" }}
                />
                <div className="text-red-600">
                  {errors.firstName && touched.firstName && errors.firstName}
                </div>
              </FormControl>

              {/* Last Name field */}
              <FormControl fullWidth>
                <label>Last Name*</label>
                <TextField
                  size="small"
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  sx={{ height: "40px" }}
                />
                <div className="text-red-600">
                  {errors.lastName && touched.lastName && errors.lastName}
                </div>
              </FormControl>

              {/* Email field */}
              <FormControl fullWidth>
                <label>Email Address*</label>
                <TextField
                  size="small"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  sx={{ height: "40px" }}
                />
                <div className="text-red-600">
                  {errors.email && touched.email && errors.email}
                </div>
              </FormControl>

              {/* Role field */}
              <FormControl fullWidth>
                <label htmlFor="roleId">Role*</label>
                <Select
                  id="roleId"
                  name="roleId"
                  label="RoleId"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.roleId}
                  error={errors.roleId && touched.roleId}
                  size="small"
                >
                  {/* Role options */}
                  {roleList.length > 0 &&
                    roleList.map((role) => (
                      <MenuItem value={role.id} key={"name" + role.id}>
                        {role.name}
                      </MenuItem>
                    ))}
                </Select>
                <div className="text-red-600">
                  {errors.roleId && touched.roleId && errors.roleId}
                </div>
              </FormControl>
            </div>

            {/* Login Information section */}
            <Typography variant="h6" sx={{ marginTop: "70px" }}>
              Login Information
            </Typography>

            {/* Divider */}
            <Divider />

            {/* Grid layout */}
            <div className="grid grid-cols-2 gap-5 mt-5 ">
              {/* Password field */}
              <FormControl fullWidth>
                <label>Password*</label>
                <TextField
                  type="password"
                  name="password"
                  size="small"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <div className="text-red-600">
                  {errors.password && touched.password && errors.password}
                </div>
              </FormControl>

              {/* Confirm Password field */}
              <FormControl fullWidth>
                <label>Confirm Password*</label>
                <TextField
                  type="confirmPassword"
                  name="confirmPassword"
                  size="small"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                />
                <div className="text-red-600">
                  {errors.confirmPassword &&
                    touched.confirmPassword &&
                    errors.confirmPassword}
                </div>
              </FormControl>
            </div>

            {/* Submit button */}
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting}
              sx={{
                color: "white",
                backgroundColor: "#a40cf0",
                "&:hover": {
                  backgroundColor: "#a40cf0", // Change the hover background color
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
  );
}

export default Register;