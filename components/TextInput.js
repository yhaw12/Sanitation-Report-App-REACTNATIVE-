import React from 'react';
import { View, StyleSheet, Text, TextInput as MyTextInput } from 'react-native';

function TextInput({ error, description, ...props }) {
  return (
    <View style={styles.container}>
      <MyTextInput
        style={styles.input}
        placeholderTextColor="#999" // Customize placeholder text color
        {...props}
      />
      {description && !error ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

export default TextInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  description: {
    fontSize: 13,
    color: '#555', // Customize description text color
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: 'red',
    paddingTop: 8,
  },
});
