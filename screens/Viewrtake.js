import { View, Text,Button, SafeAreaView,Animated } from 'react-native'
import React, { useEffect } from 'react'

const Viewrtake = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
    title: "Attendence Pro",
    headerTitleAlign:"center",
    headerTitleStyle: {
      fontSize: 25,
      color: '#8adaf2',
    },
    headerStyle: {
      backgroundColor: '#005915'
    },

    

    
    })
  }, [])
  
  return (
    <SafeAreaView>
    <View className="flex items-center h-screen flex-column pt-[250]">    
     <Text className="py-2 text-2xl text-bl">ECE 2020-2024</Text>
      <Text className="py-4 text-2xl text-bl">View or Take Attendence![not Maintainted]</Text>
      <View className="flex flex-row px-20">
      <Animated.View className="w-1/3 p-2">
      <Button  onPress={()=>navigation.navigate('Selectview')} title="View" />
      </Animated.View>
      <View className="w-1/3 p-2">
      <Button  onPress={()=>navigation.navigate('Eceone')} title="Take" />
      </View>
      </View>
      
    </View>
    </SafeAreaView>
  )
}

export default Viewrtake;