import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from 'react-native';

import { HeaderBar } from '../components';
import { COLORS, SIZES } from '../constants';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <HeaderBar />
      
      <ScrollView
        style={{
          flex: 1,
          marginTop: -25,
          borderTopLeftRadius: SIZES.radius * 2,
          borderTopRightRadius: SIZES.radius * 2,
          backgroundColor: COLORS.secondary
        }}
      ></ScrollView>
      


      {/* <Text>Home</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("Rewards")}
      >
        <Text>Navigate to Rewards</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Location")}
      >
        <Text>Navigate to Locations</Text>
      </TouchableOpacity> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default Home;