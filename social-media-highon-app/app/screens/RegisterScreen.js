import React, { useState } from "react";
import { View, StyleSheet, Keyboard, Image } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import Screen from "../components/common/Screen";
import TextField from "../components/Auth/TextField";
import Button from "../components/Auth/Button";
import Footer from "../components/Auth/Footer";
import { lightColors, darkColors, getThemeColors } from "../utils/index";
import { REGISTER } from "../utils/api";

export default function RegisterScreen({ navigation }) {
  const isDark = false;
  const {
    main,
    primary,
    blue,
    containerColor,
    darkBlueText,
    dividerColor,
    borderColor,
  } = getThemeColors(isDark);
  const [isLoaderVisible, setLoaderVisible] = useState(false);

  const styles = StyleSheet.create({
    screen: {
      justifyContent: "space-between",
      backgroundColor: main,
    },
    mainContainer: {
      justifyContent: "flex-start",
      alignItems: "center",
      marginTop: 100,
    },
    formContainer: {
      width: "100%",
      padding: 30,
    },
    forgotPassContainer: {
      padding: 5,
      justifyContent: "center",
      alignItems: "center",
    },
    textContainer: {
      textAlign: "center",
    },
    forgotLoginText: {
      color: dividerColor,
    },
    getLoginHelpText: {
      color: darkBlueText,
      fontWeight: "bold",
    },
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Must be at least 8 characters")
      .required("Required"),
  });

  const onSubmit = async (values) => {
    Keyboard.dismiss();

    const { name, email, password } = values;
    setLoaderVisible(true);

    try {
      await axios
        .post(REGISTER, {
          name,
          email,
          password,
        })
        .then((response) => {
          if (response.success) {
            navigation.navigate("Login");
            setLoaderVisible(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoaderVisible(false);
        });
    } catch (ex) {
      console.warn(ex, "mui");
    }
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.mainContainer}>
        <View>
          <Image
            source={require("../../assets/icons/high-on-logo.png")}
            style={{ height: 100, width: 210, resizeMode: "cover" }}
          />
        </View>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnMount
        >
          {({ handleChange, handleSubmit, values, isValid }) => (
            <View style={styles.formContainer}>
              <TextField
                name="name"
                placeholder="Name"
                value={values.name}
                onChangeText={handleChange("name")}
                containerColor={containerColor}
                borderColor={borderColor}
                primaryColor={primary}
              />
              <TextField
                name="email"
                placeholder="Email"
                value={values.email}
                onChangeText={handleChange("email")}
                containerColor={containerColor}
                borderColor={borderColor}
                primaryColor={primary}
              />
              <TextField
                name="password"
                placeholder="Password"
                value={values.password}
                onChangeText={handleChange("password")}
                containerColor={containerColor}
                borderColor={borderColor}
                primaryColor={primary}
                isPassword
                showIcon
              />
              <Button
                isLoaderVisible={isLoaderVisible}
                isValid={isValid}
                color={blue}
                inValidColor={
                  isDark ? darkColors.mediumBlue : lightColors.lightBlue
                }
                onPress={handleSubmit}
                title={"Register"}
              />
            </View>
          )}
        </Formik>
      </View>
      <Footer
        primaryColor={dividerColor}
        navColor={isDark ? darkColors.aceBlue : lightColors.darkBlue}
        text={"Already have an account?"}
        navText={"Log in"}
        onPress={() => navigation.navigate("Login")}
      />
    </Screen>
  );
}
