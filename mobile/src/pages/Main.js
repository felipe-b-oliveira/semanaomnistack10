import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
// import { requestPermissionAsync, getCurrentPositionAsync } from 'expo-location';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { MaterialIcons } from '@expo/vector-icons'

function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // Localização do usuario
  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await Permissions.askAsync(Permissions.LOCATION);

      if (granted) {
        const { coords } = await Location.getCurrentPositionAsync({
          enableHighAccuracy: true,
        });
        
        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01, 
        })
      }
    }

    loadInitialPosition();
  }, []);

  if (!currentRegion) {
    return null;
  }

  Keyboard.addListener(`keyboardDidShow`, () => {
    setKeyboardVisible(true);
  })
  
  Keyboard.addListener(`keyboardDidHide`, () => {
    setKeyboardVisible(false);})

  function handleKeyboardOnMapPress () {
    if (isKeyboardVisible) {
      setKeyboardVisible(false);
      Keyboard.dismiss();
    }
    else {
      '';
    }
  }

  return (
    <>
    <MapView 
      initialRegion={currentRegion} 
      style={ styles.map }
      onPress={() => handleKeyboardOnMapPress()}  
    >
      <Marker coordinate={{ latitude: -22.7604142, longitude: -43.292498 }}>
        <Image 
          style={styles.avatar}
          source={{ uri:'https://scontent-gig2-1.xx.fbcdn.net/v/t1.0-9/12993339_1538337406471451_8230930593483038980_n.jpg?_nc_cat=105&_nc_sid=7aed08&_nc_ohc=0Zr01VfkM-4AX9AqAxe&_nc_ht=scontent-gig2-1.xx&oh=5ea78b98452ce3740e22fc7f540d1513&oe=5E987573' }} 
        />
        <Callout onPress={() => {
          navigation.navigate('Profile', { github_username: 'felipe-b-oliveira' })
        }}>
          <View style={styles.callout}>
            <Text style={styles.devName}>Giselle Oliveira</Text>
            <Text style={styles.devBio}>Desenvolvedora Front-end</Text>
            <Text style={styles.devTechs}>Angular JS, Javascript, PHP, ReactJS</Text>
          </View>
        </Callout>
      </Marker>
    </MapView>
    <View style={styles.searchForm}>
      <TextInput
        style={isKeyboardVisible ? styles.searchInput2 : styles.searchInput}
        placeholder="Buscar devs por techs..."
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        // onPress={() => handleTest()}
      />

      <TouchableOpacity onPress={() => {}} style={isKeyboardVisible ? styles.loadButton2 : styles.loadButton}>
        <MaterialIcons name="my-location" size={20} color="#fff"/>
      </TouchableOpacity>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#fff'
  },

  callout: {
    width: 260
  },

  devName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  
  devBio: {
    color: '#667',
    marginTop: 5,
  },

  devTechs: {
    marginTop: 5,
  },

  searchForm: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row',
  },

  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4, 
      height: 4,
    },
    elevation: 2,
  },

  // TODO: Refatorar CSS, utilizar herança para evitar repetição
  searchInput2: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4, 
      height: 4,
    },
    elevation: 2,
    top: -245
  },

  loadButton: {
    width: 50,
    height: 50, 
    backgroundColor: '#8E4DFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },

  // TODO: Refatorar CSS, utilizar herança para evitar repetição
  loadButton2: {
    width: 50,
    height: 50, 
    backgroundColor: '#8E4DFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    top: -245
  }
})

export default Main;