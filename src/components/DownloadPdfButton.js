import { BlobProvider } from "@react-pdf/renderer";
import React from "react";
import MyDocument from "./MyDocument";
import FileSaver from "file-saver";

function DownloadPdfButton(props) {
  const expenseData = props.expenseData;
  const data = props.data;
  const voucherData = props.voucherData;
  console.log(expenseData, data,voucherData,props.bills);
  return (
    <BlobProvider
      document={
        <MyDocument
          expenseData={expenseData}
          data={data}
          voucherData={props.voucherData}
          billsImages={props.bills}
        />
      }
    >
      {({ blob, url, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.message}</div>;
        return (
          // <button onClick={() => FileSaver.saveAs(blob, "voucher.pdf")}>
          //   Download PDF
          // </button>
          <p className="absolute bottom-4 right-4">
            <button
              onClick={() => FileSaver.saveAs(blob, "voucher.pdf")}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Download Report
            </button>
          </p>
        );
      }}
    </BlobProvider>
  );
}

export default DownloadPdfButton;
