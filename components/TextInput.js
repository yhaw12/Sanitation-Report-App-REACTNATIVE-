import React from 'react';
import { View, StyleSheet, Text, TextInput as MyTextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function TextInput({ icon, error, description, ...props }) {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon name={icon} size={20} color="#000" style={styles.icon} />
        <MyTextInput
          style={styles.input}
          placeholderTextColor="#999" 
          {...props}
        />
      </View>
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
     inputContainer: {
       flexDirection: 'row',
       alignItems: 'center',
       borderColor: 'gray',
       borderWidth: 1,
       borderRadius: 5,
       backgroundColor: '#fff',
     },
     icon: {
       paddingHorizontal: 10,
     },
     input: {
       flex: 1,
       height: 60,
       paddingHorizontal: 10,
       fontSize: 20,

     },
     description: {
       fontSize: 13,
       color: '#555',
       paddingTop: 8,
      },
      error: {
        fontSize: 17,
        color: 'red',
        paddingTop: 8,
        fontWeight: 'bold'
      },
    });