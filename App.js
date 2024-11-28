import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Eceone from './screens/takeatten/Eceone.js';
import Eceoneatt from './screens/takeatten/Eceoneatt.js';
import Takeeceone from './screens/takeatten/Takeeceone.js';
import Viewrtake from './screens/Viewrtake.js';
import Eceo from './screens/viewatten/Eceo.js';
import Select from './screens/viewatten/Select.js';
import Percent from './screens/viewatten/Percent.js';




const Stack = createNativeStackNavigator();

export default function App() {
  return (
   
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Viewrtake">
    <Stack.Screen name="Viewrtake" component={Viewrtake} />
    <Stack.Screen name="Eceone" component={Eceone} />
    <Stack.Screen name="Selectview" component={Select} />
    <Stack.Screen name="Viewone" component={Eceo} />
    <Stack.Screen name="Percent" component={Percent} />
    <Stack.Screen name="Eceoneatt" component={Eceoneatt} />
    <Stack.Screen name="takeeceone" component={Takeeceone} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}


