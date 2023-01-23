import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, StyleSheet, Image, Pressable, Alert, Linking, ScrollView } from 'react-native';
import axios from 'axios';

export const CardScreen = ({ route, navigation }) => {

  const { slug, title } = route.params; 

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      title,
    })
    axios
    .get(`http://test.shamanicpower.ru/api/cards/` + slug)
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
    <ScrollView style={{flex:1, backgroundColor:'white'}}>
    <View>
      {isLoading ? (
      <ActivityIndicator />
      ) : (
        <View>
        <Image
          style={styles.cardImage}
          source={{
            uri: `${data.card.images}`,
          }}
        />
        <Text style={styles.cardName}>
          {data.card.title}
        </Text>
        <Text style={styles.cardDescription}>
          {data.card.description}
        </Text>

        <View>
            <Pressable style={styles.cardButtonGreen} onPress={() => navigation.navigate('MapPoint', { slug: data.card.slug, title: data.card.title})}>
                <Text style={styles.cardButtonText}>Посмотреть на карте</Text>
            </Pressable>
        </View>

        <Text style={styles.cardDescriptionInfo}>
          <Text style={{fontWeight:'800'}}>Адрес:</Text> {data.card.address}
        </Text>

        <Text style={styles.cardDescriptionInfo} onPress={()=>{Linking.openURL('tel:'+data.card.telephone);}}>
          <Text style={{fontWeight:'800'}}>Телефон:</Text> {data.card.telephone}
        </Text>

        <Text style={styles.cardDescriptionInfo} onPress={()=>{Linking.openURL('mailto:'+data.card.email);}}>
          <Text style={{fontWeight:'800'}}>Почта:</Text> {data.card.email}
        </Text>

        <FlatList style={styles.cardList}
          data={data.products}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <View style={styles.cardRow}>
            <Image
              style={styles.cardImageRow}
              source={{
                uri: `${item.image}`,
              }}
            /> 
            <View>
              <Text style={styles.cardNameRow}>
                {item.title} - {item.price} руб.
              </Text>   
              <Text style={styles.cardDescriptionInfoNal} onPress={()=>{Linking.openURL('tel:'+data.card.telephone);}}>
                <Text style={{fontWeight:'800', color: '#178754'}}>Узнать наличие</Text>
              </Text>
            </View> 
                     
            </View>
          )}
        />
       </View>
       )}
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardName: {
    fontSize:24,
    fontWeight: '600',
    paddingTop: 15,
    paddingLeft:15,
    paddingRight:15
  },
  cardNameRow: {
    fontSize:18,
    fontWeight: '500',
    paddingTop: 10,
    paddingLeft:15,
    paddingRight:15
  },
  cardDescription: {
    fontSize:14,
    paddingLeft:15,
    paddingRight:15,
    paddingBottom:20,
    borderBottomWidth: 2,
    borderBottomColor: '#808080'
  },
  cardDescriptionInfoNal: {
    paddingLeft:15,
    paddingRight:15,
    paddingTop:10,
  },
  cardDescriptionInfo: {
    fontSize:16,
    paddingLeft:15,
    paddingRight:15,
    marginTop:20
  },
  cardImage: {
    resizeMode: 'cover',
    width: '100%', 
    height: 300,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  }, 
  cardButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#FEC107',
    margin: 15
  },
  cardButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  cardRow: {
    flexDirection: 'row',
    marginTop:30,
    marginLeft:15,
    marginRight:15,
    backgroundColor: '#ffffff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: 10
  }, 
  cardImageRow: {
    width: '30%', 
    height: 70,
    borderTopLeftRadius:10,
    borderBottomLeftRadius: 10
  },
  cardButtonGreen: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#178754',
    margin: 15
  },
  cardButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
