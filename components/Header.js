import React from 'react'
import { StyleSheet, Text, View, Image} from 'react-native'


export default function Header(props) {
  <View>
    <Image source={require('../assets/bola.png')}/>
  </View>
  return <Text style={styles.header} {...props} />
}

const styles = StyleSheet.create({
  header: {
    fontSize: 31,
    color: 'blue',
    fontWeight: 'bold',
    paddingVertical: 12,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 50
  },
  image:{
    width: 40,
    height: 40,
  }
})
