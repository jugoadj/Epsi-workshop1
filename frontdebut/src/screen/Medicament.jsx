import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';

const CreateMedicamentScreen = () => {
  const navigation = useNavigation();
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [dosage, setDosage] = useState('');

  // States for date and time pickers
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isSecondTimePickerVisible, setSecondTimePickerVisibility] = useState(false); // Pour le deuxième sélecteur de temps
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [secondTime, setSecondTime] = useState(null);
  const [frequency, setFrequency] = useState('');

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleCreateMedicament = async () => {
    if (!nom || !type || !dosage || !selectedDate || !selectedTime || !frequency) {
      Alert.alert('Erreur', 'Veuillez fournir tous les champs obligatoires.');
      return;
    }
  
    try {
      const response = await fetch('http://192.168.227.35:8000/api/medicament/createmed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom,
          description,
          type,
          dosage,
          frequencePrise: frequency,
          heuresPrise: frequency >= 2 ? [selectedTime, secondTime] : [selectedTime],
          debutPrise: selectedDate,
          finPrise: selectedEndDate,
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

  // Date picker functions
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    setSelectedDate(moment(date).format('YYYY-MM-DD'));
    hideDatePicker();
  };

  // Time picker functions
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmTime = (time) => {
    setSelectedTime(moment(time).format('HH:mm'));
    hideTimePicker();
  };

  const showSecondTimePicker = () => {
    setSecondTimePickerVisibility(true);
  };

  const hideSecondTimePicker = () => {
    setSecondTimePickerVisibility(false);
  };

  const handleConfirmSecondTime = (time) => {
    setSecondTime(moment(time).format('HH:mm'));
    hideSecondTimePicker();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        <Ionicons name={'arrow-back-outline'} color={colors.primary} size={25} />
      </TouchableOpacity>
      <Text style={styles.headingText}>Ajouter un médicament</Text>

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
      <View style={styles.input}>
        <Picker
          selectedValue={type}
          onValueChange={(itemValue) => setType(itemValue)}
          mode="dropdown"
        >
          <Picker.Item label="Sélectionner un type" value="" />
          <Picker.Item label="Comprimé" value="comprime" />
          <Picker.Item label="Capsule" value="capsule" />
          <Picker.Item label="Bouteille" value="bouteille" />
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Dosage (ex: 500mg)"
        value={dosage}
        onChangeText={setDosage}
      />

      <TouchableOpacity style={styles.input} onPress={showDatePicker}>
        <Text>{selectedDate ? `Date de prise : ${selectedDate}` : 'Sélectionner une date'}</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Nombre de fois par jour (ex: 2)"
        value={frequency}
        onChangeText={setFrequency}
        keyboardType="numeric"
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />

      <TouchableOpacity style={styles.input} onPress={showTimePicker}>
        <Text>{selectedTime ? `Heure de prise : ${selectedTime}` : 'Sélectionner une heure'}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={hideTimePicker}
      />

      {frequency >= 2 && (
        <View style={styles.timeWrapper}>
          <TouchableOpacity style={styles.inputHalf} onPress={showTimePicker}>
            <Text>{selectedTime ? `Heure 1 : ${selectedTime}` : 'Heure 1'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inputHalf} onPress={showSecondTimePicker}>
            <Text>{secondTime ? `Heure 2 : ${secondTime}` : 'Heure 2'}</Text>
          </TouchableOpacity>
        </View>
      )}

      <DateTimePickerModal
        isVisible={isSecondTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmSecondTime}
        onCancel={hideSecondTimePicker}
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
    paddingTop: 120,
    backgroundColor: colors.white,
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: colors.gray,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    fontSize: 24,
    fontFamily: fonts.SemiBold,
    color: colors.primary,
    paddingTop: 20,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  inputHalf: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    padding: 10,
    margin: 5,
  },
  timeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom:10
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
