import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useBanksData } from "./BanksDataProvider";

const BanksList = () => {
  const { banksData, loading, error } = useBanksData();

  //SI ESTA CARGANDO LO MOSTRAMOS
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  //SI HAY ERROR LO MOSTRAMOS
  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.url }} style={styles.logo} />
      <View style={styles.info}>
        <Text style={styles.bankName}>{item.bankName}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.age}>Age: {item.age} years</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={banksData}
        renderItem={renderItem}
        keyExtractor={(item) => item.bankName}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
  },
  item: {
    flexDirection: "row",
    padding: 25,
    marginVertical: 5,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  bankName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  age: {
    fontSize: 12,
    color: "#999",
  },
});

export default BanksList;
