import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Input, Button } from '@rneui/themed';


export default function App({ navigation }) {
    return (
        <View style={styles.container}>

            <View>

                <Avatar
                    size={60}
                    rounded
                    title="LF"
                    containerStyle={{ backgroundColor: "blue" }}
                />
            </View>
            <View>
                <Text>Email</Text>
                <Input
                    placeholder='informe seu email'
                    containerStyle={{ width: 250 }}
                />

                <Text>Senha</Text>
                <Input placeholder="informe sua senha" containerStyle={{ width: 250 }} secureTextEntry={true} />
            </View>

            <View>
                <Button
                    title="Logar"
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
                    onPress={() => console.log('aye')}
                />
                <Button
                    title="Cadastre-se"
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
                    onPress={() => navigation.navigate('Cadastro')}
                />

                <Button
                    containerStyle={{
                        width: 200,
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                    title="Esqueceu a senha"
                    type="clear"
                    titleStyle={{ color: 'black' }}
                    onPress={() => navigation.navigate('Esqueceu a Senha')}
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
