import React from 'react';
import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


//import das telas 
import Home from './home';
import Cadastro from './cadastro';
import Senha from './senha';
import CadastroContatos from './cadastrocontatos';
import ListaContatos from './listacontatos';


//<Stack.Screen name="Lista de Contatos" component={ListaContatos} />

//

const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <NavigationContainer initialRouteName='Home'>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Esqueceu a Senha" component={Senha} />
        <Stack.Screen name="Lista de Contatos" component={ListaContatos} />
        <Stack.Screen name="Contatos" component={CadastroContatos} />

      </Stack.Navigator>
    </NavigationContainer>



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
