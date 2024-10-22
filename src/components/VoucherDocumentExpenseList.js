import { Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    color: "black",
  },
  section: {
    border: 1,
    width: "100%",
  },
});

const VoucherDocumentExpenseList = (props) => {

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View
          style={{
            flexDirection: "row",
            fontSize: "15",
            fontFamily: "Roboto",
            padding: "5",
            borderBottom: "1",
          }}
        >
          <Text style={{ width: "25%" }}>Description</Text>
          <Text style={{ width: "15%" }}>Expense Type</Text>
          <Text style={{ width: "15%" }}>payment Type</Text>
          <Text style={{ width: "15%" }}>Amount</Text>
          <Text style={{ width: "15%" }}>Bill No</Text>
          <Text style={{ width: "15%" }}>Date</Text>
        </View>
        {props.expenseList?.voucherExpenses?.map((current) => {
          return (
            <View
              style={{
                flexDirection: "row",
                fontSize: "13",
                fontFamily: "Roboto",
                fontWeight: "500",
                padding: "5",
              }}
            >
              <Text style={{ width: "25%", paddingHorizontal: "3px" }}>
                {current.description}
              </Text>
              <Text style={{ width: "15%", paddingHorizontal: "3px" }}>
                {current.expenseType}
              </Text>
              <Text style={{ width: "15%", paddingHorizontal: "3px" }}>
                {current.paymentType}
              </Text>
              <Text style={{ width: "15%", paddingHorizontal: "3px" }}>
                {current.Amount}
              </Text>
              <Text style={{ width: "15%", paddingHorizontal: "3px" }}>
                {current.voucherNo}
              </Text>
              <Text style={{ width: "15%", paddingHorizontal: "3px" }}>
                {current.date}
              </Text>
            </View>
          );
        })}
      </View>
    </Page>
  );
};

export default VoucherDocumentExpenseList;
