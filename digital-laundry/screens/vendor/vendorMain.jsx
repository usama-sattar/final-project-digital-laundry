import React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ProductConsumer } from "../../context";

function VendorMain({ navigation }) {
  return (
    <ProductConsumer>
      {(value) => {
        return (
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={require("../../assets/vendor-screen.png")}
            />
            <Text style={{ fontSize: 20 }}>Vendor</Text>
            <View style={styles.cardHolder}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#dfe1ee",
                  width: "50%",
                  flexBasis: "45%",
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 5,
                }}
              >
                <Text style={[styles.textStyle, { color: "black" }]}>
                  Pending Orders
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "#dfe1ee",
                  width: "50%",
                  flexBasis: "45%",
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 5,
                }}
              >
                <Text style={[styles.textStyle, { color: "black" }]}>
                  Fullfilled Orders
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "#dfe1ee",
                  width: "50%",
                  flexBasis: "45%",
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 5,
                }}
                onPress={() => {
                  value.Logout();
                  navigation.navigate("Login");
                }}
              >
                <Text style={styles.textStyle}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
    </ProductConsumer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  cardHolder: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  textStyle: {
    color: "#ee786c",
    fontSize: 15,
  },
  image: {
    width: "100%",
    height: "50%",
  },
});
export default VendorMain;
