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
const YearlyPdf = () => (
    <PDFViewer style={{ width: "600px", height: "800px" }}>
    <Document>
      <Page size="A4" style={styles.page}>
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
            Yearly Tour Voucher Report
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
            <Text>Total Tours :</Text>
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
            <Text>Company Expenditure</Text>
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
              <Text>By Cash : </Text>
            </View>
            <View>
              <Text>By Digital Method : </Text>
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
              <Text>Food: </Text>
            </View>
            <View>
              <Text>Travel : </Text>
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
              <Text>Accomondation : </Text>
            </View>
            <View>
              <Text>Misc : </Text>
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
            <Text>Total Amount Expenditure :</Text>
          </View>
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
            <Text style={{ width: "15%", padding: "5px" }}>UserId</Text>
            <Text style={{ width: "20%", padding: "5px" }}>Tours no</Text>
            <Text style={{ width: "25%", padding: "5px" }}>
              Cash Expenses
            </Text>{" "}
            <Text style={{ width: "25%", padding: "5px" }}>
              Digital Expenses
            </Text>{" "}
            <Text style={{ width: "15%", padding: "5px" }}>Month</Text>
          </View>
          <View
            style={{ wdth: "100%", flexDirection: "row", fontSize: "14px" }}
          >
            <Text style={{ width: "15%", padding: "5px" }}>Year</Text>
            <Text style={{ width: "20%", padding: "5px" }}>Tours no</Text>
            <Text style={{ width: "25%", padding: "5px" }}>
              Cash Expenses
            </Text>{" "}
            <Text style={{ width: "25%", padding: "5px" }}>
              Digital Expenses
            </Text>
            <Text style={{ width: "15%", padding: "5px" }}>Month</Text>
          </View>
          <View
            style={{ wdth: "100%", flexDirection: "row", fontSize: "14px" }}
          >
            <Text style={{ width: "15%", padding: "5px" }}>Year</Text>
            <Text style={{ width: "20%", padding: "5px" }}>Tours no</Text>
            <Text style={{ width: "25%", padding: "5px" }}>
              Cash Expenses
            </Text>{" "}
            <Text style={{ width: "25%", padding: "5px" }}>
              Digital Expenses
            </Text>
            <Text style={{ width: "15%", padding: "5px" }}>Month</Text>
          </View>
          <View
            style={{ wdth: "100%", flexDirection: "row", fontSize: "14px" }}
          >
            <Text style={{ width: "15%", padding: "5px" }}>Year</Text>
            <Text style={{ width: "20%", padding: "5px" }}>Tours no</Text>
            <Text style={{ width: "25%", padding: "5px" }}>
              Cash Expenses
            </Text>{" "}
            <Text style={{ width: "25%", padding: "5px" }}>
              Digital Expenses
            </Text>
            <Text style={{ width: "15%", padding: "5px" }}>Month</Text>
          </View>
          <View
            style={{ wdth: "100%", flexDirection: "row", fontSize: "14px" }}
          >
            <Text style={{ width: "15%", padding: "5px" }}>Year</Text>
            <Text style={{ width: "20%", padding: "5px" }}>Tours no</Text>
            <Text style={{ width: "25%", padding: "5px" }}>
              Cash Expenses
            </Text>{" "}
            <Text style={{ width: "25%", padding: "5px" }}>
              Digital Expenses
            </Text>
            <Text style={{ width: "15%", padding: "5px" }}>Month</Text>
          </View>
          <View
            style={{ wdth: "100%", flexDirection: "row", fontSize: "14px" }}
          >
            <Text style={{ width: "15%", padding: "5px" }}>Year</Text>
            <Text style={{ width: "20%", padding: "5px" }}>Tours no</Text>
            <Text style={{ width: "25%", padding: "5px" }}>
              Cash Expenses
            </Text>{" "}
            <Text style={{ width: "25%", padding: "5px" }}>
              Digital Expenses
            </Text>
            <Text style={{ width: "15%", padding: "5px" }}>Month</Text>
          </View>
          <View
            style={{ wdth: "100%", flexDirection: "row", fontSize: "14px" }}
          >
            <Text style={{ width: "15%", padding: "5px" }}>Year</Text>
            <Text style={{ width: "20%", padding: "5px" }}>Tours no</Text>
            <Text style={{ width: "25%", padding: "5px" }}>
              Cash Expenses
            </Text>{" "}
            <Text style={{ width: "25%", padding: "5px" }}>
              Digital Expenses
            </Text>
            <Text style={{ width: "15%", padding: "5px" }}>Month</Text>
          </View>
          <View
            style={{ wdth: "100%", flexDirection: "row", fontSize: "14px" }}
          >
            <Text style={{ width: "15%", padding: "5px" }}>Year</Text>
            <Text style={{ width: "20%", padding: "5px" }}>Tours no</Text>
            <Text style={{ width: "25%", padding: "5px" }}>
              Cash Expenses
            </Text>{" "}
            <Text style={{ width: "25%", padding: "5px" }}>
              Digital Expenses
            </Text>
            <Text style={{ width: "15%", padding: "5px" }}>Month</Text>
          </View>
          <View
            style={{ wdth: "100%", flexDirection: "row", fontSize: "14px" }}
          >
            <Text style={{ width: "15%", padding: "5px" }}>Year</Text>
            <Text style={{ width: "20%", padding: "5px" }}>Tours no</Text>
            <Text style={{ width: "25%", padding: "5px" }}>
              Cash Expenses
            </Text>{" "}
            <Text style={{ width: "25%", padding: "5px" }}>
              Digital Expenses
            </Text>
            <Text style={{ width: "15%", padding: "5px" }}>Month</Text>
          </View>
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

export default YearlyPdf;
