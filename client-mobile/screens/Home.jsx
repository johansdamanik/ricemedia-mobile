import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, Animated, Image, ImageBackground, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gql, useQuery } from '@apollo/client';

import DraggableMenu from '../components/Header';
import Content from '../components/Content';

const FETCH_POSTS = gql`
  query FindPosts {
    findPosts {
      id
      title
      content
      imgUrl
      categoryId
      tags {
        name
      }
      Category {
        id
        name
      }
      User {
        username
        email
      }
    }
  }
`;

const FETCH_CATEGORIES = gql`
  query FindCategories {
    findCategories {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export default function Home({ navigation }) {
  const scrollY = useRef(new Animated.Value(0)).current;

  const translateHeader = scrollY.interpolate({
    inputRange: [0, 30],
    outputRange: [0, -40],
    extrapolate: 'clamp',
  });
  const opacityTitle = scrollY.interpolate({
    inputRange: [0, 40],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const translateTitle = scrollY.interpolate({
    inputRange: [0, 300],
    outputRange: [0, 40],
    extrapolate: 'clamp',
  });

  const { loading, data, error } = useQuery(FETCH_POSTS);
  const { loading: loadingCategory, data: category, error: errorCategory } = useQuery(FETCH_CATEGORIES);

  const [activeItem, setActiveItem] = useState(null);
  
  const posts = {
    findPosts: []
  }

  if (data?.findPosts) {
    posts.findPosts = data.findPosts
  }

  if (activeItem) {
    posts.findPosts = posts.findPosts.filter((item) => item.Category.name === activeItem);
  }
  
  useEffect(() => {
    if(category?.findCategories) {
      setActiveItem(category.findCategories[0].name)
    }
  }, [category])
  
  if (loading || loadingCategory) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || errorCategory) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Something went wrong. Try to reload the app.</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={{ backgroundColor: 'black' }}>
          <Animated.View style={[styles.header, { transform: [{ translateY: translateHeader }] }]}>
            <Animated.Image source={require('../assets/ricelogo.png')} style={[styles.headerTitle, { opacity: opacityTitle, transform: [{ translateY: translateTitle }] }]} />
            <DraggableMenu navigation={navigation} category={category} activeItem={activeItem} setActiveItem={setActiveItem} />
          </Animated.View>
          <Content data={posts} navigation={navigation} />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  content: {
    padding: 2,
    paddingTop: 80,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    paddingHorizontal: 6,
    height: 85,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    backgroundColor: 'black',
  },
  headerTitle: {
    alignSelf: 'center',
    height: 25,
    width: 80,
    marginBottom: 6,
  }
});
