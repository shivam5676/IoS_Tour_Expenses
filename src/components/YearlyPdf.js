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
const YearlyPdf = (props) => (
  // <PDFViewer style={{ width: "600px", height: "800px" }}>
  <Document>
    <Page size="A4" style={styles.page}>
      {" "}
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
        <View>
          <Text
            style={{
              padding: "10px",
              fontFamily: "Roboto",
              fontWeight: "bold",
            }}
          >
            Yearly Tour Voucher Report
          </Text>
          <Text  style={{
              paddingLeft: "80px",
              fontFamily: "Roboto",
              fontWeight: "bold",
              
            }}>({props.year})</Text>
        </View>
      </View>
      <View style={{ width: "100%", border: "1px", marginTop: "10px" }}>
        {/* <View
          style={{
            borderBottom: "1px",
            padding: "5px",
            fontSize: "14px",
            fontFamily: "Roboto",
            fontWeight: "bold",
          }}
        >
          <Text>Total Tours :</Text>
        </View> */}
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
            <Text>By Cash : {props?.expenseData?.cashExpense?.toFixed(2)}</Text>
          </View>
          <View>
            <Text>
              By Digital Method : {props?.expenseData?.digitalExpense?.toFixed(2)}
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
            <Text>Food: {props?.categoryData?.food?.toFixed(2)}</Text>
          </View>
          <View>
            <Text>Travel : {props?.categoryData?.travel?.toFixed(2)}</Text>
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
            <Text>Accomondation : {props?.categoryData?.accomondation?.toFixed(2)}</Text>
          </View>
          <View>
            <Text>Misc : {props?.categoryData?.misc?.toFixed(2)}</Text>
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
            {props?.expenseData?.cashExpense +
              props?.expenseData?.digitalExpense}
          </Text>
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
          <Text style={{ width: "15%", padding: "3px" }}>Month</Text>
          <Text style={{ width: "13%", padding: "3px" }}>food</Text>
          <Text style={{ width: "13%", padding: "3px" }}>travel</Text>{" "}
          <Text style={{ width: "13%", padding: "3px" }}>Accom.</Text>{" "}
          <Text style={{ width: "13%", padding: "3px" }}>misc</Text>
          <Text style={{ width: "16.5%", padding: "3px" }}>By Cash</Text>
          <Text style={{ width: "16.5%", padding: "3px" }}>By Digital</Text>
        </View>
        {props.monthExpense &&
          Object.keys(props.monthExpense).map((month) => (
            <View
              key={month}
              style={{
                wdth: "100%",
                flexDirection: "row",
                fontSize: "14px",
              }}
            >
              <Text style={{ width: "15%", padding: "3px" }}>{month}/{props.year}</Text>
              <Text style={{ width: "13%", padding: "3px" }}>
                {props.monthExpense[month].food}
              </Text>
              <Text style={{ width: "13%", padding: "3px" }}>
                {props.monthExpense[month].travel}
              </Text>
              <Text style={{ width: "13%", padding: "3px" }}>
                {props.monthExpense[month].acc}
              </Text>
              <Text style={{ width: "13%", padding: "3px" }}>
                {props.monthExpense[month].misc}
              </Text>
              <Text style={{ width: "16.5%", padding: "3px" }}>
                {props.monthExpense[month].cash}
              </Text>
              <Text style={{ width: "16.5%", padding: "3px" }}>
                {props.monthExpense[month].digital}
              </Text>
            </View>
          ))}
      </View>
    </Page>
  </Document>
  // </PDFViewer>
);

export default YearlyPdf;
