import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

interface FormFieldProps {
  title?: string;
  value: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  onIconPress?: () => void; // 👈 added this
  otherStyles?: object;
  [key: string]: any;
}

const SearchInput: React.FC<FormFieldProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  onIconPress, // 👈 added this
  otherStyles,
  ...props
}) => {
  return (
    <View style={[styles.inputContainer, otherStyles]}>
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        secureTextEntry={title === 'Password'}
        {...props}
      />
      <TouchableOpacity style={styles.iconContainer} onPress={onIconPress}>
        <Ionicons name="search" size={24} color="#7b7b8b" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
    width: '88%',
    height: 58,
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
  },
  input: {
    flex: 1,
    color: '#000',
    fontSize: 16,
  },
  iconContainer: {
    paddingLeft: 10,
  },
});

export default SearchInput;
