import React from 'react';
import { Text, StyleSheet, TouchableOpacity,Platform } from 'react-native';


export class CalculatorButton extends React.Component {
  render() {
    const { operator, handleButtonPress } = this.props;

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => handleButtonPress(operator)}
      >
        <Text style={styles.item}>
          { operator }
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth:Platform.OS ==="ios" ? 0.2 : 0.4,
    borderColor:"#c4bebe"
  },

  item: {
    color: 'black',
    fontSize: 20,
  },
});

