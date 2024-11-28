import { View, Text, SafeAreaView, Animated, Button } from 'react-native'
import React from 'react';

import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';


const adUnitId =  'ca-app-pub-7004619205587062/3757223397';

const Select = ({navigation}) => {


  return (
    <SafeAreaView>
    <View className="flex items-center h-screen flex-column pt-[250]">
      <Text className="py-6 text-2xl text-bl">Select Your Option:</Text>
      <View className="flex flex-row px-20">
      <Animated.View className="w-2/3 p-2">
      <Button   onPress={()=>navigation.navigate('Viewone')} title="View date wise" />
      </Animated.View>
      <View className="w-2/3 p-2 pb-[200]">
      <Button  onPress={()=>navigation.navigate('Percent')} title="View Percentage" />
      </View>
      </View>
      <BannerAd
      
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
    </View>
  
    </SafeAreaView>
  )
}

export default Select;