import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const MedicamentListScreen = () => {
  const navigation = useNavigation();
  const [medicaments, setMedicaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicaments = async () => {
      try {
        const response = await fetch('http://192.168.227.35:8000/api/medicament/allmed'); // Remplacez par votre URL API
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des médicaments');
        }
        const data = await response.json();
        setMedicaments(data); // Assurez-vous que `data` contient la liste des médicaments
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicaments();
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
    return new Date(dateString).toLocaleString('fr-FR', options);
  };

  const renderMedicament = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => console.log(item.nom)}>
      <Text style={styles.itemText}>Nom : {item.nom}</Text>
      <Text style={styles.itemText}>Description : {item.description}</Text>
      <Text style={styles.itemText}>Type : {item.type}</Text>
      <Text style={styles.itemText}>Dosage : {item.dosage}</Text>
      {item.frequencePrise && (
        <Text style={styles.itemText}>Fréquence : {item.frequencePrise} fois par jour</Text>
      )}
      {item.heuresPrise.length > 0 && (
        <Text style={styles.itemText}>
          Heures de prise : {item.heuresPrise.map(time => formatDate(time)).join(', ')}
        </Text>
      )}
      <Text style={styles.itemText}>Début de prise : {formatDate(item.debutPrise)}</Text>
      <Text style={styles.itemText}>Fin de prise : {formatDate(item.finPrise)}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        <Ionicons name={'arrow-back-outline'} color={colors.primary} size={25} />
      </TouchableOpacity>
      <Text style={styles.heading}>Mes Médicaments</Text>
      <FlatList
        data={medicaments}
        renderItem={renderMedicament}
        keyExtractor={(item) => item._id} // Utilisez _id pour les clés uniques
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
    paddingTop: 90,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
  },
  itemText: {
    fontSize: 18,
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: colors.gray,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MedicamentListScreen;
