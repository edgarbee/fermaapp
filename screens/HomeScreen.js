import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, View, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import { ImageSlider } from "react-native-image-slider-banner";

export const HomeScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [banner, setBanner] = useState([]);

  const getCards = async () => {
    try {
      const response = await fetch('http://test.shamanicpower.ru/api/cards');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getBanners = async () => {
    try {
      const response = await fetch('http://test.shamanicpower.ru/api/banners');
      const json = await response.json();
      setBanner(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCards();
    getBanners();
  }, []);

  const images = banner.map((banner, index) => {
    return ({"img": banner.image, "slug": banner.slug});
  });
  console.log(images);

  return (
    <ScrollView style={{flex: 1}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>

        <ImageSlider 
            data={images}
            autoPlay={false}
            preview={false}
            caroselImageStyle={{ resizeMode: 'cover' }}
            onClick={(images, index) => {navigation.navigate('Banner', { slug: images.slug, title: images.title})}}
        />
        <View>
            <Pressable style={styles.cardButton} onPress={() => navigation.navigate('Search')}>
                <Text style={styles.cardButtonText}>Поиск</Text>
            </Pressable>
        </View>
        <View>
            <Pressable style={styles.cardButtonGreen} onPress={() => navigation.navigate('Map')}>
                <Text style={styles.cardButtonText}>Хозяйства на карте</Text>
            </Pressable>
        </View>
        {data.map((item, index) => (
          <View style={styles.cardContainer} key={index}>
            <Image
                style={styles.cardImage}
                source={{
                uri: `${item.images}`,
                }}
            />
            <Text style={styles.cardName}>
                {item.title}
            </Text>
            <Text style={styles.cardDescription}>
                {item.description}
            </Text>
            <Pressable style={styles.cardButton} onPress={() => navigation.navigate('Card', { slug: item.slug, title: item.title})}>
                <Text style={styles.cardButtonText}>Перейти</Text>
            </Pressable>
          </View>
        ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardList: {
    padding:20
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    marginBottom:20,
    marginLeft:15,
    marginRight:15,
  },
  cardName: {
    fontSize:24,
    fontWeight: '600',
    paddingTop: 15,
    paddingLeft:15,
    paddingRight:15
  },
  cardDescription: {
    fontSize:14,
    paddingLeft:15,
    paddingRight:15
  },
  cardImage: {
    resizeMode: 'cover',
    width: '100%', 
    height: 200,
    borderRadius: 10
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
