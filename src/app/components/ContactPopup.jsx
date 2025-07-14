"use client";

import { useState, useEffect } from "react";

const ContactPopup = ({ contactData, setContactData }) => {
  const [showPopup, setShowPopup] = useState(true); // Show by default initially
  const [isEditing, setIsEditing] = useState(true); // Start in edit mode
  const [localData, setLocalData] = useState(contactData);

  useEffect(() => {
    setLocalData(contactData);
  }, [contactData]);

  const togglePopup = () => setShowPopup(!showPopup);
  const toggleEdit = () => setIsEditing(!isEditing);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setContactData(localData);
    setIsEditing(false);
    setShowPopup(false);
  };

  const productAddresses = {
    Zoom: `INFLOW TECHNOLOGIES\n(SINGAPORE) PTE LTD\n101 Cecil Street\n#19-03 Tong Eng Building\nSingapore 069533`,
    Zoho: `ZOHO CORPORATION PTE LTD\n105 CECIL STREET, #10-04\nTHE OCTAGON SINGAPORE\n069534`,
    Microsoft: `CONNEX INFORMATION\nTECHNOLOGIES (PVT) LTD\nNO.286,R.A.DE MEL MAWATHA,\nCOLOMBO 3\nSRILANKA`,
  };

  const productClientDetails = {
    Zoom: {
      companyName: "",
      email: "",
      dr: "",
    },
    Zoho: {
      companyName: "",
      primaryDomain: "",
      addressLine1: "",
      city: "",
      state: "",
      zipCode: "",
      profile: "",
    },
    Microsoft: {
      companyName: "",
      primaryDomain: "",
      addressLine1: "",
      city: "",
      state: "",
      zipCode: "",
      contactPerson: "",
      email: "",
      phone: "",
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
    "Zoho Mail lite": 80.18,
    "Microsoft Apps For Business": 80.18,
  };

  const addNewItem = () => {
    const firstDescription = productDescriptions[localData.product][0];
    const newItem = {
      qty: "",
      duration: "",
      description: firstDescription,
      unitPrice: priceMap[firstDescription],
      total: priceMap[firstDescription],
    };
    setLocalData({
      ...localData,
      items: [...localData.items, newItem],
    });
  };

  const removeItem = (index) => {
    const newItems = [...localData.items];
    newItems.splice(index, 1);
    setLocalData({ ...localData, items: newItems });
  };

  return (
    <>
      {!showPopup && (
        <button
          onClick={() => {
            setShowPopup(true);
            setIsEditing(true);
          }}
          className="edit-contact-button"
          style={{
            position: "fixed",
            right: "20px",
            top: "20px",
            backgroundColor: "#4f46e5",
            color: "white",
            padding: "10px 20px",
            fontSize: "16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            zIndex: 1000,
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#4338ca";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 8px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#4f46e5";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          Edit Contact
        </button>
      )}

      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#ffffff",
            padding: "32px",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            zIndex: 1001,
            width: "90%",
            maxWidth: "700px",
            overflowY: "auto",
            maxHeight: "90vh",
            border: "1px solid #e5e7eb",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
              paddingBottom: "16px",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "22px",
                color: "#111827",
                fontWeight: "600",
              }}
            >
              {isEditing ? "Enter Contact Information" : "Review Information"}
            </h2>
            <button
              onClick={togglePopup}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#6b7280",
                fontSize: "20px",
                padding: "4px",
              }}
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {isEditing ? (
            <>
              <div style={{ marginBottom: "24px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "500",
                    color: "#374151",
                    fontSize: "14px",
                  }}
                >
                  Select Product
                </label>
                <select
                  value={localData.product}
                  onChange={(e) => {
                    const selected = e.target.value;
                    const descriptions = productDescriptions[selected];
                    const newItems = [
                      {
                        qty: "1 License",
                        duration: "1 year",
                        description: descriptions[0],
                        unitPrice: priceMap[descriptions[0]],
                        total: priceMap[descriptions[0]],
                      },
                    ];

                    setLocalData({
                      ...localData,
                      product: selected,
                      address: productAddresses[selected],
                      items: newItems,
                      ...productClientDetails[selected],
                    });
                  }}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1px solid #d1d5db",
                    fontSize: "15px",
                    backgroundColor: "#f9fafb",
                    transition: "all 0.2s ease",
                  }}
                >
                  {Object.keys(productAddresses).map((product) => (
                    <option key={product} value={product}>
                      {product}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "500",
                    color: "#374151",
                    fontSize: "14px",
                  }}
                >
                  P.O. Number
                </label>
                <input
                  type="number"
                  name="poNumber"
                  value={localData.poNumber || ""}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1px solid #d1d5db",
                    fontSize: "15px",
                    backgroundColor: "#f9fafb",
                    transition: "all 0.2s ease",
                  }}
                />
              </div>

              <div
                style={{
                  marginBottom: "24px",
                  padding: "16px",
                  borderRadius: "8px",
                  backgroundColor: "#f9fafb",
                  border: "1px solid #e5e7eb",
                }}
              >
                <h3
                  style={{
                    fontSize: "16px",
                    margin: "0 0 16px 0",
                    color: "#111827",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Client Details
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: "16px",
                  }}
                >
                  {localData.product === "Zoom" &&
                    ["companyName", "email", "dr"].map((field) => (
                      <div key={field}>
                        <label
                          style={{
                            display: "block",
                            marginBottom: "6px",
                            fontWeight: "500",
                            color: "#374151",
                            fontSize: "14px",
                          }}
                        >
                          {field === "dr"
                            ? "DR"
                            : field.replace(/([A-Z])/g, " $1")}
                        </label>
                        <input
                          type="text"
                          name={field}
                          value={localData[field] || ""}
                          onChange={handleChange}
                          style={{
                            width: "100%",
                            padding: "8px 12px",
                            borderRadius: "6px",
                            border: "1px solid #d1d5db",
                            fontSize: "14px",
                            backgroundColor: "#ffffff",
                          }}
                        />
                      </div>
                    ))}

                  {localData.product === "Zoho" &&
                    [
                      "companyName",
                      "primaryDomain",
                      "addressLine1",
                      "city",
                      "state",
                      "zipCode",
                      "profile",
                    ].map((field) => (
                      <div key={field}>
                        <label
                          style={{
                            display: "block",
                            marginBottom: "6px",
                            fontWeight: "500",
                            color: "#374151",
                            fontSize: "14px",
                          }}
                        >
                          {field.replace(/([A-Z])/g, " $1")}
                        </label>
                        <input
                          type="text"
                          name={field}
                          value={localData[field] || ""}
                          onChange={handleChange}
                          style={{
                            width: "100%",
                            padding: "8px 12px",
                            borderRadius: "6px",
                            border: "1px solid #d1d5db",
                            fontSize: "14px",
                            backgroundColor: "#ffffff",
                          }}
                        />
                      </div>
                    ))}

                  {localData.product === "Microsoft" &&
                    [
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
                      <div key={field}>
                        <label
                          style={{
                            display: "block",
                            marginBottom: "6px",
                            fontWeight: "500",
                            color: "#374151",
                            fontSize: "14px",
                          }}
                        >
                          {field.replace(/([A-Z])/g, " $1")}
                        </label>
                        <input
                          type={field === "email" ? "email" : "text"}
                          name={field}
                          value={localData[field] || ""}
                          onChange={handleChange}
                          style={{
                            width: "100%",
                            padding: "8px 12px",
                            borderRadius: "6px",
                            border: "1px solid #d1d5db",
                            fontSize: "14px",
                            backgroundColor: "#ffffff",
                          }}
                        />
                      </div>
                    ))}
                </div>
              </div>

              <div
                style={{
                  marginBottom: "24px",
                  padding: "16px",
                  borderRadius: "8px",
                  backgroundColor: "#f9fafb",
                  border: "1px solid #e5e7eb",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "16px",
                      margin: 0,
                      color: "#111827",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    Items
                  </h3>
                  <button
                    onClick={addNewItem}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 12px",
                      backgroundColor: "#4f46e5",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Add Item
                  </button>
                </div>

                {localData.items.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      border: "1px solid #e5e7eb",
                      padding: "16px",
                      borderRadius: "8px",
                      marginBottom: "16px",
                      backgroundColor: "#ffffff",
                      position: "relative",
                    }}
                  >
                    {localData.items.length > 1 && (
                      <button
                        onClick={() => removeItem(index)}
                        style={{
                          position: "absolute",
                          top: "-10px",
                          right: "-10px",
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          backgroundColor: "#ef4444",
                          color: "white",
                          border: "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        }}
                        aria-label="Remove item"
                      >
                        ×
                      </button>
                    )}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(150px, 1fr))",
                        gap: "12px",
                        marginBottom: "12px",
                      }}
                    >
                      <div>
                        <label
                          style={{
                            display: "block",
                            marginBottom: "6px",
                            fontWeight: "500",
                            color: "#374151",
                            fontSize: "14px",
                          }}
                        >
                          Quantity
                        </label>
                        <input
                          type="number"
                          value={item.qty}
                          onChange={(e) => {
                            const newItems = [...localData.items];
                            newItems[index].qty = e.target.value;
                            const qtyNum = parseFloat(
                              e.target.value.match(/\d+/)?.[0] || 0
                            );
                            newItems[index].total =
                              qtyNum * (newItems[index].unitPrice || 0);
                            setLocalData({ ...localData, items: newItems });
                          }}
                          style={{
                            width: "100%",
                            padding: "8px 12px",
                            borderRadius: "6px",
                            border: "1px solid #d1d5db",
                            fontSize: "14px",
                            backgroundColor: "#ffffff",
                          }}
                        />
                      </div>

                      <div>
                        <label
                          style={{
                            display: "block",
                            marginBottom: "6px",
                            fontWeight: "500",
                            color: "#374151",
                            fontSize: "14px",
                          }}
                        >
                          Duration
                        </label>
                        <input
                          type="number"
                          value={item.duration}
                          onChange={(e) => {
                            const newItems = [...localData.items];
                            newItems[index].duration = e.target.value;
                            setLocalData({ ...localData, items: newItems });
                          }}
                          style={{
                            width: "100%",
                            padding: "8px 12px",
                            borderRadius: "6px",
                            border: "1px solid #d1d5db",
                            fontSize: "14px",
                            backgroundColor: "#ffffff",
                          }}
                        />
                      </div>

                      <div style={{ gridColumn: "span 2" }}>
                        <label
                          style={{
                            display: "block",
                            marginBottom: "6px",
                            fontWeight: "500",
                            color: "#374151",
                            fontSize: "14px",
                          }}
                        >
                          Description
                        </label>
                        <select
                          value={item.description}
                          onChange={(e) => {
                            const desc = e.target.value;
                            const newItems = [...localData.items];
                            newItems[index].description = desc;
                            newItems[index].unitPrice = priceMap[desc];
                            newItems[index].total =
                              newItems[index].qty * priceMap[desc];
                            setLocalData({ ...localData, items: newItems });
                          }}
                          style={{
                            width: "100%",
                            padding: "8px 12px",
                            borderRadius: "6px",
                            border: "1px solid #d1d5db",
                            fontSize: "14px",
                            backgroundColor: "#ffffff",
                          }}
                        >
                          {(productDescriptions[localData.product] || []).map(
                            (desc) => (
                              <option key={desc} value={desc}>
                                {desc}
                              </option>
                            )
                          )}
                        </select>
                      </div>

                      <div>
                        <label
                          style={{
                            display: "block",
                            marginBottom: "6px",
                            fontWeight: "500",
                            color: "#374151",
                            fontSize: "14px",
                          }}
                        >
                          Unit Price ($)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={(e) => {
                            const newItems = [...localData.items];
                            newItems[index].unitPrice = parseFloat(
                              e.target.value || 0
                            );
                            const qtyNum = parseFloat(newItems[index].qty) || 0;
                            newItems[index].total =
                              qtyNum * parseFloat(e.target.value || 0);
                            setLocalData({ ...localData, items: newItems });
                          }}
                          style={{
                            width: "100%",
                            padding: "8px 12px",
                            borderRadius: "6px",
                            border: "1px solid #d1d5db",
                            fontSize: "14px",
                            backgroundColor: "#ffffff",
                          }}
                        />
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "14px",
                        color: "#374151",
                        padding: "8px 0",
                        borderTop: "1px dashed #e5e7eb",
                      }}
                    >
                      <span>
                        <strong>Unit Price:</strong> $
                        {item.unitPrice?.toFixed(2) || "0.00"}
                      </span>
                      <span>
                        <strong>Total:</strong> $
                        {item.total?.toFixed(2) || "0.00"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "12px",
                  marginTop: "16px",
                }}
              >
                <button
                  onClick={togglePopup}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#f3f4f6",
                    color: "#374151",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "15px",
                    cursor: "pointer",
                    fontWeight: "500",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#4f46e5",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "15px",
                    cursor: "pointer",
                    fontWeight: "500",
                  }}
                >
                  Save & Generate Invoice
                </button>
              </div>
            </>
          ) : (
            <div>
              <div style={{ marginBottom: "24px" }}>
                <h3 style={{ marginBottom: "8px", color: "#374151" }}>
                  Product:
                </h3>
                <p style={{ fontWeight: "500" }}>{localData.product}</p>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <h3 style={{ marginBottom: "8px", color: "#374151" }}>
                  Client Details:
                </h3>
                {localData.product === "Zoom" && (
                  <div>
                    <p>
                      <strong>Company Name:</strong> {localData.companyName}
                    </p>
                    <p>
                      <strong>Email:</strong> {localData.email}
                    </p>
                    <p>
                      <strong>DR:</strong> {localData.dr}
                    </p>
                  </div>
                )}
                {localData.product === "Zoho" && (
                  <div>
                    <p>
                      <strong>Company Name:</strong> {localData.companyName}
                    </p>
                    <p>
                      <strong>Primary Domain:</strong> {localData.primaryDomain}
                    </p>
                    <p>
                      <strong>Address:</strong> {localData.addressLine1},{" "}
                      {localData.city}, {localData.state} {localData.zipCode}
                    </p>
                    <p>
                      <strong>Profile:</strong> {localData.profile}
                    </p>
                  </div>
                )}
                {localData.product === "Microsoft" && (
                  <div>
                    <p>
                      <strong>Company Name:</strong> {localData.companyName}
                    </p>
                    <p>
                      <strong>Contact Person:</strong> {localData.contactPerson}
                    </p>
                    <p>
                      <strong>Email:</strong> {localData.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {localData.phone}
                    </p>
                    <p>
                      <strong>Address:</strong> {localData.addressLine1},{" "}
                      {localData.city}, {localData.state} {localData.zipCode}
                    </p>
                  </div>
                )}
              </div>

              <div style={{ marginBottom: "24px" }}>
                <h3 style={{ marginBottom: "8px", color: "#374151" }}>
                  Items:
                </h3>
                {localData.items.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      marginBottom: "16px",
                      padding: "12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  >
                    <p>
                      <strong>Description:</strong> {item.description}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {item.qty}
                    </p>
                    <p>
                      <strong>Duration:</strong> {item.duration}
                    </p>
                    <p>
                      <strong>Unit Price:</strong> ${item.unitPrice?.toFixed(2)}
                    </p>
                    <p>
                      <strong>Total:</strong> ${item.total?.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "12px",
                  marginTop: "16px",
                }}
              >
                <button
                  onClick={() => {
                    setIsEditing(true);
                  }}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#f3f4f6",
                    color: "#374151",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "15px",
                    cursor: "pointer",
                    fontWeight: "500",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={togglePopup}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#4f46e5",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "15px",
                    cursor: "pointer",
                    fontWeight: "500",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ContactPopup;
