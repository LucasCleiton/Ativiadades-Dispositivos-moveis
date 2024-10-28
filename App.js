import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './home';
//mport Cadastro from './cadastro';
//import Senha from './senha';


export default function App() {
  return (
    <Home></Home>
    //<Cadastro></Cadastro>
    //<Senha></Senha>
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
