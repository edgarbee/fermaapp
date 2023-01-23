import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, View, StyleSheet, Image, Pressable, Alert, Linking} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import axios from 'axios';

export const MapPointScreen = ({ navigation, route }) => {

  const { slug, title } = route.params; 

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      title,
    })
    axios
    .get(`http://test.shamanicpower.ru/api/map/`+ slug)
    .then(({data}) => {
      setData(data);
    })
    .catch((err) => {
      console.log(err);
      Alert.alert('Ошибка', 'Не удалось найти карточку');
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
      <ActivityIndicator />
      ) : (
      <MapView style={styles.map}
        initialRegion={{
        latitude: 55.750948,
        longitude: 37.622155,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        }}
      >
          <Marker
            coordinate={{
              longitude: parseFloat(data.latitude),
              latitude: parseFloat(data.longitude)
            }}
            title={data.title}
            description={data.description}
          >
            <Callout tooltip onPress={()=>{Linking.openURL('tel:'+data.telephone);}}>
                <View>
                  <View style={styles.bubble}>
                  <Text style={{fontWeight:'800'}}>{data.title}</Text>                  
                  <Text style={styles.cardDescription}>
                    {data.description}
                  </Text>

                  <Image
                      style={styles.cardImage}
                      source={{
                        uri:`${data.images}`,
                      }}
                    />
                    <Pressable style={styles.cardButton}>
                      <Text style={styles.cardButtonText}>Позвонить</Text>
                    </Pressable>
                  </View>
                </View>
            </Callout>
          </Marker>
      </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 15,
    width: 300
  },
  cardImage: {
    resizeMode: 'cover',
    width: '100%', 
    height: 100,
    borderRadius: 10,
    marginTop: 15
  }, 
  cardButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#FEC107',
    marginTop: 15
  },
  cardButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
