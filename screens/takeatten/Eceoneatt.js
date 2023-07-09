import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState,useEffect } from 'react';
import moment from 'moment/moment';
import {Calendar} from 'react-native-calendars';

import {  FIRESTORE_DB } from '../../firebaseConfig';
import { collection,getDocs as getDocss } from 'firebase/firestore'
import { AntDesign } from '@expo/vector-icons';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';

const adUnitId = 'ca-app-pub-7004619205587062/3266871442';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing','gaming','technology','aerospace'],
});

const Eceoneatt = ({navigation}) => {

  const [loaded, setLoaded] = useState(false);
  const [collectionData, setCollectionData] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [date,setDate] = useState();
  const [day,setDay] = useState();
  const [user,setUser] = useState();

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


    const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    setUser(user.email);
  } else {
   setUser("User not found")
  }
});
   
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
      interstitial.show();
    });

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, [])




    const searchcol = async () =>{
         if (date === '') {
            console.error('Please select a date');
            return;
         }
         const collectionName = date; //setting the collection id
         setCollectionData(null);

         try {
            const querySnapshot = await getDocss(collection(FIRESTORE_DB, collectionName));
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
    };

    const navtotakeatt = (date,day,collectionData) => {
        navigation.navigate('takeeceone', { date,day,collectionData });
    };

  return (
    <View className="bg-white  flex-1 justify-center items-center">
    <ScrollView>

    <View >
    <Text className="text-2xl text-center pb-4">Welcome{user}</Text>

      <Text className="text-2xl text-center pb-4">Select a Date to Take Attendence!</Text>
      <Calendar
  // Customize the appearance of the calendar
  style={{
    borderRadius: 5,
    margin: 12,
    minWidth:350,
    elevation: 5,
    borderWidth: 3,
    borderColor: 'rgba(20, 200, 500, 0.2)'
  }}
  theme={{
    calendarBackground: '#222',
    dayTextColor: '#fff',
    textDisabledColor: '#444',
    monthTextColor: '#888',
    'stylesheet.calendar.header': {
      dayTextAtIndex0: {
        color: 'red'
      },
      dayTextAtIndex6: {
        color: 'red'
      }}
  }}

 //setting initial and end dates
  initialDate="2023-07-10"
  minDate="2023-07-0"
  maxDate="2023-10-30"
  disableAllTouchEventsForDisabledDays={true}
  // Callback that gets called when the user selects a day
  onDayPress={day => {
    setDate(day.dateString);
    var a = moment(day.dateString).format("YYYY-MM-DD");
    setDay(moment(a).format("dddd"));
    setSelectedDate(date);
    setCollectionData(null);
  }}
/>

<Text className="text-xl text-center py-2 text-yellow-400">SELECTED DATE: <Text className='text-green-900'>{date}</Text></Text>
<Text className="text-xl text-center pt-2 pb-4 text-yellow-400">SELECTED DAY: <Text className='text-green-900'>{day}</Text></Text>
{date &&(
  <View className=" justify-center items-center">
      <TouchableOpacity className="bg-blue-500 rounded-xl py-[12] px-[20]" onPress={()=>searchcol()}>
        <Text className="text-white text-sm text-center">Check Data!</Text>
      </TouchableOpacity>
    </View>)}
{collectionData && (
        <View>
          {collectionData === 'no data' ? (
            <Text className="text-xl py-2 text-black">No data</Text>
          ) : (
            collectionData.map((documentName) => (
              <Text className="text-xl py-2 pl-8" key={documentName}>-{'>'} {documentName}</Text>
            ))
          )}
        </View>
      )}

      <View>

      {collectionData &&
      <View className=" justify-center items-center">
      <TouchableOpacity className="bg-blue-500 rounded-xl py-[12] px-[20]" onPress={()=>{navtotakeatt(date,day,collectionData);setDate(""); setDay(); setCollectionData("");}}>
        <Text className="text-white text-sm text-center">Select Period!</Text>
      </TouchableOpacity>
    </View>
      }
      </View>
    
    
    </View>
    </ScrollView>
    </View>

  )

}
export default Eceoneatt;