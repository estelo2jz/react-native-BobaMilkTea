import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, } from 'react-native'


import { COLORS, SIZES, FONTS, icons } from "../constants"

const HeaderBar = ({appTheme, toggleTheme}) => {

  return (
    <SafeAreaView
      style={{
        height: 150,
        width: "100%",
        backgroundColor: COLORS.purple,
        flexDirection: "row",
      }}
    >
      {/* Greetings */}
      <View style={{ flex: 1, paddingLeft: SIZES.padding, marginTop: 30,}}>
        <Text style={{color: COLORS.white, ...FONTS.h2}}>Raven,</Text>
        <Text style={{color: COLORS.white, ...FONTS.h2}}>Welcome Back!</Text>
      </View>

      {/* Toggle Button */}
      {/* <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: SIZES.padding,
          height: 40,
          borderRadius: 20,
          marginTop: 30,
          backgroundColor: COLORS.lightPurple,
        }}
      > */}
        {/* Sun */}
        {/* <View
          style={{
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            
          }}
        >
          <Image 
            source={icons.sunny}
            style={{
              height: 30,
              width: 30,
              tintcolor: COLORS.white,
            }}
          />
        </View> */}

        {/* Moon */}
        {/* <View
          style={{
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            ...styles.selectedNightModeStyle

          }}
        >
          <Image
            source={icons.night}
            style={{
              height: 30,
              width: 30,
              tintcolor: COLORS.white,
            }}
          />
        </View>
      </TouchableOpacity> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  selectedNightModeStyle: {
    borderRadius: 20,
    backgroundColor: COLORS.black
  },
  selectedLightModeStyle: {
    borderRadius: 20,
    backgroundColor: COLORS.yellow
  }
})

export default HeaderBar;
