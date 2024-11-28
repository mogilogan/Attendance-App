import { View, Text, TextInput, Button, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import React, {  useEffect, useState } from 'react'
import {  collection , doc as doccc, setDoc, getDoc} from 'firebase/firestore'
import { useRoute } from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker';
import { FIRESTORE_DB } from '../../firebaseConfig';
import { AntDesign } from '@expo/vector-icons';

const initialState = {
    "AARTHE": 'present', "ABHINAV KUMAR": 'present', "AMAN SINGH": 'present', "ASHMITHA": 'present',"ASWIN R": 'present', "ASWIN V": 'present',"BALAMURUGANANTHAM": 'present',"BOGI VIJAY KUMAR": 'present',"CHAITANYA VARDHAN KOTE": 'present',"CHANDIKA SREE TEJA": 'present',"CHENNUPATI VENKATA UPENDRA": 'present',"CYRIL CHRISTOPHER B": 'present',"DAMALACHERUVU GOWTHAM SAI": 'present', "DANAPRASAD M": 'present', "DEEPAK M": 'present',"DIVAKAR J": 'present',"FARVESH H": 'present',"G ARJUN KRISHNA": 'present', "GANJA YUVARANI": 'present',"GNANAVENDANE T": 'present', "GOKULKRISHNA P": 'present', "GURUPRASAD R": 'present', "HARIHARAN G V": 'present',"HARSHAL KARIYA": 'present',"HRITHIN SUNIL": 'present',"JANGAM CHAITANYA SAI": 'present', "JAYARAJ POZHILAN": 'present', "JOSEPH G CARDOZ": 'present', "JYOTHI SRI SAI SWARUP NADENDLA": 'present',"K RAGAVI": 'present', "KADALI HARSHA SRI SAMPATH": 'present', "KALAIMATHI S": 'present',  "KALISETTY BHARGAV NAIDU": 'present',  "KALYAN": 'present', "KAMALESHKUMAR K": 'present', "KARAN J": 'present',"KATTOJU HEMANTH": 'present', "KAUSHIK": 'present', "KEERTHIVASAN": 'present', "KRISHNA TEJA MURIKIPUDI": 'present',"MADDUKURI SRIMANJUNADH": 'present', "MADESHVARADHAN V": 'present', "MALLELA SATYA MANIKYA SAHITHI": 'present', "MAMATHA": 'present',"MANCHIKALAPATI MANOJ LEKYENDRA": 'present', "MANGAIYARKARASI": 'present', "MANJULA K": 'present', "MANOJ S": 'present', "MOGINDER E": 'present',"MOHAMMED ABDUL BASITH": 'present', "MUHAMMED AJMAL SHAMEER": 'present', "MUPPARAPU VICTOR MATTHEW": 'present', "MURALIDHARAN B": 'present',"NANDHINI P": 'present', "NANDI SREE HARSHITHA": 'present', "NAPPINNAI": 'present', "NATAKARANI NAVEEN": 'present',  "RIHANA M": 'present',"SANGADI MANIKANTHA": 'present',
  };
  const monday = ['H/M','C/G','IOE','ES','OEC','LAB','LAB','LAB'];
  const tuesday = ['H/M','WC','IOE','CNS','ITC','LAB','LAB','LAB'];
  const wednesday = ['OEC','T&P','T&P','T&P','H/M','LAB','LAB','LAB'];
  const thursday = ['WC','IOE','ES','ITC','CNS','PE','PE','LY'];
  const friday = ['ES','ITC','CNS','H/M','OEC','WC','MP','MP'];

const Takeeceone = ({navigation}) => {
  const route = useRoute();
  const {date,day,collectionData} = route.params;
  const [dverify,setDverify] = useState(0);
  const [refArray, setRefArray] = useState([]);
  const [remainingArray, setRemainingArray] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [attendance, setAttendance] = useState(initialState);

  useEffect(() => {
    setDverify(0);
    handleLoad();
    navigation.setOptions({
      title: "Take Attendance",
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
          onPress={() => navigation.goBack()}
        ><Text>
  <AntDesign name="leftcircle" size={15} color="black" /> <Text className="text-md pb-10  ">BACK</Text></Text></TouchableOpacity>
      ),
      })
  }, [])
  

const handleLoad = ()=>{
  const check = dverify + 1;
  setDverify(check);

  if(collectionData==='no data'){
    setRefArray("no data");
  } else {
    setRefArray(collectionData);
  }

  if(day==='Monday'){
   setRemainingArray(monday.filter(item => !refArray.includes(item)));
  } else if(day==='Tuesday'){
    setRemainingArray(tuesday.filter(item => !refArray.includes(item)));

  } else if(day==='Wednesday'){
    setRemainingArray(wednesday.filter(item => !refArray.includes(item)));

  } else if(day==='Thursday'){
    setRemainingArray(thursday.filter(item => !refArray.includes(item)));

  }else if(day==='Friday'){
    setRemainingArray(friday.filter(item => !refArray.includes(item)));
  }
}

const handleprevdata = async (itemValue) => {
  try {
    const docRef  = doccc(FIRESTORE_DB,date,itemValue)
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      const data = docSnap.data();
      const sortedEntries = Object.entries(data).sort();
      const sortedData = Object.fromEntries(sortedEntries);
      setAttendance(sortedData);
    } else {
      console.log('Document not found');
    }
  } catch (error) {
    console.log('Error fetching document:', error);
  }
  setSelectedValue(itemValue)
}


const handleToggleStatus = (name) => {
  setAttendance((prevState) => ({
    ...prevState,
    [name]: prevState[name] === 'present' ? 'absent' : 'present',
  }));
};

const subatt = async () => {
     const docRef = doccc(collection(FIRESTORE_DB, date), selectedValue);
     await setDoc(docRef, attendance);
     navigation.goBack();
  };

  return (
    <SafeAreaView className='flex-1'>
      <ScrollView className="bg-white ">
    <View className="flex-1">
    <Text className="text-xl text-center py-2 text-yellow-400">SELECTED DATE: <Text className='text-red-400'>{date}</Text></Text>
<Text className="text-xl text-center pt-2 pb-4 text-yellow-400">SELECTED DAY: <Text className='text-red-400'>{day}</Text></Text>
      
 <View className="flex-1 justify-center items-center">
      <TouchableOpacity className="bg-red-500 border  rounded-xl py-[12] px-[20]" onPress={()=>handleLoad()}>
        <Text className="text-white text-sm text-center">Verify Data!</Text>
      </TouchableOpacity>
    </View>

    {dverify <= 1 ? (
      <View>
        <Text>Verify Data 1st!</Text>
      </View>
    ) :
    (

    <View>
      <View className='p-4'>
      {collectionData === "no data" ? (
  <Text>Nothing took before!</Text> 
) : refArray.length === 1 ? (
  <View>
        <Text className='text-lg font-bold mb-2'>Already took:</Text>
        <View className="justify-center items-center">
      <TouchableOpacity className="bg-blue-500 border  rounded-xl py-[12] px-[20]" onPress={()=>handleprevdata(refArray[0])}>
        <Text className="text-white text-sm text-center">{refArray[0]}</Text>
      </TouchableOpacity>
    </View></View>
    ) : ( 
  <View>
    <Text className='text-lg font-bold mb-2'>Already took:</Text>
    <Picker
      selectedValue={selectedValue}
      onValueChange={handleprevdata}
      style={{ backgroundColor: '', borderRadius: 8 }}
    >
      {refArray.map((name) => (
        <Picker.Item key={name} label={name} value={name} />
      ))}
    </Picker>
  </View>
)}

    
      <Text className='text-lg font-bold mb-2'>Take new:</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => {setSelectedValue(itemValue);setAttendance(initialState)}}
        className='bg-white rounded-md'
      >
        {remainingArray.map((name) => (
          <Picker.Item  key={name} label={name} value={name} />
        ))}
      </Picker>
      <Text className='text-sm'>Selected: {selectedValue}</Text>
    </View>
      
      
  <View className="mx-2 py-5">
    {Object.entries(attendance).map(([name, status]) => (
      <View key={name} className="flex-row items-center py-2 space-x-4">
        <Text className="flex-1">{name}</Text>
        <TextInput
          value={status}
          onChangeText={(newStatus) =>
            setAttendance((prevState) => ({
              ...prevState,
              [name]: newStatus,
            }))
          }
          editable={false}
          className="flex-1 bg-gray-100 text-yellow-600 max-w-[80] min-w-[80] py-1 pl-2 rounded"
        />
        <TouchableOpacity
            onPress={() => handleToggleStatus(name)}
            className="bg-blue-500 p-2 rounded max-w-[90] min-w-[90]"
          >
            <Text className="text-white">
              {status === 'present' ? 'Absent' : 'Present'}
            </Text>
          </TouchableOpacity>
      </View>
    ))}
  </View>

  <Button onPress={async () => subatt()} title='Submit attendence' />
  </View> )}
    </View>
    </ScrollView>
  </SafeAreaView>
  )
}

export default Takeeceone;