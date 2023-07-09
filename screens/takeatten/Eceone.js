import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { signInWithEmailAndPassword} from "firebase/auth"
import { FIREBASE_AUTH } from '../../firebaseConfig';

import { BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';

const adUnitId =  'ca-app-pub-7004619205587062/3757223397';


const Eceone = ({navigation}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginmsg,setLoginmsg] = useState('');


  useEffect(() => {
    navigation.setOptions({
    title: "Check CR",
    headerTitleAlign:"center",
    headerTitleStyle: {
      fontSize: 25,
      color: '#8adaf2',
    },
    headerStyle: {
      backgroundColor: '#005915'
    },

    headerLeft: () => (
      
      <TouchableOpacity
        style={{ marginLeft: 2 }}
        onPress={() => navigation.goBack()}
      ><Text>
<AntDesign name="leftcircle" size={20} color="black" /> <Text className="text-xl pb-10  ">BACK</Text></Text></TouchableOpacity>
    ),
    })
  }, [])

  
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password).then(() => {
        navigation.navigate('Eceoneatt');
      });
    } catch (error) {
      const errorCode = error.code;
      setLoginmsg(errorCode);
    }
  };



  return (
    <View className="justify-center flex-1 items-center ">
      <Text className="text-lg text-left py-4">Enter Cr's Email:</Text>
    <TextInput className="border rounded-lg py-2 px-4 min-w-[250]" placeholder="Email" value={email} onChangeText={setEmail} />
    <Text className="text-lg text-left py-4">Enter Cr's Password:</Text>
    <TextInput className="border rounded-lg py-2 px-4 min-w-[250]" placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
    <View className="py-4">
    <Button  title="Login" onPress={handleLogin} disabled={!(email==="gokulkrishna.p@pec.edu")}/>
    </View>
    <Text>{loginmsg}</Text>
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  </View>
  )
}

export default Eceone;