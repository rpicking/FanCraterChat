import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class About extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>You have your notables now, so lets find others</Text>
        <Text>that enjoy your notables as much as you. Check out</Text>
        <Text>the map to find other SuperFans around your area </Text>
        <Text>so you can chat with our new chat feature!!!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});