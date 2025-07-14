"use client";

import { dmsansfont } from "@/components/font/dmsans";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useRef } from "react";

const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;

export default function ZohoInvoice() {
  const pageRef = useRef(null);

  const generateFullPDF = async () => {
    const el = pageRef.current;
    if (!el) return;

    await document.fonts.ready;
    window.scrollTo(0, 0);

   const canvas = await html2canvas(el, {
     scale: 2,
     width: PAGE_WIDTH,
     height: PAGE_HEIGHT,
     useCORS: true,
     backgroundColor: "#fff",
     scrollY: -window.scrollY,
     letterRendering: true,
     allowTaint: true,
     // Add these new properties:
     logging: true, // Helps debug rendering issues
     ignoreElements: (el) => false,
     onclone: (clonedDoc) => {
       // Ensure borders are properly rendered in the clone
       clonedDoc.querySelectorAll("td, th").forEach((el) => {
         el.style.boxSizing = "border-box";
       });
     },
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
    pdf.save("zoho-invoice.pdf");
  };

  return (
    <div className={`container-end ${dmsansfont}`}>
      <style>{`
        * {
          box-sizing: border-box;
        }
        .container-end {
          padding: 16px;
          font-family: 'DM Sans', sans-serif;
        }
        .export-button-end {
          margin-bottom: 16px;
          padding: 8px 24px;
          background-color: #2563eb;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }
       .pdf-page-end {
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
        .pdf-heading-end {
          font-size: 13px;
          font-weight: 1000;
        }
        .pdf-italic-end {
          font-style: italic;
          font-size: 10px;
        }
        .text-block-end {
          font-size: 10px;
          font-weight: 450;
        }
        .bold-end {
          font-weight: 700;
        }
        .address-grid-end {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          margin-top: 20px;
        }
     .pdf-table-end {
          width: 100%;
          margin-top: 16px;
          font-size: 10px;
          border-spacing: 0;
        }
        .pdf-table-end th,
        .pdf-table-end td {
          padding: 4px;
          text-align: center;
          border-bottom: 1px solid black;
          border-right: 1px solid black;
        }
        .pdf-table-end th:first-child,
        .pdf-table-end td:first-child {
          border-left: 1px solid black;
        }
        .pdf-table-end tr:first-child th {
          border-top: 1px solid black;
        }
        .pdf-table-end tfoot td {
          font-weight: bold;
          text-align: center;
        }
        .client-signature-end {
          display: grid;
          grid-template-columns: 2fr 1fr;
          margin-top: 32px;
          gap: 20px;
        }
        .client-details-table-end td {
          padding: 2px 4px;
        }
        .pdf-sign-block-end {
          text-align: right;
          border-bottom: 1px solid black;
          padding-bottom: 16px;
        }
        .pdf-footer-end {
          font-size: 9px;
          text-align: center;
          padding-top: 40px;
          font-weight: 450;
        }
        .pdf-page-end p {
          margin: 0;
          line-height: 1.3;
        }
   .client-signature-end {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  margin-top: 32px;
}


.client-details-table-wrapper-end {
  width: 100%;
  height: fit-content;
  margin-bottom: 42px;
}

.client-details-table-end {
  border-collapse: collapse;
  width: 100%;
}

.client-details-table-end td {
  border: 1px solid black;
  font-size: 10px;
  vertical-align: top;
}

.pdf-sign-block-end {
  text-align: right;
  border-bottom: 1px solid black;
  padding-bottom: 16px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  font-size: 12px;
}

.client-details-table-wrapper-end {
  width: 100%;
  margin-bottom: 42px;
}

.client-details-table-end {
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
  background-color: #fff;
}

.client-details-table-end td {
  font-size: 10px;
  vertical-align: top;
  padding: 4px;
  line-height: 1.4;
  background-color: #fff;
  border: 1px solid black;
  border-left: none;
  border-top: none;
}

.client-details-table-end tr:first-child td {
  border-top: 1px solid black;
}

.client-details-table-end td:first-child {
  border-left: 1px solid black;
  font-weight: 1000;
}

.client-details-table-end td:nth-child(2) {
  width: 10px;
  font-weight: normal;
}

.client-details-table-end tr > td:first-child {
  font-weight: 700;
}

   .pdf-maxw-290-end {
          max-width: 290px;
          padding-top: 12px;
        }
          .image-end{
          width: 200px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;}

  .pdf-table-end tfoot td:last-child{
  border-left:1px solid black;
  }

      `}</style>

      <button onClick={generateFullPDF} className="export-button-end">
        Export PDF
      </button>

      <div ref={pageRef} className="pdf-page-end">
        <div
          className="text-block-end"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>
            <p className="pdf-heading-end">
              Nest Nepal Business Solutions Pvt. Ltd.
            </p>
            <p className="pdf-italic-end">Shelter for your business</p>
            <p style={{ marginTop: 12 }}>
              Dhobighat, Lalitpur,
              <br />
              Bagmati, Nepal
              <br />
              44600
              <br />
              Phone 9815111199
            </p>
            <div
              className="pdf-maxw-290-end"
              style={{ margin: 0, lineHeight: "1.3" }}
            >
              <p style={{ margin: 0 }}>
                The following number must appear on all related correspondence,
                shipping papers
              </p>
              <p className="bold-end" style={{ paddingTop: "1px" }}>
                P.O. NUMBER: 15795
              </p>
            </div>
          </div>
          <div
            className="image-end"
            style={{ display: "flex", alignItems: "center" }}
          >
            <img src="/icon.png" alt="logo" />
          </div>
        </div>

        <div className="address-grid-end text-block-end">
          <div>
            <p className="bold-end">TO:</p>
            <p style={{ marginTop: "12px", lineHeight: "1.4" }}>
              ZOHO CORPORATION PTE LTD
              <br />
              105 CECIL STREET, #10-04
              <br />
              THE OCTAGON SINGAPORE
              <br />
              065934
            </p>
          </div>
          <div>
            <p className="bold-end">BILL TO:</p>
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
            <p className="bold-end">SHIP TO:</p>
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
        <div style={{ paddingTop: "20px" }}>
          <table className="pdf-table-end">
            <thead>
              <tr>
                <th className="bold-end">P.O. DATE</th>
                <th className="bold-end">REQUISITIONER</th>
                <th className="bold-end">SHIPPED VIA</th>
                <th className="bold-end">SHIPPING DATE</th>
                <th className="bold-end">TERMS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>July 11, 2025</td>
                <td>Subas Kandel</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>Credit</td>
              </tr>
            </tbody>
          </table>
        </div>
        <table className="pdf-table-end">
          <thead>
            <tr>
              <th className="bold-end">QTY</th>
              <th className="bold-end">Duration</th>
              <th className="bold-end">DESCRIPTION</th>
              <th className="bold-end">UNIT PRICE</th>
              <th className="bold-end">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1 License</td>
              <td>1 year</td>
              <td>Zoho Mail lite</td>
              <td>$80.18</td>
              <td>$80.18</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td
                colSpan="4"
                style={{
                  textAlign: "right",
                  paddingRight: "8px",
                  border: "none",
                }}
              >
                TOTAL
              </td>
              <td
                style={{
                  textAlign: "center",
                  position: "relative",
                  boxSizing: "border-box",
                  background: "white",
                }}
              >
                $80.18
              </td>
            </tr>
          </tfoot>
        </table>
        <div className="text-block-end">
          <div className="client-signature-end">
            <div className="client-details-table-wrapper-end">
              <table className="client-details-table-end">
                <tbody>
                  <tr>
                    <td>Company Name</td>
                    <td>:</td>
                    <td>Dinesh Dhital</td>
                  </tr>
                  <tr>
                    <td>Primary domain name</td>
                    <td>:</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Address Line 1</td>
                    <td>:</td>
                    <td>Banasthali</td>
                  </tr>
                  <tr>
                    <td>City</td>
                    <td>:</td>
                    <td>Kathmandu</td>
                  </tr>
                  <tr>
                    <td>State</td>
                    <td>:</td>
                    <td>Bagmati</td>
                  </tr>
                  <tr>
                    <td>Zip/PostalCode</td>
                    <td>:</td>
                    <td>44700</td>
                  </tr>
                  <tr>
                    <td>Profile</td>
                    <td>:</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pdf-sign-block-end">
              <p style={{ textAlign: "left" }}>Authorized by</p>
              <p style={{ marginTop: "24px" }}>Subas Kandel</p>
              <p>
                COO
                <br />
                Nest Nepal Business Solutions
              </p>
            </div>
          </div>
        </div>

        <div className="pdf-footer-end">
          Nest Nepal Business Solutions Pvt. Ltd., Dhobighat Lalitpur, Bagmati,
          Nepal, Tel: 977-1-5917627/927,+977-9815111199
          <br />
          Noticeboard No.: 1618016917627 Email: contact@nestnepal.com, VAT No.:
          609828128, Website: www.nestnepal.com
        </div>
      </div>
    </div>
  );
}
