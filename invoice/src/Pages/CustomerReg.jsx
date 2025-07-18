import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { User2, CheckCircle, Building2 } from "lucide-react";

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

const validationSchema = Yup.object({
    name: Yup.string().required("Required"),

    ntn: Yup.string()
        .matches(/^\d{6}-\d{1}$/, "Invalid NTN format (e.g. 123456-7)")
        .required("Required"),

    strn: Yup.string()
        .matches(/^\d{2}-\d{2}-\d{4}-\d{3}-\d{2}$/, "Invalid STRN format (e.g. 03-04-5205-001-19)")
        .required("Required"),

    phone: Yup.string().required("Required"),

    hqAddress: Yup.string().required("Required"),
    factoryAddress: Yup.string().required("Required"),

    email: Yup.string().email("Invalid email").required("Required"),
    web: Yup.string().url("Invalid URL").required("Required"),

    companyType: Yup.string().required("Required"),

    registered: Yup.string()
        .oneOf(["Yes", "No"], "Select Yes or No")
        .required("Required"),

    cnic: Yup.string()
        .matches(/^\d{5}-\d{7}-\d{1}$/, "Invalid CNIC format (e.g. 35201-5484777-3)")
        .required("Required"),

    iso: Yup.string().required("Required"),
});


const Section = ({ title, icon, children }) => (
    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200">
        <div className="bg-indigo-50 text-indigo-700 px-5 py-3 flex items-center gap-2 rounded-t-2xl border-b border-gray-200 text-base font-semibold">
            <span className="text-indigo-600">{icon}</span>
            {title}
        </div>
        <div className="p-5 space-y-4">{children}</div>
    </div>
);

const Input = ({ name, label, type = "text", formik }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        <input
            type={type}
            id={name}
            name={name}
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-4 py-2 rounded-md border ${formik.touched[name] && formik.errors[name]
                ? "border-red-500"
                : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-400`}
        />
        {formik.touched[name] && formik.errors[name] && (
            <p className="text-sm text-red-500 mt-1">{formik.errors[name]}</p>
        )}
    </div>
);

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
            className={`w-full px-4 py-2 rounded-md border ${formik.touched[name] && formik.errors[name]
                ? "border-red-500"
                : "border-gray-300"
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
                console.log("Submitted Customer Data:", values);
                // Example: await axios.post('/api/customers', values);
                resetForm();
            } catch (error) {
                console.error("Submission error:", error);
            }
        },
    });

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
                            "Private Limited",
                            "Sole Proprietorship",
                            "Partnership",
                            "Public Limited",
                            "Government Organization",
                        ]}
                    />
                    <Input name="email" label="Email" type="email" formik={formik} />
                    <Input name="phone" label="Phone" formik={formik} />
                    <Input name="web" label="Website" formik={formik} />
                </Section>

                {/* Tax & Certifications */}
                <Section title="Tax & Certifications" icon={<CheckCircle size={18} />}>
                    <Input name="ntn" label="NTN" formik={formik} />
                    <Input name="strn" label="STRN / GST No." formik={formik} />
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
