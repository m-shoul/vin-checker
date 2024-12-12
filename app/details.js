import {
  Text, StyleSheet, View, StatusBar,
  ScrollView, ActivityIndicator, TouchableOpacity
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Details() {
  const params = useLocalSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [vinData, setVinData] = useState([]);

  const URL = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${params.vin}?format=json`;

  async function fetchVinData() {
    const response = await fetch(URL);
    const vinResponse = await response.json();
    setVinData(vinResponse);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchVinData();
  }, [])

  function getSpecification(variable) {
    return vinData.Results.find(item => item.Variable === variable)?.Value;
  }

  function SpecificationCompoment({ iconName, specificationKey, specificationValue, last }) {
    return (
      <View style={styles.specificationComponent}>
        <MaterialCommunityIcons name={iconName} size={24} color="black" />
        <View style={[styles.specificationTextContainer,
        { borderBottomWidth: !last && 1, borderColor: "#dddddd", paddingBottom: !last && 6 }]}
        >
          <Text style={[styles.specificationText, { fontWeight: "bold" }]}>{specificationKey}:</Text>
          <Text style={[styles.specificationText,
          { flexShrink: 1, textAlign: "right" }]}>{specificationValue}</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Vehicle Details</Text>
        <View style={{ opacity: 0 }}>
          <Ionicons name="chevron-back" size={30} color="white" />
        </View>
      </View>
      <View style={styles.detailsContainer}>
        {isLoading ? <ActivityIndicator size="large" color="#1976D2" style={{ flex: 1, justifyContent: "center" }} /> :
          <ScrollView contentContainerStyle={{ padding: 15, gap: 15 }} showsVerticalScrollIndicator={false}>

            <Text style={styles.groupDetailsText}>Overview</Text>
            <View style={styles.groupDetailsContainer}>
              <SpecificationCompoment iconName="car-info" specificationKey={"VIN"} specificationValue={vinData.SearchCriteria.slice(4)} />
              <SpecificationCompoment iconName="car-wrench" specificationKey={"Manufacturer \nName"} specificationValue={getSpecification("Manufacturer Name")} />
              <SpecificationCompoment iconName="earth" specificationKey={"Plant Country"} specificationValue={getSpecification("Plant Country")} last />
            </View>

            <Text style={styles.groupDetailsText}>Specifications</Text>
            <View style={styles.groupDetailsContainer}>
              <SpecificationCompoment iconName="car-clock" specificationKey={"Year"} specificationValue={getSpecification("Model Year")} />
              <SpecificationCompoment iconName="car" specificationKey={"Make"} specificationValue={getSpecification("Make")} />
              <SpecificationCompoment iconName="car" specificationKey={"Model"} specificationValue={getSpecification("Model")} />
              <SpecificationCompoment iconName="car-settings" specificationKey={"Trim"} specificationValue={getSpecification("Trim")} />
              <SpecificationCompoment iconName="car-cog" specificationKey={"Vehicle Type"} specificationValue={getSpecification("Vehicle Type")} />
              <SpecificationCompoment iconName="car" specificationKey={"Body Class"} specificationValue={getSpecification("Body Class")} />
              <SpecificationCompoment iconName="car-door" specificationKey={"Doors"} specificationValue={getSpecification("Doors")} last />
            </View>

            <Text style={styles.groupDetailsText}>Towing</Text>
            <View style={styles.groupDetailsContainer}>
              <SpecificationCompoment iconName="truck-trailer" specificationKey={"Gross Vehicle \nWeight Rating \nFrom"} specificationValue={getSpecification("Gross Vehicle Weight Rating From")} last />
            </View>

            <Text style={styles.groupDetailsText}>Drivetrain</Text>
            <View style={styles.groupDetailsContainer}>
              <SpecificationCompoment iconName="car-shift-pattern" specificationKey={"Transmission \nStyle"} specificationValue={getSpecification("Transmission Style")} />
              <SpecificationCompoment iconName="tire" specificationKey={"Drive Type"} specificationValue={getSpecification("Drive Type")} />
              <SpecificationCompoment iconName="engine" specificationKey={"Engine Number \nof Cylinders"} specificationValue={getSpecification("Engine Number of Cylinders")} />
              <SpecificationCompoment iconName="engine" specificationKey={"Engine \nConfiguration"} specificationValue={getSpecification("Engine Configuration")} />
              <SpecificationCompoment iconName="gas-station" specificationKey={"Fuel Type"} specificationValue={getSpecification("Fuel Type - Primary")} />
              <SpecificationCompoment iconName="car-turbocharger" specificationKey={"Turbo"} specificationValue={getSpecification("Turbo")} last />
            </View>

            <Text style={styles.groupDetailsText}>Safety</Text>
            <View style={styles.groupDetailsContainer}>
              <SpecificationCompoment iconName="seatbelt" specificationKey={"Seat Belt Type"} specificationValue={getSpecification("Seat Belt Type")} />
              <SpecificationCompoment iconName="airbag" specificationKey={"Curtain Air \nBag Locations"} specificationValue={getSpecification("Curtain Air Bag Locations")} />
              <SpecificationCompoment iconName="airbag" specificationKey={"Front Air \nBag Locations"} specificationValue={getSpecification("Front Air Bag Locations")} />
              <SpecificationCompoment iconName="airbag" specificationKey={"Knee Air \nBag Locations"} specificationValue={getSpecification("Knee Air Bag Locations")} />
              <SpecificationCompoment iconName="airbag" specificationKey={"Side Air \nBag Locations"} specificationValue={getSpecification("Side Air Bag Locations")} last />
            </View>
          </ScrollView>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  header: {
    backgroundColor: "#1976D2",
    height: 100,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 40,
    paddingHorizontal: 10
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold"
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 20,
    margin: 20,
    marginBottom: 35,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5
  },
  specificationScrollView: {
    flexGrow: 1
  },
  specificationComponent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  specificationTextContainer: {
    flex: 1,
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  specificationText: {
    fontSize: 18
  },
  groupDetailsContainer: {
    backgroundColor: "#fbfbfb",
    borderRadius: 15,
    gap: 6,
    padding: 10,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  groupDetailsText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: -10,
    marginLeft: 10,
    marginTop: 6
  }
})