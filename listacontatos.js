import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Input, Button, Icon, Stack } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';




export default function App({ navigation }) {
    return (
        <View style={styles.container}>

            <Button radius={"sm"} type="solid"
                onPress={() => navigation.navigate('Contatos')}
                containerStyle={{ alignSelf: 'flex-end' }}>
                <Ionicons name="add-outline" size={50} color="white" />
            </Button>

            <View style={[styles.container, {
                flexDirection: "row"
            }]}>


                <Avatar
                    size={50}
                    rounded
                    title="L"
                    containerStyle={{
                        backgroundColor: "blue", marginRight: 20
                    }}
                />
                <View>


                    <Text style={styles.boldText} >Aqui o nome</Text>
                    <Text >Aqui o numero</Text>


                </View>

            </View>




        </View >

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 20,
    },
});
