import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';

interface FormFieldProps {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  otherStyles?: object;
  [key: string]: any;
}

const FormField: React.FC<FormFieldProps> = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
  return (
    <View style={[styles.container, otherStyles]}>
      <Text style={styles.label}>{title}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password'}
          {...props}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  inputContainer: {
    borderWidth: 2,
    borderColor: '#000',
    width: '100%',
    height: 48,
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    color: '#000',
    fontSize: 16,
  },
});

export default FormField;