"use client";

import { dmsansfont } from "@/components/font/dmsans";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useRef } from "react";

const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;

export default function NestNepalInvoice() {
  const pageRef = useRef(null);

  const generateFullPDF = async () => {
    const el = pageRef.current;
    if (!el) return;

    await document.fonts.ready;
    window.scrollTo(0, 0);

    const canvas = await html2canvas(el, {
      scale: 3,
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
const generatePDF = () => {
  const doc = new jsPDF();

  doc.text("My Invoice", 14, 20);

  doc.autoTable({
    head: [["QTY", "Item", "Unit Price", "Total"]],
    body: [
      ["1", "Zoom License", "$135.92", "$135.92"],
      ["1", "Zoom Whiteboard", "$21.17", "$21.17"],
    ],
    foot: [["", "", "TOTAL", "$156.09"]],
    styles: {
      fontSize: 10,
      halign: "center",
      valign: "middle",
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: "#fff",
      halign: "center",
    },
    footStyles: {
      fontStyle: "bold",
      halign: "center",
    },
    theme: "grid", // adds grid borders
    startY: 30, // start position on the page
  });

  doc.save("invoice.pdf");
};
  pdf.save("invoice.pdf");
  };

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
          font-weight: 1000;
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
  border-collapse: separate;
  border-spacing: 0;
}


.pdf-table th,
.pdf-table td {
  padding: 4px;
  text-align: center !important;
  vertical-align: middle !important;  /* Add this for vertical centering */
}
  .pdf-table td {
  display: table-cell;
  text-align: center !important;
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
          font-weight: bold;
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
          text-align: right;
          border-bottom: 1px solid black;
          padding-bottom: 16px;
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
        {/* Header */}
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
                style={{ marginTop: "2px", marginBottom: "0" }}
              >
                P.O. NUMBER: 15853
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
            <p style={{ marginTop: "12px", lineHeight: "1.4" }}>
              INFLOW TECHNOLOGIES
              <br />
              (SINGAPORE) PTE LTD
              <br />
              101 Cecil Street
              <br />
              #19-03 Tong Eng Building
              <br />
              Singapore 069533
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
            <tr>
              <th >P.O. DATE</th>
              <th>REQUISITIONER</th>
              <th>SHIPPED VIA</th>
              <th>SHIPPING DATE</th>
              <th>TERMS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>July 10, 2025</td>
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
              <th>QTY</th>
              <th>Duration</th>
              <th>DESCRIPTION</th>
              <th>UNIT PRICE</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1 License</td>
              <td>1 year</td>
              <td>Zoom One - Pro - 1 Year Prepay (PAR1-PRO-BASE-NH1Y)</td>
              <td>$135.92</td>
              <td>$135.92</td>
            </tr>
            <tr>
              <td>1 License</td>
              <td>1 year</td>
              <td>Zoom Whiteboard - Unlimited Boards - 1 Year Prepay</td>
              <td>$21.17</td>
              <td>$21.17</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td
                colSpan="4"
                className="pdf-total-cell bold"
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
                  fontWeight: "bold",
                  textAlign: "center",
                  borderRight: "1px solid black",
                  borderBottom: "1px solid black",
                  borderLeft: "1px solid black",
                }}
              >
                $156.09
              </td>
            </tr>
          </tfoot>
        </table>

        <div className="client-signature text-block">
          <div>
            <p className="bold">Client Details:</p>
            <div style={{ marginTop: "8px" }}>
              <p>Company Name: MOF IECCD</p>
              <p>Email: ieccdzoom@mof.gov.np</p>
              <p>DR: DR-185153</p>
            </div>
          </div>
          <div className="pdf-sign-block">
            <p style={{ textAlign: "left" }}>Authorized by</p>
            <div style={{ marginTop: "8px" }}>
              <p>Subas Kandel</p>
              <p>
                COO
                <br />
                Nest Nepal Business Solutions
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
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
