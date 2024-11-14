import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

export default function App() {
  const API_KEY = '95097a1a';
  const BASE_URL = 'https://api.hgbrasil.com/weather';
  const [weatherData, setWeatherData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedState, setSelectedState] = useState('SP');

  const estados = [
    'São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Porto Alegre',
    'Belém', 'Goiânia', 'Guarulhos', 'Campinas', 'São Luís', 'São Gonçalo', 'Maceió', 'Duque de Caxias', 'Natal', 'Campo Grande', 'Teresina'
  ];

  useEffect(() => {
    async function loadWeather() {
      const data = await fetchWeatherData(selectedState);
      setWeatherData(data);
    }
    loadWeather();
  }, [selectedState]);

  async function fetchWeatherData(state) {
    try {
      const response = await fetch(`${BASE_URL}?key=${API_KEY}&city_name=${state}&format=json`);
      const data = await response.json();
      console.log(data);  // Verifique a estrutura dos dados aqui
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
      {/* Header  */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="location-outline" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.cityText}>{weatherData?.city || "Cidade"}</Text>
        <Ionicons name="notifications-outline" size={24} color="white" />
      </View>

      {/* Modal para seleção de estado */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione o Estado</Text>
            <ScrollView>
              {estados.map((estado) => (
                <TouchableOpacity
                  key={estado}
                  style={styles.estadoButton}
                  onPress={() => {
                    setSelectedState(estado);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.estadoButtonText}>{estado}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeModalText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Exibição de dados climáticos */}
      <View style={styles.currentWeather}>
        <FontAwesome name="sun-o" size={80} color="yellow" />
        <Text style={styles.temperatureText}>{weatherData?.temp || "--"}°C</Text>
        <Text style={styles.weatherInfo}>{weatherData?.description || "Sem descrição"}</Text>
        <Text style={styles.minMaxText}>
          Max.: {weatherData?.forecast?.[0]?.max || "--"}°C Min.: {weatherData?.forecast?.[0]?.min || "--"}°C
        </Text>
        <View style={styles.weatherDetails}>
          <Text style={styles.detailText}>Humidade: {weatherData?.humidity || "--"}%</Text>
          <Text style={styles.detailText}>{weatherData?.wind_speedy || "--"}</Text>
        </View>
      </View>

      {/* Clima por hora */}
      <View style={styles.forecastSection}>
        <Text style={styles.sectionTitle}>Hoje {weatherData?.date || "--"}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* Exemplo de previsões horárias. Substitua por dados reais se disponíveis */}
          {[1, 2, 3, 4].map((hour) => (
            <View key={hour} style={styles.hourlyForecast}>
              <Text style={styles.forecastText}>{`Horário ${hour}`}</Text>
              <FontAwesome name="cloud" size={24} color="white" />
              <Text style={styles.forecastText}>{`${weatherData?.temp || "--"}ºC`}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Previsão para os próximos dias */}
      <View style={styles.nextForecast}>
        <Text style={styles.sectionTitle}>Next Forecast</Text>
        {weatherData?.forecast?.slice(1).map((day, index) => (
          <View key={index} style={styles.dailyForecast}>
            <Text style={styles.forecastText}>{day.weekday}</Text>
            <FontAwesome name="cloud" size={24} color="white" />
            <Text style={styles.forecastText}>{day.max}º - {day.min}º</Text>
          </View>
        ))}
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  estadoButton: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
  estadoButtonText: {
    fontSize: 16,
  },
  closeModalText: {
    color: 'blue',
    marginTop: 10,
  },


});
