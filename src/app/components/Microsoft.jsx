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
      logging: true,
      ignoreElements: (el) => false,
      onclone: (clonedDoc) => {
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
    <div className={`container-micro ${dmsansfont}`}>
      <style>{`
        * {
          box-sizing: border-box;
        }
        .container-micro {
          padding: 16px;
          font-family: 'DM Sans', sans-serif;
        }
        .export-button-micro {
          margin-bottom: 16px;
          padding: 8px 24px;
          background-color: #2563eb;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }
        .pdf-page-micro {
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
        .pdf-heading-micro {
          font-size: 13px;
          font-weight: 1000;
        }
        .pdf-italic-micro {
          font-style: italic;
          font-size: 10px;
        }
        .text-block-micro {
          font-size: 10px;
          font-weight: 450;
        }
        .bold-micro {
          font-weight: 700;
        }
        .address-grid-micro {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          margin-top: 20px;
        }
        .pdf-table-micro {
          width: 100%;
          margin-top: 16px;
          font-size: 10px;
          border-spacing: 0;
        }
        .pdf-table-micro th,
        .pdf-table-micro td {
          padding: 4px;
          text-align: center;
          border-bottom: 1px solid black;
          border-right: 1px solid black;
        }
        .pdf-table-micro th:first-child,
        .pdf-table-micro td:first-child {
          border-left: 1px solid black;
        }
        .pdf-table-micro tr:first-child th {
          border-top: 1px solid black;
        }
        .pdf-table-micro tfoot td {
          font-weight: bold;
          text-align: center;
        }
        .client-signature-micro {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          margin-top:20px;
          gap:16px;
        }
        .client-details-table-micro td {
          padding: 2px 4px;
        }
        .pdf-sign-block-micro {
          text-align: right;
          border-bottom: 1px solid black;
          padding-bottom: 16px;
          display: flex;
          flex-direction: column;
          justify-content: end;
          font-size: 12px;
        }
        .client-details-table-wrapper-micro {
          width: 100%;
        }
        .client-details-table-micro {
          border-collapse: separate;
          border-spacing: 0;
          width: 100%;
          background-color: #fff;
        }
        .client-details-table-micro td {
          font-size: 10px;
          vertical-align: top;
          padding: 2px;
          line-height: 1.4;
          background-color: #fff;
          border: 1px solid black;
          border-left: none;
          border-top: none;
        }
        .client-details-table-micro tr:first-child td {
          border-top: 1px solid black;
        }
        .client-details-table-micro td:first-child {
          border-left: 1px solid black;
          font-weight: 1000;
        }
        .client-details-table-micro td:nth-child(2) {
          width: 10px;
          font-weight: normal;
        }
        .client-details-table-micro tr > td:first-child {
          font-weight: 700;
        }
        .pdf-maxw-290-micro {
          max-width: 290px;
          padding-top: 12px;
        }
        .image-micro {
          width: 200px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pdf-table-micro tfoot td:last-child {
          border-left: 1px solid black;
        }
        .pdf-footer-micro {
          font-size: 9px;
          text-align: center;
          padding-top: 40px;
          font-weight: 450;
        }
        .pdf-page-micro p {
          margin: 0;
          line-height: 1.3;
        }
      `}</style>

      <button onClick={generateFullPDF} className="export-button-micro">
        Export PDF
      </button>

      <div ref={pageRef} className="pdf-page-micro">
        <div
          className="text-block-micro"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>
            <p className="pdf-heading-micro">
              Nest Nepal Business Solutions Pvt. Ltd.
            </p>
            <p className="pdf-italic-micro">Shelter for your business</p>
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
              className="pdf-maxw-290-micro"
              style={{ margin: 0, lineHeight: "1.3" }}
            >
              <p>
                The following number must appear on all related correspondence,
                shipping papers
              </p>
              <p className="bold-micro" style={{ paddingTop: "1px" }}>
                P.O. NUMBER: 15879
              </p>
            </div>
          </div>
          <div
            className="image-micro"
            style={{ display: "flex", alignItems: "center" }}
          >
            <img src="/icon.png" alt="logo" />
          </div>
        </div>

        <div className="address-grid-micro text-block-micro">
          <div>
            <p className="bold-micro">TO:</p>
            <p style={{ marginTop: "12px", lineHeight: "1.4" }}>
              CONNEX INFORMATION <br />
              TECHNOLOGIES (PVT) LTD <br />
              NO.286, R.A.DE MEL MAWATHA, <br />
              COLOMBO 3 <br />
              SRILANKA
            </p>
          </div>
          <div>
            <p className="bold-micro">BILL TO:</p>
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
            <p className="bold-micro">SHIP TO:</p>
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
          <table className="pdf-table-micro">
            <thead>
              <tr>
                <th className="bold-micro">P.O. DATE</th>
                <th className="bold-micro">REQUISITIONER</th>
                <th className="bold-micro">SHIPPED VIA</th>
                <th className="bold-micro">SHIPPING DATE</th>
                <th className="bold-micro">TERMS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>July 12, 2025</td>
                <td>Subas Kandel</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>Credit</td>
              </tr>
            </tbody>
          </table>
        </div>

        <table className="pdf-table-micro">
          <thead>
            <tr>
              <th style={{ width: "12%" }} className="bold-micro">
                QTY
              </th>
              <th style={{ width: "12%" }} className="bold-micro">
                Duration
              </th>
              <th style={{ width: "44%" }} className="bold-micro">
                DESCRIPTION
              </th>
              <th style={{ width: "16%" }} className="bold-micro">
                UNIT PRICE
              </th>
              <th style={{ width: "16%" }} className="bold-micro">
                TOTAL
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1 License</td>
              <td>1 year</td>
              <td>Microsoft Apps For Business</td>
              <td>$88.44</td>
              <td>$88.44</td>
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
              colSpan="1"
                style={{
                  textAlign: "center",
                  position: "relative",
                  boxSizing: "border-box",
                  background: "white",
                }}
              >
                $88.44
              </td>
            </tr>
          </tfoot>
        </table>

        <div className="text-block-micro">
          <div className="client-signature-micro">
            <div className="client-details-table-wrapper-micro">
              <table className="client-details-table-micro">
                <tbody>
                  <tr>
                    <td>Company Name</td>
                    <td>:</td>
                    <td>Dinesh Dhital</td>
                  </tr>
                  <tr>
                    <td>domain name</td>
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
                    <td>44600</td>
                  </tr>
                  <tr>
                    <td>Customer Contact</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Names</td>
                    <td>:</td>
                    <td>Dinesh Dhital</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Customer Email </td>
                    <td>:</td>
                    <td>contact@nestnepal.com.np</td>
                  </tr>
                  <tr>
                    <td>Phone number</td>
                    <td>:</td>
                    <td>9851139234</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="pdf-sign-block-micro">
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

        <div className="pdf-footer-micro">
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
