import { BlobProvider } from "@react-pdf/renderer";
import React, { useEffect, useState, useMemo } from "react";
import FileSaver from "file-saver";
import YearlyPdf from "./YearlyPdf";

function DownloadYearReportButton(props) {
 
  const [category, setCategory] = useState({
    food: 0,
    travel: 0,
    misc: 0,
    accomondation: 0,
  });

  useEffect(() => {
    if (props.categoryData) {
      let travel = 0;
      let food = 0;
      let accomondation = 0;
      let misc = 0;

      Object.keys(props.categoryData).forEach((currentKey) => {
        const currentData = props.categoryData[currentKey];
        food += currentData.food || 0;
        travel += currentData.travel || 0;
        accomondation += currentData.acc || 0;
        misc += currentData.misc || 0;
      });

      setCategory({ food, travel, accomondation, misc });
    }
  }, [props.categoryData]);

  const pdfDocument = useMemo(
    () => (
      <YearlyPdf
        expenseData={props.expenseData}
        categoryData={category}
        monthExpense={props.categoryData}
        year={props.year}
      />
    ),
    [props.expenseData, category, props.categoryData, props.year]
  );

  return (
    <BlobProvider document={pdfDocument}>
      {({ blob, url, loading, error }) => {
        // if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.message}</div>;
        return (
          <p className="absolute bottom-4 right-4">
            <button
              onClick={() =>
                FileSaver.saveAs(
                  blob,
                  `IOS TOUR VOUCHER ${props.year}-REPORT`
                )
              }
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

export default DownloadYearReportButton;
