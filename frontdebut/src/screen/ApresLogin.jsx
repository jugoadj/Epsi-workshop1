import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PatientHomeScreen = () => {
  const navigation = useNavigation();

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur votre espace</Text>

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
});
