import React, { useRef, useCallback, useState } from 'react';
import { StyleSheet, View, Animated, Image, ImageBackground, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Content({ data, navigation }) {
  const scrollY = useRef(new Animated.Value(0)).current;

  if (data.findPosts.length === 0) {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', height: '100%' }}>
        <Text style={{color: 'black', height: 100}}>There is no content yet</Text>
      </View>
    );
  }

  const mainCard = data.findPosts[0];

  return (
    <Animated.ScrollView
      contentContainerStyle={styles.content}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
        useNativeDriver: true,
      })}
      scrollEventThrottle={1}
    >
      <TouchableOpacity style={styles.cardContainer} onPress={() => navigation.push('Detail', { id: mainCard.id })}>
        <ImageBackground source={{ uri: mainCard.imgUrl }} style={styles.cardBox}>
          <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,1.5)']} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} style={styles.gradient}>
            <View style={styles.textContainer}>
              <Text style={styles.imageTitle}>{mainCard.title}</Text>
              <Text style={styles.detail}>{mainCard.content.split(' ').slice(0, 10).join(' ')}...</Text>
              <Text style={styles.author}>
                {mainCard.User.username || mainCard.User.email} IN {mainCard.Category.name}
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>

      {data.findPosts.map((post, index) => (
        <TouchableOpacity key={index} style={styles.rowContent} onPress={() => navigation.push('Detail', { id: post.id })}>
          <View style={styles.rowCard}>
            <View style={{ flex: 1 }}>
              <View style={styles.rowCardImageContainer}>
                <Image source={{ uri: post.imgUrl }} style={{ flex: 1 }} resizeMode="cover" />
              </View>
            </View>
            <View key={index} style={styles.rowCardDetailContainer}>
              <Text style={styles.rowCardTitle}>{post.title}</Text>
              <Text style={styles.rowCardAuthor}>
                {post.User.username || post.User.email} IN {post.Category.name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 2,
    paddingTop: 80,
    backgroundColor: '#fff',
  },
  headerTitle: {
    alignSelf: 'center',
    height: 25,
    width: 80,
    marginBottom: 6,
  },
  cardContainer: {
    flex: 1,
    padding: 6,
    paddingTop: 12,
  },
  cardBox: {
    width: '100%',
    height: 550,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  rowContent: {
    padding: 6,
    margin: 15,
    width: '100%',
    alignSelf: 'center',
  },
  rowCard: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  rowCardImageContainer: {
    height: 125,
    width: 125,
    borderRadius: 15,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  rowCardDetailContainer: {
    flex: 2,
    gap: 12,
    paddingHorizontal: 12,
    paddingLeft: 16,
    paddingTop: 2,
  },
  rowCardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 34,
  },
  rowCardAuthor: {
    fontSize: 10,
    textTransform: 'uppercase',
    fontFamily: 'monospace',
  },
  textContainer: {
    padding: 20,
    gap: 20,
  },
  imageTitle: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 12,
    textTransform: 'uppercase',
    fontFamily: 'monospace',
    color: 'white',
    marginBottom: 12,
  },
  detail: {
    color: 'white',
  },
});
