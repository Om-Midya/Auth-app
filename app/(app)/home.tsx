import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useAuth } from "@/providers/AuthProvider";

const Home = () => {
  const { user, logout } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.username}!</Text>
      <Text style={styles.subtitle}>This is your home page.</Text>
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    width: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Home;
