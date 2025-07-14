"use client";

import { dmsansfont } from "@/components/font/dmsans";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useRef } from "react";

const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;

export default function NestNepalInvoice({ contact }) {
  const pageRef = useRef(null);

  const generateFullPDF = async () => {
    const el = pageRef.current;
    if (!el) return;

    await document.fonts.ready;
    window.scrollTo(0, 0);

    const canvas = await html2canvas(el, {
      scale: 3, // reduced for better visual fidelity
      width: PAGE_WIDTH,
      height: PAGE_HEIGHT,
      useCORS: true,
      backgroundColor: "#fff",
      scrollY: -window.scrollY,
    });

    const pdf = new jsPDF("p", "pt", "a4");
    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      PAGE_WIDTH,
      PAGE_HEIGHT,
      undefined,
      "FAST"
    );
    pdf.save("invoice.pdf");
  };
const todayNepal = new Date().toLocaleDateString("en-US", {
  timeZone: "Asia/Kathmandu",
  year: "numeric",
  month: "long",
  day: "numeric",
});

  return (
    <div className={`container ${dmsansfont}`}>
      <style>
        {`
        * {
          box-sizing: border-box;
        }

        .container {
          padding: 16px;
          font-family: 'DM Sans', sans-serif;
        }

        .export-button {
        position:fixed;
        top:20px;
        left:20px;
          margin-bottom: 16px;
          padding: 8px 24px;
          background-color: #2563eb;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .export-button:hover {
          background-color: #1d4ed8;
        }

        .pdf-page {
          background-color: white;
          color: black;
          font-size: 10px;
          width: ${PAGE_WIDTH}px;
          height: ${PAGE_HEIGHT}px;
          margin: 0 auto;
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .pdf-heading {
          font-size: 13px;
          font-weight: 1000;
        }

        .pdf-italic {
          font-style: italic;
          font-size: 10px;
        }

        .text-block {
          font-size: 10px;
          font-weight: 450;
        }

        .bold {
          font-weight: 700 !important;
        }

        .pdf-maxw-290 {
          max-width: 290px;
          padding-top: 12px;
        }

        .address-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          padding: 20px 0;
        }

    .pdf-table {
  width: 100%;
  margin-top: 16px;
  font-size: 10px;
  border-spacing: 0; /* no collapse, but remove spacing */
}

.pdf-table td,
.pdf-table th {
  height: 25px;
  line-height: 25px;
  padding: 0;
  // padding-bottom: 5px;
  text-align: center;
  vertical-align: middle
  font-size: 10px;
  border-bottom: 1px solid black;
  border-right: 1px solid black;

}


/* Top border */
.pdf-table tr:first-child th {
  border-top: 1px solid black;
}

/* Left border */
.pdf-table th:first-child,
.pdf-table td:first-child {
  border-left: 1px solid black;
}

/* Right border */
.pdf-table th:last-child,
.pdf-table td:last-child {
  border-right: 1px solid black;
}

/* Bottom border */
.pdf-table tr:last-child td {
  border-bottom: 1px solid black;
}

/* Middle borders */
.pdf-table th,
.pdf-table td {
  border-bottom: 1px solid black;
  border-right: 1px solid black;
}
        .pdf-table tfoot td {
          font-weight: 450;
          text-align: center;
        }
        .pdf-total-label {
          text-align: right;
          padding-right: 8px;
        }
        .client-signature {
          display: grid;
          grid-template-columns: 1fr 1fr;
          margin-top: 32px;
          gap: 20px;
        }
        .pdf-sign-block {
        display:flex;
        flex-direction:column;
        justify-content:end;

          text-align: right;
          border-bottom: 1px solid black;
          padding-bottom: 32px;
        }
        .pdf-footer {
          font-size: 9px;
          text-align: center;
          padding-top: 32px;
          font-weight: 450;
        }
        .client-signature p {
          margin: 0;
          line-height: 1.4;
        }
          .pdf-page p {
  margin: 0;
  line-height: 1.3;
}
  .image{
  width: 200px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;}
      `}
      </style>

      <button onClick={generateFullPDF} className="export-button">
        Export PDF
      </button>

      <div ref={pageRef} className="pdf-page">
        <div
          className="text-block"
          style={{
            marginBottom: "8px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div className="leading" style={{ margin: 0, lineHeight: "1.2" }}>
              <p
                className="pdf-heading"
                style={{ margin: 0, lineHeight: "1.2" }}
              >
                Nest Nepal Business Solutions Pvt. Ltd.
              </p>
              <p className="pdf-italic">Shelter for your business</p>
            </div>
            <div
              style={{ marginTop: "12px", fontSize: "10px", lineHeight: "1.4" }}
            >
              <p>
                Dhobighat, Lalitpur,
                <br />
                Bagmati, Nepal
                <br />
                44600
                <br />
                Phone 9815111199
              </p>
            </div>
            <div
              className="pdf-maxw-290"
              style={{ margin: 0, lineHeight: "1.3" }}
            >
              <p style={{ margin: 0 }}>
                The following number must appear on all related correspondence,
                shipping papers
              </p>
              <p
                className="bold"
                style={{ paddingTop: "1px", marginBottom: "0" }}
              >
                P.O. NUMBER: {contact.poNumber}
              </p>
            </div>
          </div>
          <div className="image">
            <img src="/icon.png" alt="logo" />
          </div>
        </div>
        <div className="address-grid text-block">
          <div>
            <p className="bold">TO:</p>
            <p
              style={{
                marginTop: "12px",
                lineHeight: "1.4",
                whiteSpace: "pre-line",
              }}
            >
              {contact.address ||
                `INFLOW TECHNOLOGIES\n(SINGAPORE) PTE LTD\n101 Cecil Street\n#19-03 Tong Eng Building\nSingapore 069533`}
            </p>
          </div>
          <div>
            <p className="bold">BILL TO:</p>
            <p style={{ marginTop: "12px", lineHeight: "1.4" }}>
              NEST NEPAL BUSINESS SOLUTIONS PVT. LTD
              <br />
              DHOBIGHAT, LALITPUR,
              <br />
              BAGMATI, NEPAL
              <br />
              44600
            </p>
          </div>
          <div>
            <p className="bold">SHIP TO:</p>
            <p style={{ marginTop: "12px", lineHeight: "1.4" }}>
              NEST NEPAL BUSINESS SOLUTIONS PVT. LTD
              <br />
              DHOBIGHAT, LALITPUR,
              <br />
              BAGMATI, NEPAL
              <br />
              44600
            </p>
          </div>
        </div>

        <table className="pdf-table">
          <thead>
            <tr className="bold">
              <th className="bold">P.O. DATE</th>
              <th className="bold">REQUISITIONER</th>
              <th className="bold">SHIPPED VIA</th>
              <th className="bold">SHIPPING DATE</th>
              <th className="bold">TERMS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{todayNepal}</td>
              <td>Subas Kandel</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>Pre-Payment</td>
            </tr>
          </tbody>
        </table>
        <table className="pdf-table">
          <thead>
            <tr>
              <th className="bold">QTY</th>
              <th className="bold">Duration</th>
              <th className="bold">DESCRIPTION</th>
              <th className="bold">UNIT PRICE</th>
              <th className="bold">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {contact.items?.map((item, index) => (
              <tr key={index}>
                <td
                  style={{
                    lineHeight: "height",
                  }}
                >
                  {item.qty} License
                </td>
                <td>{item.duration} year</td>
                <td>{item.description}</td>
                <td>${item.unitPrice.toFixed(2)}</td>
                <td>${item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td
                colSpan="4"
                className="pdf-total-cell "
                style={{
                  textAlign: "right",
                  border: "none",
                  paddingRight: "8px",
                }}
              >
                TOTAL
              </td>
              <td
                style={{
                  textAlign: "center",
                  borderRight: "1px solid black",
                  borderBottom: "1px solid black",
                  borderLeft: "1px solid black",
                }}
              >
                $
                {contact.items
                  ?.reduce((sum, item) => sum + item.total, 0)
                  .toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>

        <div className="client-signature text-block">
          <div>
            <p className="bold">Client Details:</p>
            <div style={{ marginTop: "8px" }}>
              {contact.product === "Zoom" && (
                <>
                  <p>
                    <span className="bold">Company Name:</span>{" "}
                    {contact.companyName}
                  </p>
                  <p>
                    <span className="bold">Email:</span> {contact.email}
                  </p>
                  <p>
                    <span className="bold">DR:</span> {contact.dr}
                  </p>
                </>
              )}

              {contact.product === "Zoho" && (
                <>
                  <p>
                    <span className="bold">Company Name:</span>{" "}
                    {contact.companyName}
                  </p>
                  <p>
                    <span className="bold">Primary Domain:</span>{" "}
                    {contact.primaryDomain}
                  </p>
                  <p>
                    <span className="bold">Address Line 1:</span>{" "}
                    {contact.addressLine1}
                  </p>
                  <p>
                    <span className="bold">City:</span> {contact.city}
                  </p>
                  <p>
                    <span className="bold">State:</span> {contact.state}
                  </p>
                  <p>
                    <span className="bold">Zip Code:</span> {contact.zipCode}
                  </p>
                  <p>
                    <span className="bold">Profile:</span> {contact.profile}
                  </p>
                </>
              )}

              {contact.product === "Microsoft" && (
                <>
                  <p>
                    <span className="bold">Company Name:</span>{" "}
                    {contact.companyName}
                  </p>
                  <p>
                    <span className="bold">Primary Domain:</span>{" "}
                    {contact.primaryDomain}
                  </p>
                  <p>
                    <span className="bold">Address Line 1:</span>{" "}
                    {contact.addressLine1}
                  </p>
                  <p>
                    <span className="bold">City:</span> {contact.city}
                  </p>
                  <p>
                    <span className="bold">State:</span> {contact.state}
                  </p>
                  <p>
                    <span className="bold">Zip Code:</span> {contact.zipCode}
                  </p>
                  <p>
                    <span className="bold">Customer Contact:</span>{" "}
                    {contact.contactPerson}
                  </p>
                  <p>
                    <span className="bold">Email:</span> {contact.email}
                  </p>
                  <p>
                    <span className="bold">Phone:</span> {contact.phone}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="pdf-sign-block">
            <p style={{ textAlign: "left" }}>Authorized by</p>
            <div style={{ marginTop: "24px" }}>
              <p>Subas Kandel</p>
              <p>
                COO
                <br />
                Nest Nepal Business Solutions
              </p>
            </div>
          </div>
        </div>

        <div className="pdf-footer">
          Nest Nepal Business Solutions Pvt. Ltd., Dhobighat Lalitpur, Bagmati,
          Nepal, Tel: 977-1-5917627/927,+977-9815111199
          <br />
          Noticeboard No.: 1618015917627 Email: contact@nestnepal.com, VAT No.:
          609828128, Website: www.nestnepal.com
        </div>
      </div>
    </div>
  );
}
