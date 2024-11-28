import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { collection ,getDocs as getDocss, doc as doccc,getDoc} from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import { AntDesign } from '@expo/vector-icons';

import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

const adUnitId =  'ca-app-pub-7004619205587062/4279771450';


const Eceo = ({navigation}) => {

  useEffect(() => {
    // Set navigation Options
    navigation.setOptions({
      title: "VIEW DATE WISE",
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
      });
      // Request Collection Function 
    const handleRequestCollectionIds = async () => {
      try {
         await axios.get('https://attendence-server.onrender.com/collections').then((response) =>{
         setCollectionIds(response.data);
         })
      } catch (error) {
        console.error('Error requesting collection IDs:', error);
      } 
  
    }; 

    handleRequestCollectionIds();
  }, [])
  
  // necessary States
  const [collectionIds, setCollectionIds] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [ selecteddate,setSelecteddate] = useState('');
  const [attendance, setAttendance] = useState('');
  const [collectionData, setCollectionData] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);

  // Selection Month to Display Dates to fetch Separate Collections
  const handleMonthChange = (month) => {
    setCollectionData("")
    setSelectedMonth(month);
    const filteredDates = collectionIds.filter(date => date.startsWith(`2023-${month}`));
    setAvailableDates(filteredDates);
  };

  // date Change Function to Fetch Docs names
  const handledatechange = async (date) => {
    setSelecteddate(date);
    try {
      const querySnapshot = await getDocss(collection(FIRESTORE_DB, date));
      const documentNames = querySnapshot.docs.map((doc) => doc.id);

      if (documentNames.length > 0) {
         setCollectionData(documentNames);
      } else {
         setCollectionData('no data');
        }
    } catch (error) {
         console.error('Error checking collection availability:', error);
         setCollectionData('error');
    } 
  }
  // Fetch data from selected Docs
  const fetchdocument = async(itemValue) =>{
    try {
      const docRef  = doccc(FIRESTORE_DB,selecteddate,itemValue)
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
  }
  return (
    <ScrollView>
    <View>
      <View  className='p-[16] bg-white '>
      <Text  className='text-xl mb-8'>Select a month:</Text>
      <Picker
        className="h-[40] border-8 border-[#ccc] mb-[16]"
        selectedValue={selectedMonth}
        onValueChange={handleMonthChange}
      >
        <Picker.Item label="-- Select Month --" value="" />
        <Picker.Item label="January" value="01" />
        <Picker.Item label="February" value="02" />
        <Picker.Item label="March" value="03" />
        <Picker.Item label="April" value="04" />
        <Picker.Item label="May" value="05" />
        <Picker.Item label="June" value="06" />
        <Picker.Item label="July" value="07" />
        <Picker.Item label="August" value="08" />
        <Picker.Item label="September" value="09" />
        <Picker.Item label="October" value="10" />
        <Picker.Item label="November" value="11" />
        <Picker.Item label="December" value="12" />
      </Picker>

      <View  className='mt-[16]'>
        {availableDates.length > 0 ? (
          <>
            <Text className='text-xl mb-8'>Select a date:</Text>
            <Picker  
            className="h-[40] border-8 border-[#ccc] mb-[16]"
            selectedValue={selecteddate}
            onValueChange={handledatechange}
            >
              <Picker.Item label="-- Select Date --" value="" />
              {availableDates.map((date) => (
                <Picker.Item key={date} label={date} value={date} />
              ))}
            </Picker>
          </>
        ) : (
          <Text className="text-xl ">No data available for the selected month.</Text>
        )}
      </View>
    </View>


    {collectionData && (
        <View>
          {collectionData === 'no data' ? (
            <Text className="text-xl py-2 text-black">No data</Text>
          ) : (
            collectionData.map((documentName) => (
              <TouchableOpacity key={documentName} className="bg-blue-500 rounded-xl py-[12] px-[20]" onPress={()=>fetchdocument(documentName)}>
              <Text className="text-xl py-2 pl-8" key={documentName}>-{'>'} {documentName}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      )}
   
   <View className="mx-2 py-5">
    {Object.entries(attendance).map(([name, status]) => (
      <View key={name} className="flex-row items-center py-2 space-x-4">
        <Text className="flex-1 max-w-[300px]">{name}</Text>
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
        
      </View>
    ))}

<BannerAd
className="pt-9"
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  </View>

    </View>
    </ScrollView>
  );
};


export default Eceo;
