import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
  FlatList,
  Animated,
  Image,
} from 'react-native';

import { CustomButton, HeaderBar } from '../components';
import { COLORS, FONTS, icons, SIZES, constants, dummyData, images } from '../constants';

import { connect } from 'react-redux';

import appTheme from '../constants/theme';

const promoTabs = constants.promoTabs.map((promoTab) => ({
  ...promoTab,
  ref: React.createRef()
}))

const TabIndicator = ({ measureLayout, scrollX }) => {

  const inputRange = promoTabs.map((_, i) => i * SIZES.width)

  const tabIndicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map(measure => measure.width)
  })

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map(measure => measure.x)
  })

  return (
    <Animated.View
      style={{
        position: 'absolute',
        height: '100%',
        width: tabIndicatorWidth,
        left: 0,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.primary,
        transform: [{
          translateX
        }]
      }}
    />
  )
}

const Tabs = ({ appTheme, scrollX, onPromoTabPress}) => {

  const [measureLayout, setMeasureLayout] = React.useState([])
  const containerRef = React.useRef()

  const tabPosition = Animated.divide(scrollX, SIZES.width)

  React.useEffect(() => {
    let ml = []

    promoTabs.forEach(promo => {
      promo.ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          console.log(x, y, width, height)

          ml.push({
            x, y, width, height
          })

          if(ml.length === promoTabs.length) {
            setMeasureLayout(ml)
          }
        }
      )
    })
  }, [containerRef.current])

  return (
    <View
      ref={containerRef}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: SIZES.padding,
        backgroundColor: COLORS.lightGray1,
        borderRadius: SIZES.radius,
      }}
    >
      {/* Tab Indicator */}
      {measureLayout.length > 0 && <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />}

      {/* Tabs */}
      {promoTabs.map((item, index) => {

        const textColor = tabPosition.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [COLORS.lightGray2, COLORS.white, COLORS.lightGray2],
          extrapolate: 'clamp'
        })

        return (
          <TouchableOpacity
            key={`PromoTab-${index}`}
            onPress={() => onPromoTabPress(index)}
          >
            <View
              ref={item.ref}
              style={{
                paddingHorizontal: 15,
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
                
              }}
            >
              <Animated.Text
                style={{
                  color: textColor,
                  ...FONTS.h3,
                }}
              >{item.title}</Animated.Text>
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const Home = ({ navigation }) => {

  const scrollX = React.useRef(new Animated.Value(0)).current

  const promoScrollViewRef = React.useRef()

  const onPromoTabPress = React.useCallback(promoTabIndex => {
    promoScrollViewRef?.current?.scrollToOffset({
      offset: promoTabIndex * SIZES.width,
    })
  })

  function renderAvailableRewards() {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          height: 100
        }}
        onPress={() => navigation.navigate('Rewards')}
      >
        {/* Rewards Cup */}
        <View
          style={{
            width: 100,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.pink,
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
          }}
        >
          <ImageBackground 
            source={icons.reward_cup}
            resizeMode='contain'
            style={{
              width: 85,
              height: 85,
              marginLeft: 3,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.transparentBlack
              }}
            >
              <Text style={{color: COLORS.white, ...FONTS.h4}}>280</Text>
            </View>
          </ImageBackground>
        </View>
        {/* Rewards Details */}
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.lightPink,
            marginLeft: -10,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              color: COLORS.primary,
              ...FONTS.h2,
              fontSize: 20,
            }}
          >Available Rewards</Text>

          <View
            style={{
              marginTop: 5,
              padding: SIZES.base,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.primary,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.body3,
              }}
            >150 points - $2.50 off</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  function renderPromoDeals() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        {/* Header -Tabs */}
        <Tabs 
          appTheme={appTheme}
          scrollX={scrollX}
          onPromoTabPress={onPromoTabPress}
        />

        {/* Details */}
        <Animated.FlatList
          ref={promoScrollViewRef}
          data={dummyData.promos}
          horizontal
          pagingEnabled={true}
          scrollEventThrottle={16}
          snapToAlignment='center'
          showHorizontalScrollIndicator={false}
          keyExtractor={item =>`${item.id}`}
          onScroll={Animated.event(
            [
              {nativeEvent: {contentOffset: {x: scrollX}}}
            ],
            {
              useNativeDriver: false    
            })}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  width: SIZES.width,
                  paddingTop: SIZES.padding,
                }}
              >
                {/* Image */}
                <Image 
                  source={images.strawberryBackground}
                  resizeMode="contain"
                  style={{ width: '100%' }}
                />
                {/* Name */}
                <Text
                  style={{
                    color: COLORS.red,
                    ...FONTS.h1,
                    fontSize: 27
                  }}
                >{item.name}</Text>
                {/* Descriptions */}
                <Text
                  style={{
                    marginTop: 3,
                    color: COLORS.white,
                    ...FONTS.body4,
                  }}
                >{item.description}</Text>
                {/* Calories */}
                <Text
                  style={{
                    marginTop: 3,
                    color: COLORS.white,
                    ...FONTS.body4
                  }}
                >{item.calories}</Text>
                {/* Button */}
                <CustomButton 
                  label="Order Now"
                  isPrimaryButton={true}
                  containerStyle={{
                    marginTop: 10,
                    paddingHorizontal: SIZES.padding,
                    paddverVertical: SIZES.base,
                    borderRadius: SIZES.radius * 2,
                  }}
                  labelStyle={{
                    ...FONTS.h3
                  }}
                  onPress={() => navigation.navigate('Location')}
                />
              </View>
            )
          }}
        />
      </View>
    )
  }

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
        contentContainerStyle={{
          paddingBottom: 150,
        }}
      >
        {/* Rewards */}
        {renderAvailableRewards()}

        {/* Promo */}
        {renderPromoDeals()}

      </ScrollView>
      

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