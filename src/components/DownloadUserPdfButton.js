import React, { useState } from "react";
import UserPdf from "./UserPdf";
import { BlobProvider } from "@react-pdf/renderer";
import FileSaver from "file-saver";

function DownloadUserPdfButton(props) {



  return (
    <BlobProvider
      document={
        <UserPdf
          expenseData={props.expenseData}
          tourData={props.tourData}
          userData={props.userData}

        />
      }
    >
      {({ blob, url, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.message}</div>;
        return (
        
          <p className="absolute bottom-4 right-4">
            <button
              onClick={() => FileSaver.saveAs(blob, `IOS User-[${props?.userData?.userId}] Tours Report.pdf`)}
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

export default DownloadUserPdfButton;
