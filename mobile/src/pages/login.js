import React, { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";

import {
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  TextInput,
  Text,
  TouchableOpacity
} from "react-native";

import api from "../services/api";

import logo from "../assets/logo.png";

export default function Login({ navigation }) {
  const [user, setUser] = useState("");

  useEffect(() => {
    (async function verifytUser() {
      const user = await AsyncStorage.getItem("userID");
      if (user) navigation.navigate("Main", { user });
    })();
  }, []);

  async function handleLogin() {
    const response = await api.post("/devs", { username: user });

    const { _id } = response.data;

    await AsyncStorage.setItem("userID", _id);

    navigation.navigate("Main", { user: _id });
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image source={logo} />

      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Digite seu usuário no Github"
        placeholderTextColor="#999"
        onChangeText={setUser}
        style={styles.input}
      />

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  },

  input: {
    height: 46,
    alignSelf: "stretch",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    marginTop: 20,
    paddingHorizontal: 15
  },

  button: {
    height: 46,
    alignSelf: "stretch",
    backgroundColor: "#DF4723",
    borderRadius: 4,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center"
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16
  }
});
