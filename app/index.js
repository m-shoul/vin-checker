import {
  StyleSheet, Text, View, TouchableOpacity,
  Image, TextInput, StatusBar, Linking
} from "react-native";
import { useState } from "react";
import ImageView from "react-native-image-viewing";
import { router } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function App() {
  const [vinImageVisible, setVinImageVisible] = useState(false);
  const [isVinPressed, setIsVinPressed] = useState(true);
  const [isLicensePlatePressed, setIsLicensePlatePressed] = useState(false);
  const [vin, setVin] = useState("");
  const image = [{ uri: "https://dmv-permit-test.com/images/vin-decoder.png" }];

  // 2020 Toyota Tacoma
  const sampleVin = "5TFCZ5AN9LX225068";

  const toggleVinButton = () => {
    setIsVinPressed(true);
    setIsLicensePlatePressed(false);
  };

  const toggleLicensePlateButton = () => {
    setIsLicensePlatePressed(true);
    setIsVinPressed(false);
  };

  // Test VIN - my car
  // JF2SJADC0FG589245
  const handleVINChange = (text) => {
    setVin(text.toUpperCase());
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }} bounces={false} contentContainerStyle={{ flex: 1 }}>
      <StatusBar barStyle={"light-content"} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>VIN Check Report</Text>
        </View>
        <View style={styles.vinImageContainer}>
          <Text style={[styles.subHeadingText, { marginTop: 10, marginLeft: 10 }]}>What's a VIN?</Text>
          <TouchableOpacity onPress={() => setVinImageVisible(true)}>
            <Image
              style={styles.vinImage}
              source={require("../assets/vinDetails.png")}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.lowerContainer}>
          <Text
            style={[styles.subHeadingText, { marginBottom: 10, marginLeft: 4 }]}>Search By</Text>
          <View style={styles.toggleButtonContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, { backgroundColor: isVinPressed ? "#1976D2" : "#fbfbfb" }]}
              onPress={toggleVinButton}
            >
              <Text style={[styles.appButtonText, { color: isVinPressed ? "#fff" : "#000" }]}>VIN</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.toggleButton, { backgroundColor: isLicensePlatePressed ? "#1976D2" : "#fbfbfb" }]}
              onPress={toggleLicensePlateButton}
            >
              <Text style={[styles.appButtonText, { color: isLicensePlatePressed ? "#fff" : "#000" }]}>
                License Plate
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter VIN"
              onChangeText={handleVINChange}
            />
          </View>

          <View style={{ width: "100%", gap: 10 }}>
            <TouchableOpacity
              onPress={() => {
                if (!vin || vin.length !== 17) {
                  alert("Please enter a valid VIN number");
                  return;
                } else {
                  router.push({ pathname: "details", params: { vin: vin } })
                }
              }}
              style={styles.appButtonContainer}
            >
              <Text style={styles.appButtonText}>Check VIN</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.appButtonContainer, { backgroundColor: "#fbfbfb" }]}
              onPress={() => router.push({ pathname: "details", params: { vin: sampleVin } })}
            >
              <Text style={[styles.appButtonText, { color: "#000" }]}>Try a Sample VIN</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.lowerContainer}>
          <Text style={{ color: "#000", fontSize: 16, textAlign: "center" }}>
            This app uses the
            <Text style={{ color: "#1976D2" }}
              onPress={() => Linking.openURL('https://www.nhtsa.gov/')}> NHTSA </Text>
            API to provide you with a detailed report of your vehicle.
            The VIN check report includes information about the vehicle's specifications,
            drivetrain, and safety features.
          </Text>
        </View>

        <ImageView
          images={image}
          imageIndex={0}
          visible={vinImageVisible}
          onRequestClose={() => setVinImageVisible(false)}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  header: {
    backgroundColor: "#1976D2",
    height: 100,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 40
  },
  subHeadingText: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  vinImageContainer: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 20,
    margin: 20,
    padding: 10,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5
  },
  vinImage: {
    height: 160,
    width: "100%",
    resizeMode: "contain"
  },
  lowerContainer: {
    backgroundColor: "#fff",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 20,
    padding: 15,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5
  },
  toggleButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10
  },
  toggleButton: {
    flex: 1,
    height: 60,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  input: {
    height: 60,
    paddingLeft: 20,
    width: "100%",
    borderRadius: 20,
    fontSize: 20
  },
  inputContainer: {
    backgroundColor: "#fff",
    height: 60,
    width: "100%",
    borderRadius: 20,
    marginVertical: 20,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5
  },
  appButtonContainer: {
    backgroundColor: "#005CB2",
    height: 60,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  appButtonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center"
  },
});