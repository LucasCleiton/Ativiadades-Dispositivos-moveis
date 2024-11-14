import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

export default function App() {


    const API_KEY = '95097a1a';
    const BASE_URL = 'https://api.hgbrasil.com/weather';
    const [weatherData, setWeatherData] = useState(null);



    useEffect(() => {
        async function loadWeather() {
            const data = await fetchWeatherData('Fortaleza');
            setWeatherData(data);
        }
        loadWeather();
    }, []);





    async function fetchWeatherData(cityName) {
        try {
            const response = await fetch(`${BASE_URL}?key=${API_KEY}&city_name=${cityName}&format=json`);
            const data = await response.json();
            if (data && data.results) {
                return data.results;
            } else {
                console.error("Erro ao obter os dados climáticos:", data);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }


    return (


        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="location-outline" size={24} color="white" />

                <Text style={styles.cityText}>{weatherData.city}</Text>


                <Ionicons name="notifications-outline" size={24} color="white" />
            </View>



            <View style={styles.currentWeather}>
                <FontAwesome name="sun-o" size={80} color="yellow" />

                <Text style={styles.temperatureText}>{weatherData.temp}°C</Text>
                <Text style={styles.weatherInfo}>{weatherData.description}</Text>

                <Text style={styles.minMaxText}>
                    Max.: {weatherData.forecast[0].max}°C
                    Min.: {weatherData.forecast[0].min}°C
                </Text>

                <View style={styles.weatherDetails}>
                    <Text style={styles.detailText}>Humidade: {weatherData.humidity}%</Text>

                    <Text style={styles.detailText}>{weatherData.wind_speedy}</Text>
                </View>
            </View>




            <View style={styles.forecastSection}>


                <Text style={styles.sectionTitle}>Today  {weatherData.date}</Text>
                <Text></Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.hourlyForecast}>
                        <Text style={styles.forecastText}>15:00</Text>
                        <FontAwesome name="cloud" size={24} color="white" />
                        <Text style={styles.forecastText}>31ºC</Text>
                    </View>

                    <View style={styles.hourlyForecast}>
                        <Text style={styles.forecastText}>16:00</Text>
                        <FontAwesome name="cloud" size={24} color="white" />
                        <Text style={styles.forecastText}>30ºC</Text>
                    </View>

                    <View style={styles.hourlyForecast}>
                        <Text style={styles.forecastText}>16:00</Text>
                        <FontAwesome name="cloud" size={24} color="white" />
                        <Text style={styles.forecastText}>30ºC</Text>
                    </View>

                    <View style={styles.hourlyForecast}>
                        <Text style={styles.forecastText}>16:00</Text>
                        <FontAwesome name="cloud" size={24} color="white" />
                        <Text style={styles.forecastText}>30ºC</Text>
                    </View>
                </ScrollView>

            </View>




            <View style={styles.nextForecast}>


                <Text style={styles.sectionTitle}>Next Forecast</Text>



                <View style={styles.dailyForecast}>
                    <Text style={styles.forecastText}>Monday</Text>
                    <FontAwesome name="cloud" size={24} color="white" />
                    <Text style={styles.forecastText}>13º - 10º</Text>
                </View>

                <View style={styles.dailyForecast}>
                    <Text style={styles.forecastText}>Tuesday</Text>
                    <FontAwesome name="cloud" size={24} color="white" />
                    <Text style={styles.forecastText}>17º - 12º</Text>
                </View>


                {/* Adicione mais dias conforme necessário */}
            </View>





        </View>
    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00A2FF',
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    cityText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    currentWeather: {
        backgroundColor: '#0090E7',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        marginBottom: 20,
    },
    temperatureText: {
        fontSize: 60,
        color: 'white',
        fontWeight: 'bold',
    },
    weatherInfo: {
        color: 'white',
        fontSize: 18,
    },
    minMaxText: {
        color: 'white',
        fontSize: 14,
        marginVertical: 10,
    },
    weatherDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    detailText: {
        color: 'white',
        fontSize: 16,
    },
    forecastSection: {
        backgroundColor: '#007ACC',
        padding: 20,
        borderRadius: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        color: 'white',
        fontSize: 18,
        marginBottom: 10,
    },
    hourlyForecast: {
        alignItems: 'center',
        marginRight: 20,
    },
    forecastText: {
        color: 'white',
        fontSize: 16,
    },
    nextForecast: {
        backgroundColor: '#006BB7',
        padding: 20,
        borderRadius: 20,
    },
    dailyForecast: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
});
