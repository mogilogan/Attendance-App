import { View, Text, Button, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { addDoc, collection, doc as doccc, setDoc,getDocs as getDocss } from 'firebase/firestore'
import { FIRESTORE_DB } from '../firebaseConfig'
import { Picker } from '@react-native-picker/picker'

const List = ({navigation}) => {

  const [collectionData, setCollectionData] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');


    const [todos, setTodos] = useState([]);
    const [todo,setTodo] = useState('');
    const [document , setDocument] = useState(null);

    useEffect(()=>{
      
    },[]);

    const addTodo = async () => {
      const docId = 'IEM';
      const docData = { title: todo, done: false };
      
      const docRef = doccc(collection(FIRESTORE_DB, '2023-02-06'), docId);
        const docss = await addDoc(collection(FIRESTORE_DB, 'todos'), {title:todo, done:false});
         
       
await setDoc(docRef, docData);
setTodo(''); 
      };

  const searchcol =  () =>{
    if (selectedDate === '') {
      console.error('Please select a date');
      return;
    }

    const collectionName = selectedDate; // Assuming the selected date will be used as the collection name

    getDocss(collection(FIRESTORE_DB, collectionName))
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const documentNames = querySnapshot.docs.map((doc) => doc.id);
          setCollectionData(documentNames);
        } else {
          setCollectionData('no data');
        }
      })
      .catch((error) => {
        console.error('Error checking collection availability:', error);
        setCollectionData('error');
      });
  };

  


  return (
    <View className="mx-[20]">
      <Text>List</Text>
      <View className="flex-row  items-center py-2">
      <TextInput className="flex-1 h-[40] border rounded-lg p-2" placeholder='Add new Todo' onChangeText={(text) => setTodo(text)} value = {todo} />
      <Button onPress={()=> addTodo()} title='Add Todo' disabled={todo===''}/>
      </View>
      <Button onPress={()=> searchcol("IEM")} title='search col'/>


      <View className="justify-center ">
      <Picker
        selectedValue={selectedDate}
        onValueChange={(value) => setSelectedDate(value)}
        className="w-[100]"
      >
        <Picker.Item label="Select a date" value="" />
        {/* Render the dropdown options dynamically */}
        {/* Replace this with your actual dropdown options */}
        <Picker.Item label="2023-02-06" value="2023-02-06" />
        <Picker.Item label="2023-06-02" value="2023-06-02" />
        <Picker.Item label="2023-06-03" value="2023-06-03" />
      </Picker>
      <Button title="Search" onPress={searchcol} />
      {collectionData && (
        <View>
          {collectionData === 'no data' ? (
            <Text>No data</Text>
          ) : (
            collectionData.map((documentName) => (
              <Text key={documentName}>{documentName}</Text>
            ))
          )}
        </View>
      )}
    </View>



      {/* <Button  onPress={()=>navigation.navigate('Details')} title="Open Details" /> */}
    </View>
  )
}

export default List;