import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Input, Button } from '@rneui/themed';

export default function App({ navigation }) {
    return (
        <View style={styles.container}>
            <View>
                <Text>Nome</Text>
                <Input
                    placeholder=''
                    containerStyle={{ width: 250 }}
                />
                <Text>CPF</Text>
                <Input
                    placeholder=''
                    containerStyle={{ width: 250 }}
                />
                <Text>Email</Text>
                <Input
                    placeholder=''
                    containerStyle={{ width: 250 }}
                />

                <Text>Senha</Text>
                <Input placeholder=""
                    containerStyle={{ width: 250 }} secureTextEntry={false} />


            </View>

            <View>
                <Button
                    title="Salvar"
                    loading={false}
                    loadingProps={{ size: 'small', color: 'white' }}
                    buttonStyle={{
                        backgroundColor: 'rgba(111, 202, 186, 1)',
                        borderRadius: 5,
                    }}
                    titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
                    containerStyle={{
                        marginHorizontal: 50,
                        height: 50,
                        width: 200,
                        marginVertical: 10,
                    }}
                    onPress={() => navigation.navigate('Lista de Contatos')}
                />


            </View>


        </View>

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
