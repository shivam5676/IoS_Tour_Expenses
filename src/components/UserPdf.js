// MyDocument.js
import React from "react";
import iosLogo from "../assests/images/ios logo.png";
import RobotoBold from "../assests/fonts/Roboto-Bold.ttf";
import RobotoMedium from "../assests/fonts/Roboto-Medium.ttf";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
  Font,
} from "@react-pdf/renderer";
Font.register({
  family: "Roboto",
  fonts: [
    { src: RobotoBold, fontWeight: "bold" },
    {
      src: RobotoMedium,
      fontWeight: "500",
    },
  ],
});
// Create styles
const styles = StyleSheet.create({
  page: {
    // flexDirection: "row",
    backgroundColor: "#E4E4E4",
    padding: 20,
    // border:"1px"
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const UserPdf = (props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {" "}
      {console.log(props.tourData, props.expenseData)}
      <View
        style={{
          width: "100%",
          border: "1px",
          flexDirection: "row",
          height: "100px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={iosLogo}
          style={{ height: "80px", width: "80px", padding: "10px" }}
        ></Image>
        <Text
          style={{
            padding: "10px",
            fontFamily: "Roboto",
            fontWeight: "bold",
          }}
        >
          User-Wise Tour Voucher Report
        </Text>
      </View>
      <View style={{ width: "100%", border: "1px", marginTop: "10px" }}>
        <View
          style={{
            borderBottom: "1px",
            padding: "5px",
            fontSize: "14px",
            fontFamily: "Roboto",
            fontWeight: "bold",
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottom: "1px",
            }}
          >
            <Text style={{ width: "50%", paddingVertical: "5px" }}>
              Name : {props.userData.firstName} {props.userData.lastName}
            </Text>
            <Text style={{ width: "50%" }}>
              UserId : {props.userData.userId}
            </Text>
          </View>
          <Text style={{ paddingVertical: "5px" }}>
            Total Tours :{" "}
            {props.tourData ? Object.keys(props.tourData)?.length : 0}
          </Text>
        </View>
      </View>
      {props.tourData &&
        Object.keys(props.tourData).map((keys) => {
          return (
            <View style={{ border: "1px", marginTop: "10px" }}>
              {" "}
              <View
                style={{
                  marginTop: "5px",
                  borderBottom: "1px",
                  padding: "8px",
                  alignItems: "center",
                  fontFamily: "Roboto",
                  fontWeight: "bold",
                  fontSize: "20px",
                  flexDirection: "row",
                }}
              >
                <Text style={{ paddingHorizontal: "10px" }}>{keys}</Text>
                {/* <Text>Date</Text> */}
              </View>
              <View
                style={{
                  borderBottom: "1px",
                  padding: "5px",
                  flexDirection: "row",
                  fontSize: "14px",
                  fontFamily: "Roboto",
                  fontWeight: "bold",
                }}
              >
                <View style={{ width: "50%" }}>
                  <Text>By Cash : {props?.tourData[keys].cash}</Text>
                </View>
                <View>
                  <Text>
                    By Digital Method : {props?.tourData[keys].digitalExpense}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  borderBottom: "1px",
                  padding: "5px",
                  alignItems: "center",
                  fontFamily: "Roboto",
                  fontWeight: "bold",
                  fontSize: "17px",
                }}
              >
                <Text>Category Wise Expense</Text>
              </View>
              <View
                style={{
                  borderBottom: "1px",
                  padding: "5px",
                  flexDirection: "row",
                  fontSize: "14px",
                  fontFamily: "Roboto",
                  fontWeight: "bold",
                }}
              >
                <View style={{ width: "50%" }}>
                  <Text>Food: {props?.tourData[keys].food}</Text>
                </View>
                <View>
                  <Text>Travel : {props?.tourData[keys].travel}</Text>
                </View>
              </View>
              <View
                style={{
                  borderBottom: "1px",
                  padding: "5px",
                  flexDirection: "row",
                  fontSize: "14px",
                  fontFamily: "Roboto",
                  fontWeight: "bold",
                }}
              >
                <View style={{ width: "50%" }}>
                  <Text>
                    Accomondation : {props?.tourData[keys].accomondation}
                  </Text>
                </View>
                <View>
                  <Text>Misc : {props?.tourData[keys].misc}</Text>
                </View>
              </View>
              <View
                style={{
                  borderBottom: "1px",
                  padding: "5px",
                  alignItems: "Left",
                  fontFamily: "Roboto",
                  fontWeight: "bold",
                  fontSize: "17px",
                }}
              >
                <Text>
                  Total Amount Expenditure :{" "}
                  {props?.tourData[keys].travel +
                    props?.tourData[keys].accomondation +
                    props?.tourData[keys].food +
                    props?.tourData[keys].misc}
                </Text>
              </View>
              <View style={{ width: "100%", border: "1px", marginTop: "10px" }}>
                <View
                  style={{
                    wdth: "100%",
                    flexDirection: "row",
                    fontSize: "16px",
                    borderBottom: "1px",
                    fontFamily: "Roboto",
                  }}
                >
                  {" "}
                  <Text
                    style={{
                      width: "10%",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    Vou.Id
                  </Text>
                  <Text
                    style={{
                      width: "20%",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    Description
                  </Text>
                  <Text
                    style={{
                      width: "17.5%",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    Expense Type
                  </Text>
                  <Text
                    style={{
                      width: "20%",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    Amount
                  </Text>{" "}
                  <Text
                    style={{
                      width: "17.5%",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    Payment Type
                  </Text>{" "}
                  <Text
                    style={{
                      width: "15%",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    Date
                  </Text>
                </View>

                {props?.tourData[keys]?.expenseList?.map((currentExpense) => {
                  return (
                    <View
                      style={{
                        wdth: "100%",
                        flexDirection: "row",
                        fontSize: "14px",
                      }}
                    >
                      <Text
                        style={{
                          width: "10%",
                          padding: "5px",
                          textAlign: "center",
                        }}
                      >
                        {currentExpense.id}
                      </Text>
                      <Text
                        style={{
                          width: "20%",
                          padding: "5px",
                          textAlign: "center",
                        }}
                      >
                        {currentExpense.description}
                      </Text>
                      <Text
                        style={{
                          width: "17.5%",
                          padding: "5px",
                          textAlign: "center",
                        }}
                      >
                        {currentExpense.expenseType}
                      </Text>
                      <Text
                        style={{
                          width: "20%",
                          padding: "5px",
                          textAlign: "center",
                        }}
                      >
                        {currentExpense.Amount}
                      </Text>{" "}
                      <Text
                        style={{
                          width: "17.5%",
                          padding: "5px",
                          textAlign: "center",
                        }}
                      >
                        {currentExpense.paymentType}
                      </Text>
                      <Text
                        style={{
                          width: "15%",
                          padding: "5px",
                          textAlign: "center",
                        }}
                      >
                        {currentExpense.date}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
    </Page>
  </Document>
);

export default UserPdf;
