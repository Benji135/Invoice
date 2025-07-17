import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const SignupForm = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password too short").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = (values) => {
    console.log("Signup submitted:", values);
  };

  const renderInput = (name, type, placeholder) => (
    <div>
      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full border border-gray-300 p-4 rounded text-lg"
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-600 text-sm mt-1"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center p-4">
      <div className="w-full max-w-[100rem] min-h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left Side */}
        <div className="hidden lg:flex lg:w-3/5 bg-gradient-to-br from-indigo-600 to-blue-700 text-white flex-col justify-center items-center p-10 lg:p-20 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Join SaleSkip! 🚀
          </h2>
          <p className="text-lg lg:text-xl max-w-xl leading-relaxed">
            Simplify your sales-marketing workflow with automation and boost productivity.
          </p>
          <footer className="mt-16 text-sm text-white/70">
            © 2022 SaleSkip. All rights reserved.
          </footer>
        </div>

        {/* Right Side - Form */}
        <div className="lg:w-2/5 w-full flex flex-col justify-center items-center lg:items-start p-10 lg:p-20">
          <div className="w-full max-w-md text-center lg:text-left">
            <h1 className="text-3xl lg:text-4xl font-semibold mb-4">
              Create Account
            </h1>
            <p className="text-base lg:text-lg text-gray-600 mb-8">
              Fill in the form to register your account.
            </p>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  {renderInput("name", "text", "Full Name")}
                  {renderInput("email", "email", "Email")}
                  {renderInput("password", "password", "Password")}
                  {renderInput("confirmPassword", "password", "Confirm Password")}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white p-4 rounded hover:bg-gray-900 transition text-lg"
                  >
                    Register Now
                  </button>
                </Form>
              )}
            </Formik>

            <div className="mt-6 text-sm text-center">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-indigo-600 font-semibold underline"
              >
                Login here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
