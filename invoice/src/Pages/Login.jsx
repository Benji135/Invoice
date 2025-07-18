import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link,useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (response.ok) {
        // Save token to localStorage or state
        localStorage.setItem('token', data.token);
        setStatus({ success: 'Login successful!' });
        navigate('/');
        // Redirect or update UI as needed
      } else {
        setStatus({ error: data.message || 'Login failed' });
      }
    } catch (error) {
      setStatus({ error: 'Network error' });
    }
    setSubmitting(false);
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
            Hello SaleSkip
          </h2>
          <p className="text-lg lg:text-xl max-w-xl leading-relaxed">
            Skip repetitive and manual sales-marketing tasks. Get highly
            productive through automation and save tons of time!
          </p>
          <footer className="mt-16 text-sm text-white/70">
            © 2022 SaleSkip. All rights reserved.
          </footer>
        </div>

        {/* Right Side - Form */}
        <div className="lg:w-2/5 w-full flex flex-col justify-center items-center lg:items-start p-10 lg:p-20">
          <div className="w-full max-w-md text-center lg:text-left">
            <h1 className="text-3xl lg:text-4xl font-semibold mb-4">
              Welcome Back!
            </h1>
            <p className="text-base lg:text-lg text-gray-600 mb-8">
              Please enter your credentials to log in.
            </p>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  {renderInput("username", "text", "Username")}
                  {renderInput("password", "password", "Password")}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white p-4 rounded hover:bg-gray-900 transition text-lg"
                  >
                    Login Now
                  </button>
                </Form>
              )}
            </Formik>

            <div className="mt-6 text-sm text-center">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-indigo-600 font-semibold underline"
              >
                Register here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
