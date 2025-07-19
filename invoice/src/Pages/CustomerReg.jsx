import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { User2, CheckCircle, Building2 } from "lucide-react";

// Initial form values
const initialValues = {
    name: "",
    ntn: "",
    strn: "",
    phone: "",
    hqAddress: "",
    factoryAddress: "",
    email: "",
    web: "",
    companyType: "",
    registered: "",
    cnic: "",
    iso: "",
};

// Validation schema with conditional logic
const validationSchema = Yup.object({
    name: Yup.string().required("Required"),

    ntn: Yup.string()
        .when("registered", {
            is: "Yes",
            then: (schema) =>
                schema
                    .matches(/^\d{6}-\d{1}$/, "Invalid NTN format (e.g. 123456-7)")
                    .required("NTN is required"),
            otherwise: (schema) => schema.notRequired(),
        }),

    strn: Yup.string()
        .when("registered", {
            is: "Yes",
            then: (schema) =>
                schema
                    .matches(/^\d{2}-\d{2}-\d{4}-\d{3}-\d{2}$/, "Invalid STRN format (e.g. 03-04-5205-001-19)")
                    .required("STRN is required when Registered is Yes"),
            otherwise: (schema) => schema.notRequired(),
        }),

    phone: Yup.string()
        .matches(/^\d{11}$/, "Phone must be 11 digits (e.g. 03001234567)")
        .required("Required"),

    hqAddress: Yup.string().required("Required"),
    factoryAddress: Yup.string().notRequired(),

    email: Yup.string().email("Invalid email").notRequired(),
    web: Yup.string().url("Invalid URL").notRequired(),

    companyType: Yup.string().required("Required"),

    registered: Yup.string()
        .oneOf(["Yes", "No"], "Select Yes or No")
        .required("Required"),

    cnic: Yup.string()
        .matches(/^\d{5}-\d{7}-\d{1}$/, "Invalid CNIC format (e.g. 35201-5484777-3)")
        .required("Required"),

    iso: Yup.string().required("Required"),
});

// Section wrapper
const Section = ({ title, icon, children }) => (
    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200">
        <div className="bg-indigo-50 text-indigo-700 px-5 py-3 flex items-center gap-2 rounded-t-2xl border-b border-gray-200 text-base font-semibold">
            <span className="text-indigo-600">{icon}</span>
            {title}
        </div>
        <div className="p-5 space-y-4">{children}</div>
    </div>
);

// Input component
const Input = ({ name, label, type = "text", formik, disabled = false }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        <input
            type={type}
            id={name}
            name={name}
            disabled={disabled}
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-4 py-2 rounded-md border ${
                disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
            } ${formik.touched[name] && formik.errors[name] ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-400`}
        />
        {formik.touched[name] && formik.errors[name] && !disabled && (
            <p className="text-sm text-red-500 mt-1">{formik.errors[name]}</p>
        )}
    </div>
);

// Select component
const Select = ({ name, label, options, formik }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        <select
            id={name}
            name={name}
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-4 py-2 rounded-md border ${
                formik.touched[name] && formik.errors[name] ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-400`}
        >
            <option value="">Select</option>
            {options.map((opt) => (
                <option key={opt} value={opt}>
                    {opt}
                </option>
            ))}
        </select>
        {formik.touched[name] && formik.errors[name] && (
            <p className="text-sm text-red-500 mt-1">{formik.errors[name]}</p>
        )}
    </div>
);

function CustomerRegistrationForm() {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const res = await fetch("http://192.168.100.51:3000/api/register-customer", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                });

                const data = await res.json();
                if (res.ok) {
                    alert("✅ Customer registered successfully");
                    resetForm();
                } else {
                    alert("❌ Failed to register: " + data.message);
                }
            } catch (error) {
                console.error("Submission error:", error);
                alert("❌ Network or server error");
            }
        },
    });

    // Clear STRN field when not registered
    useEffect(() => {
        if (formik.values.registered === "No") {
            formik.setFieldValue("strn", "");
        }
    }, [formik.values.registered]);

    return (
        <div className="max-w-6xl mx-auto px-1 py-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
                Register Customer
            </h2>

            <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company & Contact */}
                <Section title="Company & Contact" icon={<User2 size={18} />}>
                    <Input name="name" label="Name" formik={formik} />
                    <Select
                        name="companyType"
                        label="Company Type"
                        formik={formik}
                        options={[
                            "Individual",
                            "AOP",
                            "Partnership Firm (Reg)",
                            "Pvt Ltd Co.",
                            "Public Ltd Co.",
                            "Semi Govt.",
                            "Govt Institution",
                        ]}
                    />
                    <Input name="email" label="Email" type="email" formik={formik} />
                    <Input name="phone" label="Phone" formik={formik} />
                    <Input name="web" label="Website" formik={formik} />
                </Section>

                {/* Tax & Certifications */}
                <Section title="Tax & Certifications" icon={<CheckCircle size={18} />}>
                    <Input name="ntn" label="NTN" formik={formik} />
                    <Input
                        name="strn"
                        label="STRN / GST No."
                        formik={formik}
                        disabled={formik.values.registered === "No"}
                    />
                    <Input name="cnic" label="CNIC" formik={formik} />
                    <Input name="iso" label="ISO Certificate No." formik={formik} />
                    <Select
                        name="registered"
                        label="Registered"
                        formik={formik}
                        options={["Yes", "No"]}
                    />
                </Section>

                {/* Address */}
                <Section title="Addresses" icon={<Building2 size={18} />}>
                    <Input name="hqAddress" label="Headquarters Address" formik={formik} />
                    <Input name="factoryAddress" label="Factory Address" formik={formik} />
                </Section>

                {/* Submit */}
                <div className="md:col-span-2 pt-4 flex gap-4">
                    <button
                        type="submit"
                        className="w-full md:w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-200"
                    >
                        Register
                    </button>
                    <button
                        type="button"
                        onClick={() => formik.resetForm()}
                        className="w-full md:w-1/2 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition duration-200"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CustomerRegistrationForm;
