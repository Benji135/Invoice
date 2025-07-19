import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// ✅ Section Component
const Section = ({ title, fields, formik, isDisabled = false }) => (
  <div className={`bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 mb-6 ${isDisabled ? "opacity-50 pointer-events-none" : ""}`}>
    <div className="bg-indigo-50 text-indigo-700 px-5 py-3 font-semibold text-base border-b rounded-t-2xl">
      {title}
    </div>
    <div className="p-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {fields.map(({ name, label, type = "text", options, custom }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={name}>
              {label}
            </label>
            {custom
              ? custom(formik)
              : options ? (
                <select
                  id={name}
                  name={name}
                  value={formik.values[name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-4 py-2 rounded-md border ${formik.touched[name] && formik.errors[name] ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                >
                  <option value="">Select {label}</option>
                  {options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={type}
                  id={name}
                  name={name}
                  value={formik.values[name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-4 py-2 rounded-md border ${formik.touched[name] && formik.errors[name] ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                />
              )}
            {formik.touched[name] && formik.errors[name] && (
              <p className="text-sm text-red-500 mt-1">{formik.errors[name]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ✅ Field definitions

const basicFields = [
  { name: "buyerRegNo", label: "Buyer Registration No", type: "text" },
  { name: "invoiceType", label: "Invoice Type", options: ["Sales Invoice", "Debit Note"] },
  {
    name: "province", label: "Sale Org Province", options: [
      "Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan", "Islamabad Capital Territory", "Gilgit-Baltistan", "Azad Jammu & Kashmir"
    ]
  },
  { name: "buyerName", label: "Buyer Name" },
  { name: "invoiceNo", label: "Invoice Number" },
  {
    name: "destination", label: "Destination of Supply", options: [
      "Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan", "Islamabad Capital Territory", "Gilgit-Baltistan", "Azad Jammu & Kashmir"
    ]
  },
  { name: "buyerType", label: "Buyer Type", options: ["Registered", "Unregistered"] },
  { name: "invoiceDate", label: "Invoice Date", type: "date" },
  {
    name: "saleType", label: "Sale Type", options: [
      "Goods at standard rate", "Goods at reduced rate", "Goods at zero rate", "Petroleum products", "Electricity supply to retailers",
      "SIM", "Gas to CNG stations", "Mobile phones", "Processing / conversion of goods", "3rd schedule goods",
      "Goods (FED in ST Mode)", "Services (FED in ST Mode)", "Services", "Exempt Goods", "DTRE goods",
      "Cotton ginners", "Electric vehicle", "Cement/concrete block", "Telecommunication services",
      "Steel melting and re-rolling", "Ship breaking", "Potassium chlorate", "NG sales",
      "Goods as per SRO 297", "Toll manufacturing", "Non-adjustable suppliers"
    ]
  }
];

const rateOptions = Array.from({ length: 35 }, (_, i) => (i * 0.5).toFixed(1)).filter(val => val <= 17);

const itemFields = [
  { name: "hsCode", label: "HS Code Description" },
  { name: "productCode", label: "Product Code & Description" },

  // ✅ Rate with conditional behavior
  {
    name: "rate", label: "Rate", custom: (formik) => {
      const saleType = formik.values.saleType;
      if (!saleType) {
        return (
          <input
            type="text"
            id="rate"
            name="rate"
            disabled
            value=""
            className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-100"
          />
        );
      } else if (saleType === "Goods at standard rate") {
        return (
          <input
            type="number"
            id="rate"
            name="rate"
            value={18}
            disabled
            className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-100"
          />
        );
      } else {
        return (
          <select
            id="rate"
            name="rate"
            value={formik.values.rate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-4 py-2 rounded-md border border-gray-300"
          >
            <option value="">Select Rate</option>
            {rateOptions.map((rate) => (
              <option key={rate} value={rate}>{rate}%</option>
            ))}
          </select>
        );
      }
    }
  },

  { name: "valueExclST", label: "Value Excl ST" },
  { name: "stWithheld", label: "ST Withheld" },
  { name: "pfadValue", label: "PFAD Value" },

  {
    name: "uom", label: "UOM", options: [
      "MT", "Bill of lading", "SET", "KWH", "40KG", "Liter", "SqY", "Bag", "KG", "MMBTU", "Meter",
      "Carat", "Cubic Meter", "Dozen", "Gram", "Gallon", "Kilogram", "Pound", "Timber Logs",
      "Numbers,pieces,units", "Packs", "Pair", "Square Foot", "Square Meter", "Thousand Unit",
      "Mega Watt", "Foot", "Barrels", "NO", "Others", "1000kWh", "SquareFoot"
    ]
  },

  { name: "salesTax", label: "Sales Tax" },
  { name: "extraTax", label: "Extra Tax" },

  {
    name: "sroNo", label: "SRO / Schedule No.", options: [
      "EIGHT SCHEDULE Table 1", "EIGHT SCHEDULE Table 2"
    ]
  },

  { name: "quantity", label: "Quantity" },
  { name: "retailValue", label: "Retail Value" },
  { name: "furtherTaxNo", label: "Further Tax Sr No." },
];

const getInitialValues = (fields) =>
  fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

const validationSchema = Yup.object({
  buyerRegNo: Yup.string().matches(/^\d{5}-\d{7}-\d$/, "Invalid CNIC format").required("Required"),
  invoiceNo: Yup.string().required("Required"),
  invoiceDate: Yup.string().required("Required"),
  invoiceType: Yup.string().required("Required"),
  province: Yup.string().required("Required"),
  buyerName: Yup.string().required("Required"),
});

function InvoiceForm() {
  const formik = useFormik({
    initialValues: getInitialValues([...basicFields, ...itemFields]),
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("Submitting", values);
      alert("✅ Invoice submitted (check console for payload)");
    }
  });

  // ✅ Check if all basic fields are filled
  const isBasicFilled = basicFields.every(field => formik.values[field.name]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">FBR Invoice Details</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <Section title="BASIC INFORMATION" fields={basicFields} formik={formik} />
        <Section title="ITEM DETAIL" fields={itemFields} formik={formik} isDisabled={!isBasicFilled} />
        <div className="flex flex-col md:flex-row gap-4">
          <button type="submit" className="w-full md:w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition">Submit</button>
          <button type="button" onClick={() => formik.resetForm()} className="w-full md:w-1/2 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition">Reset</button>
        </div>
      </form>
    </div>
  );
}

export default InvoiceForm;
