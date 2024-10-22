import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import NotoSansDevanagari from "../assests/fonts/NotoSansDevanagari-VariableFont_wdth,wght.ttf";
// Register a Hindi font (e.g., Noto Sans Devanagari)
Font.register({
  family: "NotoSansDevanagari",
  src: NotoSansDevanagari,
});

// Create styles for the document
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  englishHeading: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  hindiHeading: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "NotoSansDevanagari",
  },
  paragraph: {
    marginBottom: 10,
    fontSize: 12,
  },
  listItem: {
    marginBottom: 5,
  },
  hindiText: {
    fontFamily: "NotoSansDevanagari", // Apply the registered font for Hindi
    fontSize: 12,
  },
});

// Create PDF document component
const MyDocumentManual = () => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.englishHeading}>
          Voucher Instructions
        </Text>

        {/* <Text style={styles.englishHeading}>English Instructions:</Text> */}
        <View style={styles.paragraph}>
          <Text style={styles.englishHeading}>1. Voucher Status Based on Color:</Text>
          <Text style={styles.listItem}>
            - Red Background: User needs to deposit money in the office.
          </Text>
          <Text style={styles.listItem}>
            - Green Background: Office will pay money to the user.
          </Text>
          <Text style={styles.listItem}>
            - Yellow Background: No payment is required by either the user or
            the office.
          </Text>
        </View>

        <View style={styles.paragraph}>
          <Text  style={styles.englishHeading}>2. Automatic Payment Indication:</Text>
          <Text style={styles.listItem}>
            - The voucher viewer automatically indicates whether the user or
            office needs to pay, shown in front of the final payable amount.
          </Text>
        </View>

        <View style={styles.paragraph}>
          <Text  style={styles.englishHeading}>3. Voucher Acceptance by Admin:</Text>
          <Text style={styles.listItem}>
            - The voucher must be accepted by all administrators before any
            payment (either receiving or giving money). This ensures the final
            payable amount is correct and reflects any changes to expense
            entries or daily allowances updated by the admin.
          </Text>
        </View>

        {/* <View style={styles.hindiHeading}>Instruction (हिंदी में:)</View> */}
        <View style={styles.hindiText}>
          <View>
            {" "}
            <Text style={styles.hindiHeading}>
              1. वाउचर की स्थिति रंग के आधार पर:
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listItem}>
              {" "}
              - लाल बैकग्राउंड: उपयोगकर्ता को कार्यालय में पैसे जमा करने की
              आवश्यकता है।
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listItem}>
              {" "}
              - हरा बैकग्राउंड: कार्यालय उपयोगकर्ता को पैसे देगा।
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listItem}>
              - पीला बैकग्राउंड: न तो उपयोगकर्ता को और न ही कार्यालय को भुगतान
              करने की आवश्यकता है।
            </Text>
          </View>
        </View>

        <View style={styles.hindiText}>
          <View>
            {" "}
            <Text style={styles.hindiHeading}>2. स्वचालित भुगतान संकेत:</Text>
          </View>
          <Text style={styles.listItem}>
            - वाउचर व्यूअर में स्वचालित रूप से बताया जाएगा कि किसे भुगतान करना
            है, जो अंतिम देय राशि के सामने दिखाया जाएगा।
          </Text>
        </View>

        <Text style={styles.hindiText}>
          
            {" "}
            <Text style={styles.hindiHeading}>
              3. प्रशासक द्वारा वाउचर स्वीकृति:
            </Text>
         
          <Text style={styles.listItem}>
            - किसी भी पैसे के लेन-देन से पहले, वाउचर को सभी प्रशासकों द्वारा
            स्वीकृत किया जाना चाहिए। इससे यह सुनिश्चित होता है कि अंतिम देय राशि
            सही है और खर्च प्रविष्टियों या दैनिक भत्तों में किसी भी बदलाव को
            दर्शाती है।
          </Text>
        </Text>
      </View>
    </Page>
  </Document>
);

export default MyDocumentManual;
