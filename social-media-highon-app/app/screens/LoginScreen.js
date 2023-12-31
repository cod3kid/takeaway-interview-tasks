import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Keyboard, Image } from "react-native";

import * as Yup from "yup";
import { Formik } from "formik";

import axios from "../utils/axiosInstance";
import { getThemeColors, lightColors, darkColors } from "../utils";
import Screen from "../components/common/Screen";
import Button from "../components/Auth/Button";
import TextField from "../components/Auth/TextField";
import { AuthContext } from "../store/auth-context";
import { LOGIN } from "../utils/api";
import Footer from "../components/Auth/Footer";

export default function LoginScreen({ navigation }) {
  const isDark = false;
  const authCtx = useContext(AuthContext);

  const [isLoaderVisible, setLoaderVisible] = useState(false);

  const {
    main,
    primary,
    dividerColor,
    darkBlueText,
    blue,
    containerColor,
    borderColor,
  } = getThemeColors(isDark);

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
      paddingBottom: 15,
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
      fontSize: 13,
    },
    getLoginHelpText: {
      color: darkBlueText,
      fontWeight: "bold",
      fontSize: 13,
    },
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Must be at least 8 characters")
      .required("Required"),
  });

  const onSubmit = async (values) => {
    const { email, password } = values;
    Keyboard.dismiss();
    setLoaderVisible(true);

    try {
      await axios
        .post(LOGIN, {
          email,
          password,
        })
        .then((response) => {
          const { user, token } = response.data;
          authCtx.authenticate({ token, user });
          setLoaderVisible(false);
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
              {isDark}
              <TextField
                primaryColor={primary}
                containerColor={containerColor}
                borderColor={borderColor}
                name="email"
                placeholder="Email"
                value={values.email}
                onChangeText={handleChange("email")}
              />
              <TextField
                primaryColor={primary}
                containerColor={containerColor}
                borderColor={borderColor}
                name="password"
                placeholder="Password"
                value={values.password}
                onChangeText={handleChange("password")}
                isPassword
                showIcon
              />
              <Button
                isLoaderVisible={isLoaderVisible}
                isValid={isValid}
                color={blue}
                primary={primary}
                inValidColor={
                  isDark ? darkColors.mediumBlue : lightColors.lightBlue
                }
                onPress={handleSubmit}
                title="Login"
              />
            </View>
          )}
        </Formik>
      </View>
      <Footer
        primaryColor={dividerColor}
        navColor={isDark ? darkColors.aceBlue : lightColors.darkBlue}
        text={"Don't have an account?"}
        navText={"Sign Up"}
        onPress={() => navigation.navigate("Register")}
      />
    </Screen>
  );
}
