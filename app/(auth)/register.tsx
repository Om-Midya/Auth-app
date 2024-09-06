import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import Facebook from "@/assets/images/facebook.svg";
import Google from "@/assets/images/google.svg";
import Github from "@/assets/images/github.svg";
import Microsoft from "@/assets/images/microsoft.svg";
import { router } from "expo-router";

const Register = () => {
  const handleResgister = () => {
    if (!email || !password || !confirmPassword) {
      alert("Please Fill all the Fields");
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Register the user
    console.log("Register User", { email, password });
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>

        <View style={styles.form}>
          <View style={styles.formField}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Please enter your username"
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleResgister}
          >
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.orText}>Or Sign-up with</Text>

        <View style={styles.socialIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Facebook height={40} width={40} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Google height={40} width={40} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Github height={40} width={40} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Microsoft height={40} width={40} />
          </TouchableOpacity>
        </View>

        <View style={styles.loginPrompt}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  form: {
    width: "100%",
    maxWidth: 400,
  },
  formField: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  registerButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  orText: {
    marginVertical: 20,
    fontSize: 16,
    color: "#666",
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  iconButton: {
    marginHorizontal: 10,
  },
  loginPrompt: {
    flexDirection: "row",
    marginTop: 20,
  },
  loginText: {
    fontSize: 16,
    color: "#333",
  },
  loginLink: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default Register;
