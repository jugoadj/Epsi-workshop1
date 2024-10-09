import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
  } from "react-native";
  import React, { useState } from "react";
  import { colors } from "../utils/colors";
  import { fonts } from "../utils/fonts";
  import Ionicons from "react-native-vector-icons/Ionicons";
  import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
  import { useNavigation, useRoute } from "@react-navigation/native";
  
  const ValidateCodeScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { email } = route.params; // Récupération de l'email passé lors de la navigation précédente
  
    const [validationCode, setValidationCode] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [password, setPassword] = useState("");
    const [tel, setTel] = useState("");
    const [adresse, setAdresse] = useState("");
    const [secureEntry, setSecureEntry] = useState(true);
    const [date_naissance, setDate_naissance] = useState(true);
  
    const handleValidateCode = async () => {
      if (!email || !validationCode || !nom || !prenom || !password || !tel || !adresse || !date_naissance) {
        Alert.alert("Erreur", "Tous les champs sont requis");
        return;
      }
  
      try {
        const response = await fetch('http://192.168.1.96:8000/api/patient/signup/code', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            validationCode,
            nom,
            prenom,
            password,
            tel,
            adresse,
            date_naissance
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          Alert.alert("Succès", data.message);
          // Rediriger vers la page de connexion
          navigation.navigate("LOGIN");
        } else {
          Alert.alert("Erreur", data.errors.message);
        }
      } catch (error) {
        Alert.alert("Erreur", "Une erreur inattendue est survenue");
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.headingText}>Validation du compte</Text>
        
        <View style={styles.formContainer}>
          {/* Champ pour le code de validation */}
          <View style={styles.inputContainer}>
            <SimpleLineIcons name="key" size={30} color={colors.secondary} />
            <TextInput
              style={styles.textInput}
              placeholder="Code de validation"
              placeholderTextColor={colors.secondary}
              keyboardType="numeric"
              value={validationCode}
              onChangeText={setValidationCode}
            />
          </View>
  
          {/* Champs pour les informations supplémentaires */}
          <View style={styles.inputContainer}>
            <SimpleLineIcons name="user" size={30} color={colors.secondary} />
            <TextInput
              style={styles.textInput}
              placeholder="Nom"
              placeholderTextColor={colors.secondary}
              value={nom}
              onChangeText={setNom}
            />
          </View>
  
          <View style={styles.inputContainer}>
            <SimpleLineIcons name="user" size={30} color={colors.secondary} />
            <TextInput
              style={styles.textInput}
              placeholder="Prénom"
              placeholderTextColor={colors.secondary}
              value={prenom}
              onChangeText={setPrenom}
            />
          </View>
  
          <View style={styles.inputContainer}>
            <SimpleLineIcons name="lock" size={30} color={colors.secondary} />
            <TextInput
              style={styles.textInput}
              placeholder="Mot de passe"
              placeholderTextColor={colors.secondary}
              secureTextEntry={secureEntry}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)}>
              <SimpleLineIcons name={secureEntry ? "eye" : "eye-off"} size={20} color={colors.secondary} />
            </TouchableOpacity>
          </View>
  
          <View style={styles.inputContainer}>
            <SimpleLineIcons name="screen-smartphone" size={30} color={colors.secondary} />
            <TextInput
              style={styles.textInput}
              placeholder="Téléphone"
              placeholderTextColor={colors.secondary}
              keyboardType="phone-pad"
              value={tel}
              onChangeText={setTel}
            />
          </View>
  
          <View style={styles.inputContainer}>
            <SimpleLineIcons name="home" size={30} color={colors.secondary} />
            <TextInput
              style={styles.textInput}
              placeholder="Adresse"
              placeholderTextColor={colors.secondary}
              value={adresse}
              onChangeText={setAdresse}
            />
          </View>
          <View style={styles.inputContainer}>
            <SimpleLineIcons name="" size={30} color={colors.secondary} />
            <TextInput
              style={styles.textInput}
              placeholder="date_naissance"
              placeholderTextColor={colors.secondary}
              value={date_naissance}
              onChangeText={setDate_naissance}
            />
          </View>
  
          {/* Bouton de validation */}
          <TouchableOpacity style={styles.loginButtonWrapper} onPress={handleValidateCode}>
            <Text style={styles.loginText}>Valider</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  export default ValidateCodeScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      padding: 20,
      paddingTop: 120,
    },
    headingText: {
      fontSize: 28,
      color: colors.primary,
      fontFamily: fonts.SemiBold,
      textAlign: "center",
      marginBottom: 20,
    },
    formContainer: {
      marginTop: 20,
    },
    inputContainer: {
      borderWidth: 1,
      borderColor: colors.secondary,
      height:60,

      borderRadius: 100,
      paddingHorizontal: 20,
      flexDirection: "row",
      alignItems: "center",
      padding: 2,
      marginVertical: 10,
    },
    textInput: {
      flex: 1,
      paddingHorizontal: 10,
      fontFamily: fonts.Light,
    },
    loginButtonWrapper: {
      backgroundColor: colors.primary,
      borderRadius: 100,
      marginTop: 20,
    },
    loginText: {
      color: colors.white,
      fontSize: 20,
      fontFamily: fonts.SemiBold,
      textAlign: "center",
      padding: 10,
    },
  });
  