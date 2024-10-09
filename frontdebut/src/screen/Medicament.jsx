import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
  } from 'react-native';
  import React, { useState } from 'react';
  import { colors } from '../utils/colors';
  import { fonts } from '../utils/fonts';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import { useNavigation } from '@react-navigation/native';
  
  const CreateMedicamentScreen = () => {
    const navigation = useNavigation();
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [dosage, setDosage] = useState('');
  
    const handleGoBack = () => {
      navigation.goBack();
    };
  
    const handleCreateMedicament = async () => {
      if (!nom || !type || !dosage) {
        Alert.alert('Erreur', 'Veuillez fournir tous les champs obligatoires : nom, type, dosage.');
        return;
      }
  
      try {
        const response = await fetch('http://192.168.1.96:8000/api/medicament/createmed', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nom,
            description,
            type,
            dosage,
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          Alert.alert('Succès', 'Médicament créé avec succès');
        } else {
          Alert.alert('Erreur', data.error || 'Une erreur est survenue lors de la création du médicament.');
        }
      } catch (error) {
        Alert.alert('Erreur', 'Une erreur inattendue est survenue.');
      }
    };
  
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
          <Ionicons name={'arrow-back-outline'} color={colors.primary} size={25} />
        </TouchableOpacity>
        <Text style={styles.headingText}>Créer un médicament</Text>
  
        <TextInput
          style={styles.input}
          placeholder="Nom du médicament"
          value={nom}
          onChangeText={setNom}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Type (ex: Comprimé, Capsule)"
          value={type}
          onChangeText={setType}
        />
        <TextInput
          style={styles.input}
          placeholder="Dosage (ex: 500mg)"
          value={dosage}
          onChangeText={setDosage}
        />
  
        <TouchableOpacity style={styles.button} onPress={handleCreateMedicament}>
          <Text style={styles.buttonText}>Créer le médicament</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      paddingTop:60,
      backgroundColor: colors.white,
    },
    backButtonWrapper: {
      marginBottom: 20,
    },
    headingText: {
      fontSize: 24,
      fontFamily: fonts.SemiBold,
      color: colors.primary,
      marginBottom: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.gray,
      borderRadius: 8,
      padding: 10,
      marginBottom: 15,
    },
    button: {
      backgroundColor: colors.primary,
      padding: 15,
      borderRadius: 8,
    },
    buttonText: {
      color: colors.white,
      fontSize: 18,
      textAlign: 'center',
      fontFamily: fonts.SemiBold,
    },
  });
  
  export default CreateMedicamentScreen;
  