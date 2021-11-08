import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import {Provider} from 'react-redux'
import store from './src/store'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client'

import Episode from './src/Episode'
import LikedCharacters from './src/LikedCharacters'
import Movie from './src/Movie'
import Character from './src/Character'
import { screenOptions } from './src/styles'
 
const Stack = createNativeStackNavigator();

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://swapi-graphql.netlify.app/.netlify/functions/index"
    // uri: 'https://swapi.apis.guru', 
    // uri: 'https://graphql.org/swapi-graphql', 
    // uri: 'https://api.graphql.guide/graphql'
  }),
  rejectUnauthorized: false
})

const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {

  return (
    <BottomTab.Navigator
      initialRouteName="Episode">
      <BottomTab.Screen
        name="Episode"
        component={Episode}
        options={({ navigation }) => ({
          title: 'Episode',
          tabBarIcon: ({ color }) => <TabBarIcon name="film" color={color} />
        })}
      />
      <BottomTab.Screen
        name="LikedCharacters"
        component={LikedCharacters}
        options={{
          title: 'LikedCharacters',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home"screenOptions={screenOptions}>
            <Stack.Screen name="Home" component={BottomTabNavigator} options={{ title: 'Home' }} />
            <Stack.Screen name="Movie" component={Movie} options={{ title: 'Movie' }} />
            <Stack.Screen name="Character" component={Character} options={{ title: 'Character' }} />
          </Stack.Navigator>
          <StatusBar style="light" />
        </NavigationContainer>
      </ApolloProvider>
    </Provider>
  );
}


function TabBarIcon(props) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
