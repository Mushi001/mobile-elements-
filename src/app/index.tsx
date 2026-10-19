
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Switch,
  Pressable,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  Platform,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');

  const [gender, setGender] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [isStudent, setIsStudent] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [education, setEducation] = useState('');

  const [rating, setRating] = useState(50);
  const [birthDate, setBirthDate] = useState(new Date(2008, 0, 1));
  const [selectedTime, setSelectedTime] = useState(new Date());

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);

  function toggleInterest(interest: string) {
    if (interests.includes(interest)) {
      setInterests(interests.filter((item) => item !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  }

  async function openCamera() {
    const permission =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Camera permission',
        'Please allow camera access to take a photo.'
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  }

  async function openGallery() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  }

  function handleSubmit() {
    const details = [
      'STUDENT REGISTRATION DETAILS',
      '----------------------------',
      `Name: ${name}`,
      `Email: ${email}`,
      `Password: ${'*'.repeat(password.length)}`,
      `Age: ${age}`,
      `Description: ${description}`,
      `Gender: ${gender || 'Not selected'}`,
      `Interests: ${interests.join(', ') || 'None selected'}`,
      `Student: ${isStudent ? 'Yes' : 'No'}`,
      `Newsletter: ${newsletter ? 'Subscribed' : 'Not subscribed'}`,
      `Education Level: ${education || 'Not selected'}`,
      `Satisfaction Rating: ${Math.round(rating)}/100`,
      `Birth Date: ${birthDate.toLocaleDateString()}`,
      `Preferred Time: ${selectedTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}`,
      `Photo: ${imageUri ? 'Selected' : 'Not selected'}`,
      '----------------------------',
    ].join('\n');

    console.log(details);
    Alert.alert('Form Submitted', 'Your form data has been logged.');
  }

  function handleReset() {
    setName('');
    setEmail('');
    setPassword('');
    setAge('');
    setDescription('');
    setGender('');
    setInterests([]);
    setIsStudent(false);
    setNewsletter(false);
    setEducation('');
    setRating(50);
    setBirthDate(new Date(2008, 0, 1));
    setSelectedTime(new Date());
    setShowDatePicker(false);
    setShowTimePicker(false);
    setImageUri(null);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.card}>
        <Text style={styles.title}>Student Registration</Text>
        <Text style={styles.subtitle}>
          Please complete all the information below.
        </Text>

        {/* Text input */}
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

        {/* Email input */}
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password input */}
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        {/* Numeric input */}
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />

        {/* Multiline input */}
        <Text style={styles.label}>About Yourself</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Write a short description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        {/* Radio buttons */}
        <Text style={styles.label}>Gender</Text>
        {['Male', 'Female', 'Other'].map((option) => (
          <Pressable
            key={option}
            style={styles.option}
            onPress={() => setGender(option)}
          >
            <View style={styles.radioOuter}>
              {gender === option && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.optionText}>{option}</Text>
          </Pressable>
        ))}

        {/* Checkboxes */}
        <Text style={styles.label}>Interests</Text>
        {['Programming', 'Sports', 'Music', 'Reading'].map((option) => (
          <Pressable
            key={option}
            style={styles.option}
            onPress={() => toggleInterest(option)}
          >
            <View style={styles.checkbox}>
              {interests.includes(option) && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </View>
            <Text style={styles.optionText}>{option}</Text>
          </Pressable>
        ))}

        {/* Switches */}
        <Text style={styles.label}>Are you a student?</Text>
        <View style={styles.switchRow}>
          <Text style={styles.optionText}>
            {isStudent ? 'Yes' : 'No'}
          </Text>
          <Switch
            value={isStudent}
            onValueChange={setIsStudent}
            accessibilityLabel="Are you a student?"
          />
        </View>

        <Text style={styles.label}>Receive Newsletter?</Text>
        <View style={styles.switchRow}>
          <Text style={styles.optionText}>
            {newsletter ? 'Enabled' : 'Disabled'}
          </Text>
          <Switch
            value={newsletter}
            onValueChange={setNewsletter}
            accessibilityLabel="Receive newsletter"
          />
        </View>

        {/* Dropdown */}
        <Text style={styles.label}>Education Level</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={education}
            onValueChange={(value) => setEducation(value)}
          >
            <Picker.Item
              label="Select education level"
              value=""
            />
            <Picker.Item
              label="Primary School"
              value="Primary School"
            />
            <Picker.Item
              label="Secondary School"
              value="Secondary School"
            />
            <Picker.Item
              label="University"
              value="University"
            />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>

        {/* Range slider */}
        <Text style={styles.label}>Satisfaction Rating</Text>
        <Text style={styles.ratingText}>
          {Math.round(rating)} / 100
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={rating}
          onValueChange={setRating}
          minimumTrackTintColor="#2563eb"
          maximumTrackTintColor="#d1d5db"
          thumbTintColor="#2563eb"
        />
        <View style={styles.rangeLabels}>
          <Text>0</Text>
          <Text>50</Text>
          <Text>100</Text>
        </View>

        {/* Date picker */}
        <Text style={styles.label}>Birth Date</Text>
        <View style={styles.pickerButton}>
          <Button
            title={`Choose Date: ${birthDate.toLocaleDateString()}`}
            onPress={() => setShowDatePicker(true)}
          />
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={birthDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            maximumDate={new Date()}
            onChange={(event, date) => {
              setShowDatePicker(Platform.OS === 'ios');

              if (date) {
                setBirthDate(date);
              }
            }}
          />
        )}

        {/* Time picker */}
        <Text style={styles.label}>Preferred Time</Text>
        <View style={styles.pickerButton}>
          <Button
            title={`Choose Time: ${selectedTime.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}`}
            onPress={() => setShowTimePicker(true)}
          />
        </View>

        {showTimePicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, date) => {
              setShowTimePicker(Platform.OS === 'ios');

              if (date) {
                setSelectedTime(date);
              }
            }}
          />
        )}

        {/* Camera and gallery */}
        <Text style={styles.label}>Profile Photo</Text>

        {imageUri && (
          <Image source={{ uri: imageUri }} style={styles.photo} />
        )}

        <View style={styles.photoButton}>
          <Button title="Take a Photo" onPress={openCamera} />
        </View>

        <View style={styles.photoButton}>
          <Button title="Choose from Gallery" onPress={openGallery} />
        </View>

        {imageUri && (
          <Pressable
            style={styles.removePhoto}
            onPress={() => setImageUri(null)}
          >
            <Text style={styles.removePhotoText}>Remove Photo</Text>
          </Pressable>
        )}

        {/* Submit and reset */}
        <View style={styles.submitButton}>
          <Button title="Submit Form" onPress={handleSubmit} />
        </View>

        <View style={styles.resetButton}>
          <Button
            title="Reset Form"
            color="#b91c1c"
            onPress={handleReset}
          />
        </View>
      </View>

      <Text style={styles.footer}>
        Student Registration Form • React Native
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },

  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 16,
  },

  card: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#ffffff',
    padding: 22,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1e3a8a',
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 7,
  },

  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 15,
    color: '#111827',
    backgroundColor: '#ffffff',
  },

  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
  },

  optionText: {
    fontSize: 15,
    color: '#374151',
    marginLeft: 10,
  },

  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563eb',
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: '#2563eb',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkmark: {
    color: '#2563eb',
    fontWeight: 'bold',
    fontSize: 15,
  },

  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    overflow: 'hidden',
  },

  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb',
    textAlign: 'center',
  },

  slider: {
    width: '100%',
    height: 40,
  },

  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },

  pickerButton: {
    marginVertical: 4,
  },

  photo: {
    width: 150,
    height: 150,
    borderRadius: 12,
    alignSelf: 'center',
    marginVertical: 12,
  },

  photoButton: {
    marginTop: 8,
  },

  removePhoto: {
    alignSelf: 'center',
    padding: 10,
  },

  removePhotoText: {
    color: '#b91c1c',
    fontWeight: '600',
  },

  submitButton: {
    marginTop: 28,
  },

  resetButton: {
    marginTop: 10,
  },

  footer: {
    color: '#6b7280',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 18,
  },
});
