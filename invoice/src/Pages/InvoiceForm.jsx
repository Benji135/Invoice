import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// Reusable Section with dynamic field rendering
const Section = ({ title, fields, formik }) => (
  <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 mb-6">
    <div className="bg-indigo-50 text-indigo-700 px-5 py-3 font-semibold text-base border-b rounded-t-2xl">
      {title}
    </div>
    <div className="p-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {fields.map(({ name, label, type = "text" }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={name}>
              {label}
            </label>
            <input
              type={type}
              id={name}
              name={name}
              value={formik.values[name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 rounded-md border ${
                formik.touched[name] && formik.errors[name] ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-400`}
            />
            {formik.touched[name] && formik.errors[name] && (
              <p className="text-sm text-red-500 mt-1">{formik.errors[name]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Field definitions (could be fetched via API in future)
const basicFields = [
  { name: "buyerRegNo", label: "Buyer Registration No" },
  { name: "invoiceType", label: "Invoice Type" },
  { name: "province", label: "Sale Org Province" },
  { name: "buyerName", label: "Buyer Name" },
  { name: "invoiceNo", label: "Invoice Number" },
  { name: "destination", label: "Destination of Supply" },
  { name: "buyerType", label: "Buyer Type" },
  { name: "invoiceDate", label: "Invoice Date", type: "date" },
  { name: "saleType", label: "Sale Type" },
];

const itemFields = [
  { name: "hsCode", label: "HS Code Description" },
  { name: "productCode", label: "Product Code & Description" },
  { name: "rate", label: "Rate" },
  { name: "valueExclST", label: "Value Excl ST" },
  { name: "stWithheld", label: "ST Withheld" },
  { name: "pfadValue", label: "PFAD Value" },
  { name: "uom", label: "UOM" },
  { name: "salesTax", label: "Sales Tax" },
  { name: "extraTax", label: "Extra Tax" },
  { name: "sroNo", label: "SRO / Schedule No." },
  { name: "quantity", label: "Quantity" },
  { name: "retailValue", label: "Retail Value" },
  { name: "furtherTaxNo", label: "Further Tax Sr No." },
];

// Auto-generate initial values
const getInitialValues = (fields) =>
  fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

// Combine all fields
const allFields = [...basicFields, ...itemFields];
const initialValues = getInitialValues(allFields);

// Validation schema (can also be generated dynamically if needed)
const validationSchema = Yup.object({
  buyerRegNo: Yup.string().required("Required"),
  invoiceNo: Yup.string().required("Required"),
  invoiceDate: Yup.string().required("Required"),
});

function InvoiceForm() {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("Submitting", values);
      alert("✅ Invoice submitted (check console for payload)");
    },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">FBR Invoice Details</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <Section title="BASIC INFORMATION" fields={basicFields} formik={formik} />
        <Section title="ITEM DETAIL" fields={itemFields} formik={formik} />

        <div className="flex flex-col md:flex-row gap-4">
          <button
            type="submit"
            className="w-full md:w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => formik.resetForm()}
            className="w-full md:w-1/2 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default InvoiceForm;
