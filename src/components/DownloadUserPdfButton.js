import React, { useState } from "react";
import UserPdf from "./UserPdf";
import { BlobProvider } from "@react-pdf/renderer";
import FileSaver from "file-saver";

function DownloadUserPdfButton(props) {
  console.log(props.expenseData);
  console.log(props.tourData);

  //   const [category, setCategory] = useState({
  //     food: 0,
  //     travel: 0,
  //     misc: 0,
  //     accomondation: 0,
  //   });
  //   let travel = 0;
  //   let food = 0;
  //   let accomondation = 0;
  //   let misc = 0;
  //   useEffect(() => {
  //     console.log(props.categoryData);
  //     // if()
  //    props.categoryData && Object.keys(props.categoryData).forEach((currentKey) => {
  //       const currentData = props.categoryData[currentKey];
  //       food += currentData.food || 0;
  //       travel += currentData.travel || 0;
  //       accomondation += currentData.acc || 0;
  //       misc += currentData.misc || 0;
  //     });

  //     setCategory({ food, travel, accomondation, misc });
  //   }, [props.categoryData]);

  //   console.log(category);
  return (
    <BlobProvider
      document={
        <UserPdf
          expenseData={props.expenseData}
          tourData={props.tourData}

        //   data={data}
        //   voucherData={props.voucherData}
        //   billsImages={props.bills}
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

export default DownloadUserPdfButton;
