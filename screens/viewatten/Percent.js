import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { AntDesign } from '@expo/vector-icons';

const initialState = [
  "AARTHE", "ABHINAV KUMAR", "AMAN SINGH", "ASHMITHA","ASWIN R", "ASWIN V","BALAMURUGANANTHAM",
  "BOGI VIJAY KUMAR",
  "CHAITANYA VARDHAN KOTE",
  "CHANDIKA SREE TEJA",
  "CHENNUPATI VENKATA UPENDRA",
  "CYRIL CHRISTOPHER B",
  "DAMALACHERUVU GOWTHAM SAI",
  "DANAPRASAD M",
  "DEEPAK M",
  "DIVAKAR J",
  "FARVESH H",
  "G ARJUN KRISHNA",
  "GANJA YUVARANI",
  "GNANAVENDANE T",
  "GOKULKRISHNA P",
  "GURUPRASAD R",
  "HARIHARAN G V",
  "HARSHAL KARIYA",
  "HRITHIN SUNIL",
  "JANGAM CHAITANYA SAI",
  "JAYARAJ POZHILAN",
  "JOSEPH G CARDOZ",
  "JYOTHI SRI SAI SWARUP NADENDLA",
  "K RAGAVI",
  "KADALI HARSHA SRI SAMPATH",
  "KALAIMATHI S",
  "KALISETTY BHARGAV NAIDU",
  "KALYAN",
  "KAMALESHKUMAR K",
  "KARAN J",
  "KATTOJU HEMANTH",
  "KAUSHIK",
  "KEERTHIVASAN",
  "KRISHNA TEJA MURIKIPUDI",
  "MADDUKURI SRIMANJUNADH",
  "MADESHVARADHAN V",
  "MALLELA SATYA MANIKYA SAHITHI",
  "MAMATHA",
  "MANCHIKALAPATI MANOJ LEKYENDRA",
  "MANGAIYARKARASI",
  "MANJULA K",
  "MANOJ S",
  "MOGINDER E",
  "MOHAMMED ABDUL BASITH",
  "MUHAMMED AJMAL SHAMEER",
  "MUPPARAPU VICTOR MATTHEW",
  "MURALIDHARAN B",
  "NANDHINI P",
  "NANDI SREE HARSHITHA",
  "NAPPINNAI",
  "NATAKARANI NAVEEN",
  "AJAYKUMAR N",
  "RIHANA M",
  "SANGADI MANIKANTHA",
];

const Percent = ({navigation}) => {


    
    const [selected,setSelected] = useState("");
    const [attendancePercentage, setAttendancePercentage] = useState(0);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    navigation.setOptions({
    title: "VIEW PERCENT",
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

 

  const handleValueChange =async(itemValue)=>{
    setSelected(itemValue);

    try {
      const response = await axios.get('http://localhost:4000/percentage', {
        params: {
          documentId: itemValue,
        },
      });
      const  attendancePercentage  = response.data.precentarray;
      setAttendancePercentage(attendancePercentage);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  }
  return (
    <SafeAreaView className='flex-1'>
      <ScrollView className="bg-slate-500 ">
    <View>

<Picker
        selectedValue={selected}
        onValueChange={handleValueChange}
      >
        <Picker.Item label="IEM" value="IEM" />
        <Picker.Item label="VLSI" value="VLSI" />
        <Picker.Item label="DCN" value="DCN" />
        <Picker.Item label="MOE" value="MOE" />
        <Picker.Item label="CSE" value="CSE" />
      </Picker>
      {loading ? (
        <Text>....Laoding</Text>
      ) : (

        <View className="pt-4">
        {initialState.map((element, index) => (
          <View key={index} className="flex flex-row border-t">
            <Text className="text-xl p-4">{element}</Text>
            <Text className="text-xl p-4 text-right">{attendancePercentage[index]}</Text>
          </View>
        ))}
        </View>
      )}
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default Percent;