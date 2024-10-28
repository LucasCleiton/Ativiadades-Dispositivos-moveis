import React from 'react';
import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


//import das telas
import Home from './home';
import Cadastro from './cadastro';
import Senha from './senha';


const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <NavigationContainer initialRouteName='Home'>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Esqueceu a Senha" component={Senha} />
      </Stack.Navigator>
    </NavigationContainer>



    /*
    <NavigationContainer>

      <Stack.Navigation initialRouteName='Home'>
        <Stack.Screen name="Home" componet={Home} />
        <Stack.Screen name="Cadastro" componet={Cadastro} />
        <Stack.Screen name="RecuperarSenha" componet={Senha} />
      </Stack.Navigation>

    </NavigationContainer>

*/
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
