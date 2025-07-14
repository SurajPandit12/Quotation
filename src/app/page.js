"use client";

import React, { useState } from "react";
import Zoom from "./components/Zoom";
import Zoho from "./components/Zoho";
import Microsoft from "./components/Microsoft";
import ContactPopup from "./components/ContactPopup";

const Page = () => {
  const [contactData, setContactData] = useState({
    companyName: "MOF IECCD",
    email: "ieccdzoom@mof.gov.np",
    dr: "DR-185153",
    poNumber: "15853",
    product: "Zoom",
    address: `INFLOW TECHNOLOGIES\n(SINGAPORE) PTE LTD\n101 Cecil Street\n#19-03 Tong Eng Building\nSingapore 069533`,
    items: [
      {
        qty: "1",
        duration: "1",
        description: "Zoom One - Pro - 1 Year Prepay (PAR1-PRO-BASE-NH1Y)",
        unitPrice: 135.92,
        total: 135.92,
      },
      {
        qty: "1",
        duration: "1",
        description: "Zoom Whiteboard - Unlimited Boards - 1 Year Prepay",
        unitPrice: 21.17,
        total: 21.17,
      },
    ],
  });

  return (
    <div style={{ position: "relative" }}>
      {contactData.product === "Zoom" && <Zoom contact={contactData} />}
      {contactData.product === "Zoho" && (
        <Zoom contact={contactData} /> 
      )}
      {contactData.product === "Microsoft" && (
        <Zoom contact={contactData} /> 
      )}
      <ContactPopup contactData={contactData} setContactData={setContactData} />
    </div>
  );
};

export default Page;
