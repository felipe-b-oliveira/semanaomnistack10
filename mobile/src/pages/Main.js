import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
// import { requestPermissionAsync, getCurrentPositionAsync } from 'expo-location';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { MaterialIcons } from '@expo/vector-icons'

import api from '../services/api';
import { connect, disconnect, subscribeToNewDevs } from '../services/socket';


function Main({ navigation }) {
  const [devs, setDevs] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [techs, setTechs] = useState('');

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

  useEffect(() => {
    subscribeToNewDevs(dev => setDevs([...devs, dev]));
  }, [devs]);

  function setupWebsocket() {
    disconnect();

    const { latitude, longitude } = currentRegion;

    connect(
      latitude,
      longitude,
      techs,
    );
  }

  async function loadDevs() {
    const { latitude, longitude } = currentRegion;

    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
        techs
      }
    });

    setDevs(response.data.devs);
    setupWebsocket();
  }

  function handleRegionChanged (region) {
    console.log(region);
    setCurrentRegion(region);
  }

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
      onRegionChangeComplete={handleRegionChanged}  
    >
        {devs.map(dev => (
          <Marker
            key={dev._id}
            coordinate={{ 
              longitude: dev.location.coordinates[0], 
              latitude: dev.location.coordinates[1], 
            }}>
            <Image
              style={styles.avatar}
              source={{ uri: dev.avatar_url }}
            />
            <Callout onPress={() => {
              navigation.navigate('Profile', { github_username: dev.github_username })
            }}>
              <View style={styles.callout}>
                <Text style={styles.devName}>{dev.name}</Text>
                <Text style={styles.devBio}>{dev.bio}</Text>
                <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
    </MapView>
    <View style={styles.searchForm}>
      <TextInput
        style={isKeyboardVisible ? styles.searchInput2 : styles.searchInput}
        placeholder="Buscar devs por techs..."
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        value={techs}
        onChangeText={setTechs}
        // onChangeText={text => setTechs(text)}
        // onPress={() => handleTest()}
      />

      <TouchableOpacity onPress={loadDevs} style={isKeyboardVisible ? styles.loadButton2 : styles.loadButton}>
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