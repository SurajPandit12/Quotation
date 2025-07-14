"use client";

import React, { useState } from "react";

const ContactPopup = ({ contactData, setContactData }) => {
  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = () => setShowPopup(!showPopup);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  const productAddresses = {
    Zoom: `INFLOW TECHNOLOGIES\n(SINGAPORE) PTE LTD\n101 Cecil Street\n#19-03 Tong Eng Building\nSingapore 069533`,
    Zoho: `ZOHO CORPORATION PTE LTD\n105 CECIL STREET, #10-04\nTHE OCTAGON SINGAPORE\n069534`,
    Microsoft: `CONNEX INFORMATION\nTECHNOLOGIES (PVT) LTD\nNO.286,R.A.DE MEL MAWATHA,\nCOLOMBO 3\nSRILANKA`,
  };
  const productClientDetails = {
    Zoom: {
      companyName: "MOF IECCD",
      email: "ieccdzoom@mof.gov.np",
      dr: "DR-185153",
    },
    Zoho: {
      companyName: "Mels and Miles",
      primaryDomain: "melsandmiles.com",
      addressLine1: "Bhanimandal",
      city: "Lalitpur",
      state: "Bagmati",
      zipCode: "44700",
      profile: "Profile",
    },
    Microsoft: {
      companyName: "Dinesh Dhital",
      primaryDomain: "",
      addressLine1: "Banasthali",
      city: "Kathmandu",
      state: "Bagmati",
      zipCode: "44600",
      contactPerson: "Dinesh Dhital",
      email: "contact@nestnepal.com.np",
      phone: "9851139234",
    },
  };
const productDescriptions = {
  Zoom: [
    "Zoom One - Pro - 1 Year Prepay (PAR1-PRO-BASE-NH1Y)",
    "Zoom Whiteboard - Unlimited Boards - 1 Year Prepay",
  ],
  Zoho: ["Zoho Mail lite"],
  Microsoft: ["Microsoft Apps For Business"],
};

const priceMap = {
  "Zoom One - Pro - 1 Year Prepay (PAR1-PRO-BASE-NH1Y)": 135.92,
  "Zoom Whiteboard - Unlimited Boards - 1 Year Prepay": 21.17,
  "Zoho Mail lite": 10.0,
  "Microsoft Apps For Business": 99.99,
};

  return (
    <>
      <button
        onClick={togglePopup}
        style={{
          position: "fixed",
          right: "20px",
          top: "20px",
          backgroundColor: "#2563eb",
          color: "white",
          padding: "10px 20px",
          fontSize: "16px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          zIndex: 1000,
        }}
      >
        Edit Contact
      </button>

      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#f9fafb",
            padding: "32px",
            borderRadius: "16px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
            zIndex: 1001,
            width: "90%",
            maxWidth: "700px",
            overflowY: "auto",
            maxHeight: "90vh",
          }}
        >
          <h2
            style={{
              marginBottom: "24px",
              textAlign: "center",
              fontSize: "24px",
              color: "#111827",
              fontWeight: "600",
            }}
          >
            Edit Contact Information
          </h2>
          <label style={{ display: "block", marginBottom: "16px" }}>
            <span style={{ display: "block", marginBottom: "6px" }}>
              Select Product
            </span>
            <select
              onChange={(e) => {
                const selected = e.target.value;
                const descriptions = productDescriptions[selected];
                const newItems = descriptions.map((desc) => ({
                  qty: "1 License",
                  duration: "1 year",
                  description: desc,
                  unitPrice: priceMap[desc],
                  total: priceMap[desc],
                }));

                setContactData((prev) => ({
                  ...prev,
                  product: selected,
                  address: productAddresses[selected],
                  items: newItems,
                  ...productClientDetails[selected], // maintain existing
                }));
              }}
            >
              {Object.keys(productAddresses).map((product) => (
                <option key={product} value={product}>
                  {product}
                </option>
              ))}
            </select>
          </label>
          {/* {["companyName", "email", "dr", "poNumber"].map((field) => (
            <label
              key={field}
              style={{ display: "block", marginBottom: "16px" }}
            >
              <span style={{ display: "block", marginBottom: "6px" }}>
                {field === "dr" ? "DR" : field.replace(/([A-Z])/g, " $1")}
              </span>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={contactData[field] || ""}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  fontSize: "15px",
                }}
              />
            </label>
          ))} */}
          {/* Dynamic Client Details Form */}
          <label style={{ display: "block", marginBottom: "16px" }}>
            <span style={{ display: "block", marginBottom: "6px" }}>
              P.O. Number
            </span>
            <input
              type="text"
              name="poNumber"
              value={contactData.poNumber || ""}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "15px",
              }}
            />
          </label>
          <h3 style={{ fontSize: "18px", margin: "20px 0 10px" }}>
            Client Details
          </h3>

          {contactData.product === "Zoom" && (
            <>
              {["companyName", "email", "dr"].map((field) => (
                <label
                  key={field}
                  style={{ display: "block", marginBottom: "16px" }}
                >
                  <span style={{ display: "block", marginBottom: "6px" }}>
                    {field === "dr" ? "DR" : field.replace(/([A-Z])/g, " $1")}
                  </span>
                  <input
                    type="text"
                    name={field}
                    value={contactData[field] || ""}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #d1d5db",
                      fontSize: "15px",
                    }}
                  />
                </label>
              ))}
            </>
          )}

          {contactData.product === "Zoho" && (
            <>
              {[
                "companyName",
                "primaryDomain",
                "addressLine1",
                "city",
                "state",
                "zipCode",
                "profile",
              ].map((field) => (
                <label
                  key={field}
                  style={{ display: "block", marginBottom: "16px" }}
                >
                  <span style={{ display: "block", marginBottom: "6px" }}>
                    {field.replace(/([A-Z])/g, " $1")}
                  </span>
                  <input
                    type="text"
                    name={field}
                    value={contactData[field] || ""}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #d1d5db",
                      fontSize: "15px",
                    }}
                  />
                </label>
              ))}
            </>
          )}

          {contactData.product === "Microsoft" && (
            <>
              {[
                "companyName",
                "primaryDomain",
                "addressLine1",
                "city",
                "state",
                "zipCode",
                "contactPerson",
                "email",
                "phone",
              ].map((field) => (
                <label
                  key={field}
                  style={{ display: "block", marginBottom: "16px" }}
                >
                  <span style={{ display: "block", marginBottom: "6px" }}>
                    {field.replace(/([A-Z])/g, " $1")}
                  </span>
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={contactData[field] || ""}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #d1d5db",
                      fontSize: "15px",
                    }}
                  />
                </label>
              ))}
            </>
          )}

          <h3 style={{ fontSize: "18px", margin: "20px 0 10px" }}>Items</h3>

          {contactData.items.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #d1d5db",
                padding: "16px",
                borderRadius: "12px",
                marginBottom: "20px",
                backgroundColor: "#fff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginBottom: "12px",
                }}
              >
                <div style={{ flex: "1" }}>
                  <label style={{ display: "block", marginBottom: "6px" }}>
                    Quantity
                  </label>
                  <input
                    type="text"
                    value={item.qty}
                    onChange={(e) => {
                      const newItems = [...contactData.items];
                      newItems[index].qty = e.target.value;

                      const qtyNum = parseFloat(e.target.value) || 0;
                      newItems[index].total =
                        qtyNum * (newItems[index].unitPrice || 0);
                      setContactData({ ...contactData, items: newItems });
                    }}
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                    }}
                  />
                </div>
                <div style={{ flex: "1" }}>
                  <label style={{ display: "block", marginBottom: "6px" }}>
                    Duration
                  </label>
                  <input
                    type="text"
                    value={item.duration}
                    onChange={(e) => {
                      const newItems = [...contactData.items];
                      newItems[index].duration = e.target.value;
                      setContactData({ ...contactData, items: newItems });
                    }}
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                    }}
                  />
                </div>

                <div style={{ flex: "2" }}>
                  <label style={{ display: "block", marginBottom: "6px" }}>
                    Description
                  </label>
                  <select
                    value={item.description}
                    onChange={(e) => {
                      const desc = e.target.value;
                      const newItems = [...contactData.items];
                      newItems[index].description = desc;
                      newItems[index].unitPrice = priceMap[desc];
                      newItems[index].total =
                        newItems[index].qty * priceMap[desc];
                      setContactData({ ...contactData, items: newItems });
                    }}
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                    }}
                  >
                    {(productDescriptions[contactData.product] || []).map(
                      (desc) => (
                        <option key={desc} value={desc}>
                          {desc}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* Unit Price */}
                <div style={{ flex: "1" }}>
                  <label style={{ display: "block", marginBottom: "6px" }}>
                    Unit Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => {
                      const newItems = [...contactData.items];
                      newItems[index].unitPrice = parseFloat(e.target.value);
                      const qtyNum = parseFloat(newItems[index].qty) || 0;
                      newItems[index].total =
                        qtyNum * parseFloat(e.target.value || 0);
                      setContactData({ ...contactData, items: newItems });
                    }}
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                    }}
                  />
                </div>
              </div>

              <div style={{ fontSize: "14px", color: "#374151" }}>
                Unit Price: ${item.unitPrice?.toFixed(2) || "0.00"} <br />
                Total: ${item.total?.toFixed(2) || "0.00"}
              </div>
            </div>
          ))}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <button
              onClick={togglePopup}
              style={{
                flex: "1",
                marginRight: "12px",
                padding: "10px",
                backgroundColor: "#e5e7eb",
                color: "#111827",
                border: "none",
                borderRadius: "8px",
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={togglePopup}
              style={{
                flex: "1",
                padding: "10px",
                backgroundColor: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactPopup;
