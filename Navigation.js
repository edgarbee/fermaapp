import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from './screens/HomeScreen';
import { CardScreen } from './screens/CardScreen';
import { MapScreen } from './screens/MapScreen';
import { PushScreen } from './screens/PushScreen';
import SeachScreen  from './screens/SearchScreen';
import { MapPointScreen } from './screens/MapPointScreen';
import { BannerScreen } from './screens/BannerScreen';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'FermaApp'}}
          />
          <Stack.Screen
            name="Card"
            component={CardScreen}
            options={{title: 'Карточка'}}
          />
          <Stack.Screen
            name="Map"
            component={MapScreen}
            options={{title: 'Карта'}}
          />
          <Stack.Screen
            name="MapPoint"
            component={MapPointScreen}
            options={{title: 'Точка'}}
          />
          <Stack.Screen
            name="Push"
            component={PushScreen}
            options={{title: 'Пуш'}}
          />
          <Stack.Screen
            name="Search"
            component={SeachScreen}
            options={{title: 'Поиск'}}
          />
          <Stack.Screen
            name="Banner"
            component={BannerScreen}
            options={{title: 'Баннер'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };