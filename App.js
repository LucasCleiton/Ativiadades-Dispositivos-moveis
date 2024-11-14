import React, { useState } from 'react';
import { View, Button, Image, ActivityIndicator, Alert, FlatList, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const CloudinaryUpload = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]); // Lista de imagens carregadas

  const CLOUD_NAME = "dlhtseb7b";
  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload/`;


  // Função para selecionar uma imagem


  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage({ uri: result.assets[0].uri });
    }
  };






  // Função para fazer o upload da imagem
  const uploadImage = async () => {
    if (!image) {
      Alert.alert("Please select an image first");
      return;
    }

    setUploading(true);

    const data = new FormData();
    data.append('file', {
      uri: image.uri,
      type: 'image/jpeg',
      name: 'upload.jpg',
    });
    data.append('upload_preset', 'storage'); // Certifique-se de que este preset exista no seu Cloudinary
    data.append('folder', 'storage'); // Nome da pasta onde as imagens serão salvas

    try {
      const response = await axios.post(CLOUDINARY_URL, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Adiciona a URL da imagem carregada na lista de imagens

      const newImage = {
        url: response.data.secure_url,
        public_id: response.data.public_id, // Adiciona o public_id retornado pelo Cloudinary
      };
      setUploadedImages([...uploadedImages, newImage]);



      setImage(null); // Limpa a imagem selecionada após o upload
      Alert.alert("Upload successful");
    } catch (error) {
      Alert.alert("Upload failed", error.message);
    } finally {
      setUploading(false);
    }
  };


  // Função para deletar a imagem
  const deleteImage = (item) => {
    const newImages = uploadedImages.filter(uploadedItem => uploadedItem.url !== item.url);
    setUploadedImages(newImages);
    Alert.alert("Image removed from display!");
  };


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>


      {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200, marginBottom: 20 }} />}
      <Button title="Pick an Image" onPress={pickImage} />
      <Text></Text>
      <Button title="Upload Image" onPress={uploadImage} disabled={uploading} />


      {uploading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}
      {uploadedImages.length > 0 && (
        <View style={{ marginTop: 20, width: '100%' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Uploaded Images:</Text>

          <FlatList
            data={uploadedImages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (

              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10, alignItems: 'center' }}>
                <Image source={{ uri: item.url }} style={{ width: 100, height: 100, marginBottom: 10 }} />

                <Button title="Excluir" onPress={() => deleteImage(item)} disabled={uploading} />
              </View>

            )}
          />


        </View>
      )}



    </View>
  );
};

export default CloudinaryUpload;