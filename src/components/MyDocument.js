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
  Image,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import VoucherDocumentExpenseList from "./VoucherDocumentExpenseList";
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: RobotoBold,
      fontWeight: "700",
    },
    {
      src: RobotoMedium,
      fontWeight: "400",
    },
  ],
});
// Create styles
const styles = StyleSheet.create({
  titleContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Roboto",
  },
  voucherInfo: {
    margin: 5,
    border: 1,

    width: "100%",
  },
  userInfo: {
    width: "100%",
    flexDirection: "row",
  },
  nameField: {
    width: "100%",
    borderRight: 1,
    borderBottom: 1,
    padding: "5px",
    fontFamily: "Roboto",
    fontWeight: "500",
    fontSize: "15",
    // lineHeight:"1.5"
  },
  statusField: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tourDuration: {
    width: "100%",
  },
  page: {
    padding: 30,
    backgroundColor: "#ffffff",
    borderWidth: 1,
  },
  header: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Roboto",
    fontWeight: "700",
  },
  footer: {
    fontSize: 12,
    textAlign: "center",
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  section: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    color: "#555",
    lineHeight: 1.5,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
});

// Create Document Component
const MyDocument = (props) => (
  <Document>
    {console.log(
      props.voucherData,
      "expenseData",
      props.expenseData,
      "data",
      props.data
    )}
    <Page size="A4" style={styles.page}>
      <View
        style={{
          position: "absolute",
          right: 20,
          marginTop: "20",
          border: "2",
          paddingHorizontal: "15",
          paddingVertical: "7",
          flexDirection: "column",
          fontFamily: "Roboto",
        }}
      >
        <Text>Voucher No :</Text>
        <Text
          style={{ borderTop: "1px", fontFamily: "Roboto", fontSize: "13" }}
        >{`OMR/${props?.voucherData?.tourDate.split("/")[2]}/${
          props?.voucherData?.id
        }`}</Text>
      </View>
      {/* <View style={{ position: "absolute",right:20,marginTop:"50",border:"2",paddingHorizontal:"15",paddingVertical:"7",flexDirection:"row" }}>
          <Text>3444256</Text>
        </View> */}
      <View style={styles.titleContainer}>
        <Image style={styles.image} src={iosLogo} />
        <Text style={styles.header}>Tour Voucher</Text>
      </View>{" "}
      <View style={styles.voucherInfo}>
        <View style={styles.userInfo}>
          <View style={{ width: "70%" }}>
            {" "}
            <Text style={styles.nameField}>
              Name : {props.voucherData?.user?.firstName}{" "}
              {props.voucherData.user?.lastName}
            </Text>
            <Text style={styles.nameField}>
              Designation : {props.voucherData?.user?.designation}
            </Text>
            <Text style={styles.nameField}>
              Purpose : {props.voucherData?.voucherDescription?.purpose}
            </Text>
            <Text style={styles.nameField}>
              Advance Cash :{" "}
              {props.voucherData?.voucherDescription?.advanceCash}
            </Text>
            <Text
              style={{
                borderRight: "1px",
                padding: "5px",
                fontFamily: "Roboto",
                fontWeight: "500",
                fontSize: "16px",
              }}
            >
              Tour Location: {props.voucherData?.tourLocation}
            </Text>
          </View>
          <View style={{ width: "30%", textAlign: "center" }}>
            <Text style={{ borderBottom: "1px", paddingVertical: "10" }}>
              Employee Id
            </Text>
            <Text style={{ paddingVertical: "10" }}>
              OMR/ID/{props.voucherData.userId}
            </Text>
          </View>
        </View>
        <View style={styles.tourDuration}>
          <Text
            style={{
              borderTop: "1px",
              borderBottom: "1px",
              fontFamily: "Roboto",
              padding: "4px",
              textAlign: "center",
            }}
          >
            Tour Duration
          </Text>
          <View
            style={{
              width: "100%",
              fontSize: "16px",
              fontFamily: "Roboto",
              fontWeight: "500",
            }}
          >
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                borderBottom: "1px",
              }}
            >
              {" "}
              <Text
                style={{ width: "55%", borderRight: "1px", padding: "4px" }}
              >
                Departure Date :{" "}
                {props.voucherData?.voucherDescription?.departureDate}
              </Text>
              <Text style={{ padding: "4px" }}>
                Departure Time :{" "}
                {props.voucherData?.voucherDescription?.departureTime}
              </Text>
            </View>
            <View
              style={{ width: "100%", display: "flex", flexDirection: "row" }}
            >
              {" "}
              <Text
                style={{ width: "55%", borderRight: "1px", padding: "4px" }}
              >
                Arrival Date :{" "}
                {props.voucherData?.voucherDescription?.arrivalDate}
              </Text>
              <Text style={{ padding: "4px" }}>
                Arrival Time :{" "}
                {props.voucherData?.voucherDescription?.arrivalTime}
              </Text>
            </View>
            <View style={{ width: "100%" }}>
              <Text style={{ borderTop: "1px", padding: "5px" }}>
                Total Duration (hrs) :{" "}
                {props.data?.dateDifferenceInHour -
                  props.data?.tourDurationHours}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.tourDuration}>
          <Text
            style={{
              borderTop: "1px",
              borderBottom: "1px",

              padding: "4px",
              textAlign: "center",
              // fontWeight: "bold",
              fontFamily: "Roboto",
              // fontWeight: "700",
            }}
          >
            Tour DA
          </Text>
          <View style={{ width: "100%" }}>
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                borderBottom: "1px",
                fontSize: "15px",
                fontFamily: "Roboto",
                fontWeight: "500",
              }}
            >
              {" "}
              <Text
                style={{ width: "55%", borderRight: "1px", padding: "4px" }}
              >
                DA(per day) :{" "}
                {props.voucherData?.voucherDescription?.dailyAllowance}
              </Text>
              <Text style={{ padding: "4px" }}>
                DA (per hrs) :{" "}
                {props.voucherData?.voucherDescription?.dailyAllowance / 24}
              </Text>
            </View>

            <View style={{ width: "100%" }}>
              <Text
                style={{
                  padding: "4px",
                  fontSize: "15px",
                  fontFamily: "Roboto",
                  fontWeight: "500",
                }}
              >
                Total DA Calculated(rs) : {props.data?.totalDa}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.tourDuration}>
          <Text
            style={{
              borderTop: "1px",
              borderBottom: "1px",

              padding: "4px",
              textAlign: "center",
              fontFamily: "Roboto",
            }}
          >
            Expenses & Payment Method
          </Text>
          <View style={{ width: "100%", flexDirection: "row" }}>
            <View
              style={{
                width: "55%",
                display: "flex",
                flexDirection: "row",

                // borderRight: "1px",
              }}
            >
              <View
                style={{
                  width: "100%",
                  justifyContent: "space-between",
                  fontSize: "15px",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    borderBottom: "1px",
                    borderRight: "1px",
                    fontSize: "16px",
                    padding: "4px",
                    fontFamily: "Roboto",
                    // fontWeight: "500",
                  }}
                >
                  <Text style={{ width: "55%" }}> Category</Text>
                  <Text>Amount (Rs)</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    marginBottom: "4px",
                    fontFamily: "Roboto",
                    fontWeight: "500",
                  }}
                >
                  <Text style={{ width: "55%" }}> Food</Text>
                  <Text> {props.expenseData?.food}</Text>
                </View>{" "}
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    fontFamily: "Roboto",
                    fontWeight: "500",
                    marginBottom: "4px",
                  }}
                >
                  <Text style={{ width: "55%" }}> Travel</Text>
                  <Text> {props.expenseData?.travel}</Text>
                </View>{" "}
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    marginBottom: "4px",
                    fontFamily: "Roboto",
                    fontWeight: "500",
                  }}
                >
                  <Text style={{ width: "55%" }}> Accomon.</Text>
                  <Text> {props.expenseData?.accomondation}</Text>
                </View>{" "}
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    marginBottom: "4px",
                    fontFamily: "Roboto",
                    fontWeight: "500",
                  }}
                >
                  <Text style={{ width: "55%" }}> Misc</Text>
                  <Text> {props.expenseData?.Misc}</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                width: "45%",
                fontSize: "15px",
                
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  borderBottom: "1px",
                  fontSize: "17px",
                  padding: "4px",
                  fontFamily: "Roboto",
                  // fontWeight: "500",
                }}
              >
                <Text style={{ width: "50%" }}>Payment Type</Text>
                <Text>Amount (Rs)</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: "5px",
                  paddingVertical: "4px",
                  borderLeft: "1px",
                  fontFamily: "Roboto",
                  fontWeight: "500",
                }}
              >
                <Text style={{ width: "50%" }}>Cash</Text>
                <Text> {props.expenseData?.cashExpense}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  borderLeft: "1px",
                  fontFamily: "Roboto",
                  fontWeight: "500",
                }}
              >
                <View
                  style={{
                    width: "50%",
                    paddingHorizontal: "5px",
                    paddingVertical: "4px",
                    fontFamily: "Roboto",
                    fontWeight: "500",
                  }}
                >
                  <Text>credit card</Text> <Text>(office)</Text>
                </View>
                <Text> {props.expenseData?.digitalExpense}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  borderLeft: "1px",
                  fontFamily: "Roboto",
                  fontWeight: "500",
                }}
              >
                <View
                  style={{
                    width: "50%",
                    paddingHorizontal: "5px",
                    paddingVertical: "4px",
                    fontFamily: "Roboto",
                    fontWeight: "500",
                  }}
                >
                  <Text>flight/bus</Text> <Text>(office)</Text>
                </View>
                <Text> {props.expenseData?.Misc}</Text>
              </View>
            </View>
          </View>
          <View
            style={{ borderTop: "1px", padding: "4px", fontFamily: "Roboto" }}
          >
            {console.log(props?.expenseData)}
            <Text>
              Total Expenses (rs) :
              {+props.expenseData?.Misc +
                +props.expenseData?.food +
                +props.expenseData?.travel +
                +props.expenseData?.accomondation}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          margin: 5,
          border: 1,

          width: "100%",
          flexDirection: "row",
          fontFamily: "Roboto",
        }}
      >
        <Text
          style={{
            width: "50%",
            justifyContent: "center",
            marginTop: "10",
            paddingHorizontal: "10",
          }}
        >
          Payable Amount :
        </Text>
        {console.log(props?.data)}
        <View style={{ width: "50%", padding: "10" }}>
          <Text>{props.data?.settlementAmount}</Text>
        </View>
      </View>
    </Page>

    <VoucherDocumentExpenseList
      expenseList={props.voucherData}
    ></VoucherDocumentExpenseList>
    {props?.billsImages?.map((current) => {
      const imageurl = current;
      return (
        <Page>
          <Image src={imageurl}></Image>
        </Page>
      );
    })}
  </Document>
  // <PDFViewer style={{ position: "absolute", height: "400px", width: "500px" }}>
  //   {" "}

  // </PDFViewer>
);

export default MyDocument;
