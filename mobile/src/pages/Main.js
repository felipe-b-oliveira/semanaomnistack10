import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
// import { requestPermissionAsync, getCurrentPositionAsync } from 'expo-location';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

function Main() {
  const [currentRegion, setCurrentRegion] = useState(null);

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

  return (
    <MapView initialRegion={currentRegion} style={ styles.map }>
      <Marker coordinate={{ latitude: -22.7604142, longitude: -43.292498 }}>
        <Image 
          style={styles.avatar}
          source={{ uri:'https://scontent-gig2-1.xx.fbcdn.net/v/t1.0-9/12993339_1538337406471451_8230930593483038980_n.jpg?_nc_cat=105&_nc_sid=7aed08&_nc_ohc=0Zr01VfkM-4AX9AqAxe&_nc_ht=scontent-gig2-1.xx&oh=5ea78b98452ce3740e22fc7f540d1513&oe=5E987573' }} 
        />
        <Callout>
          <View style={styles.callout}>
            <Text style={styles.devName}>Giselle Oliveira</Text>
            <Text style={styles.devBio}>Desenvolvedora Front-end</Text>
            <Text style={styles.devTechs}>Angular JS, Javascript, PHP, ReactJS</Text>
          </View>
        </Callout>
      </Marker>
    </MapView>
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
  }
})

export default Main;