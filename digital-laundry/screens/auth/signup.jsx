import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../../global/constants";

function SignUp(props) {
  const [userType, setUserType] = useState("customer");
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cnic, setCnic] = useState("");
  const [license, setLicense] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const sendCode = () => {
    setMessage("");
    axios
      .post(`${API}/verify/phone`, {
        number: phone,
        userType: userType,
      })
      .then((res) => {
        console.log(res.data.message);
        setMessage(res.data.message);
      })
      .catch((err) => console.log(err));
  };
  const submitData = async () => {
    axios
      .post(`${API}/verify/code`, {
        number: phone,
        code: otp,
        name: name,
        userType: userType,
        cnic: cnic,
        license: license,
      })
      .then((res) => {
        console.log(res.data);
        setModalVisible(false);
        if (userType === "vendor") {
          AsyncStorage.setItem("vendorId", JSON.stringify(res.data._id));
          props.navigation.navigate("VendorScreen");
        } else if (userType === "customer") {
          AsyncStorage.setItem("customerId", JSON.stringify(res.data._id));
          props.navigation.navigate("MainScreen");
        } else {
          AsyncStorage.setItem("riderId", JSON.stringify(res.data._id));
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        style={{ width: 100, height: 100 }}
        source={require("../../assets/signUp.png")}
      />
      <View style={styles.signUpView}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => {
            setName(text);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Mobile number"
          keyboardType="numeric"
          onChangeText={(text) => {
            setPhone(text);
          }}
        />
        {message !== "" ? (
          <Text style={{ color: "red" }}>{message}</Text>
        ) : null}
        <Picker
          style={styles.picker}
          selectedValue={userType}
          onValueChange={(itemValue, index) => setUserType(itemValue)}
        >
          <Picker.Item label="Customer" value="customer" />
          <Picker.Item label="Vendor" value="vendor" />
          <Picker.Item label="Rider" value="rider" />
        </Picker>
        {userType === "vendor" ? (
          <View style={styles.vendorFields}>
            <TextInput
              style={styles.input}
              placeholder="CNIC"
              onChangeText={(text) => {
                setCnic(text);
              }}
            />
          </View>
        ) : userType === "rider" ? (
          <View style={styles.vendorFields}>
            <TextInput
              style={styles.input}
              placeholder="license No."
              onChangeText={(text) => {
                setLicense(text);
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="CNIC"
              onChangeText={(text) => {
                setCnic(text);
              }}
            />
          </View>
        ) : null}

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalCenterView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Enter Code</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setOtp(text)}
              />
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => submitData()}
                >
                  <Text style={styles.textStyle}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            {
              message === "" || message === undefined
                ? setModalVisible(true)
                : setModalVisible(false);
            }
            sendCode();
          }}
        >
          <Text style={styles.textStyle}>Send Code</Text>
        </TouchableOpacity>
        <Text
          onPress={() => props.navigation.navigate("Login")}
          style={{ paddingTop: 10 }}
        >
          Already a member? Login
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  picker: {
    width: 150,
    height: 50,
  },
  input: {
    height: 30,
    margin: 10,
    width: "80%",
    borderBottomWidth: 1,
    padding: 5,
    color: "black",
  },
  signUpView: {
    flex: 0.7,
    alignItems: "center",
    marginTop: 20,
    alignSelf: "stretch",
  },
  vendorFields: {
    alignSelf: "stretch",
    alignItems: "center",
  },
  modalCenterView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 30,
    margin: 10,
    width: "80%",
    borderBottomWidth: 1,
    padding: 5,
    color: "black",
  },

  modalView: {
    margin: 20,
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: "50%",
    backgroundColor: "#3397e8",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default SignUp;
