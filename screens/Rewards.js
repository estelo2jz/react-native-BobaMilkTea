import React from 'react';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  StyleSheet
} from 'react-native';

import { HeaderBar, CustomButton } from '../components';
import { dummyData, COLORS, FONTS, SIZES, icons } from '../constants';

import { connect } from 'react-redux'; 

const Rewards = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <HeaderBar />

      {/* Details */}
      <FlatList 
        style={{
          marginTop: -25,
          borderTopLeftRadius: SIZES.radius * 2,
          borderTopRightRadius: SIZES.radius * 2,
          backgroundColor: COLORS.lightGray2
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default Rewards;