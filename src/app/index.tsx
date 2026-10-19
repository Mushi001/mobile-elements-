
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
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');
  const [gender, setGender] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [isStudent, setIsStudent] = useState(false);
  const [education, setEducation] = useState('');

  function toggleInterest(interest: string) {
    if (interests.includes(interest)) {
      setInterests(interests.filter(item => item !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  }

  
function handleSubmit() {
  console.log(`
Student Registration Details
----------------------------
Name: ${name}
Email: ${email}
Password: ${'*'.repeat(password.length)}
Age: ${age}
Description: ${description}
Gender: ${gender}
Interests: ${interests.join(', ')}
Student: ${isStudent ? 'Yes' : 'No'}
Education Level: ${education}
----------------------------
  `);
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
    setEducation('');
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Student Registration Form</Text>

      <Text>Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text>Age:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <Text>About yourself:</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Write a short description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text>Gender:</Text>
      {['Male', 'Female', 'Other'].map(option => (
        <Pressable
          key={option}
          style={styles.option}
          onPress={() => setGender(option)}
        >
          <Text>
            {gender === option ? '(●)' : '( )'} {option}
          </Text>
        </Pressable>
      ))}

      <Text>Interests:</Text>
      {['Programming', 'Sports', 'Music'].map(option => (
        <Pressable
          key={option}
          style={styles.option}
          onPress={() => toggleInterest(option)}
        >
          <Text>
            {interests.includes(option) ? '[✓]' : '[ ]'} {option}
          </Text>
        </Pressable>
      ))}

      <Text>Are you a student?</Text>
      <View style={styles.switchRow}>
        <Text>{isStudent ? 'Yes' : 'No'}</Text>
        <Switch
          value={isStudent}
          onValueChange={setIsStudent}
        />
      </View>

      <Text>Education Level:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={education}
          onValueChange={setEducation}
        >
          <Picker.Item label="Select education level" value="" />
          <Picker.Item
            label="Secondary School"
            value="Secondary School"
          />
          <Picker.Item label="University" value="University" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      <View style={styles.button}>
        <Button title="Submit Form" onPress={handleSubmit} />
      </View>

      <View style={styles.button}>
        <Button title="Reset Form" onPress={handleReset} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 8,
    marginTop: 5,
    marginBottom: 12,
  },
  multiline: {
    height: 80,
    textAlignVertical: 'top',
  },
  option: {
    paddingVertical: 6,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#999',
    marginVertical: 8,
  },
  button: {
    marginVertical: 6,
  },
});
