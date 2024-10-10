import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PatientHomeScreen = () => {
  const navigation = useNavigation();

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  const handleLogout = async () => {
    try {
      // Suppression des informations d'authentification (par exemple, un token)
      await AsyncStorage.removeItem('token'); // Remplacez 'userToken' par la clé que vous utilisez

      // Redirigez l'utilisateur vers l'écran de connexion
      navigation.navigate('LOGIN'); // Remplacez par le nom de votre écran de connexion
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  

  return (
    <View style={styles.container}>
      {/* Titre de bienvenue */}
      <Text style={styles.title}>Bienvenue sur votre espace</Text>

      {/* Bouton de déconnexion */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Déconnexion</Text>
      </TouchableOpacity>

      {/* Blocs de navigation */}
      <TouchableOpacity
        style={styles.block}
        onPress={() => handleNavigation('MEDICAMENT')}
      >
        <Text style={styles.blockText}>Gérer mes médicaments</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.block}
        onPress={() => handleNavigation('Traitements')}
      >
        <Text style={styles.blockText}>Gérer mes traitements</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.block}
        onPress={() => handleNavigation('RendezVous')}
      >
        <Text style={styles.blockText}>Mes rendez-vous</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.block}
        onPress={() => handleNavigation('Dashboard')}
      >
        <Text style={styles.blockText}>Tableau de bord</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PatientHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  block: {
    backgroundColor: '#28b1d9',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  blockText: {
    fontSize: 18,
    color: '#fff',
  },
  logoutButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#d9534f', // Couleur de fond rouge
    padding: 10,
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logo: {
    height: 150,
    width: 150,
  },
});
