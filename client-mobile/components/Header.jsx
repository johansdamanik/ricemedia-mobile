import { gql, useQuery } from '@apollo/client';
import React, { useRef, useState, useEffect } from 'react';
import { View, ScrollView, PanResponder, Animated, TouchableOpacity, Text, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function DraggableMenu({ navigation, category, activeItem, setActiveItem }) {
  const pan = useRef(new Animated.ValueXY()).current;

  const scrollViewRef = useRef(null);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      pan.setValue({ x: gesture.dx, y: 0 });
    },
    onPanResponderRelease: () => {
      Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
    },
  });

  const handleMenuItemPress = (item) => {
    setActiveItem(item);
  };

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} ref={scrollViewRef}>
        <Animated.View style={[{ flexDirection: 'row' }, pan.getLayout()]} {...panResponder.panHandlers}>
          {category.findCategories.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                {
                  height: 50,
                  paddingHorizontal: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}
              onPress={() => handleMenuItemPress(item.name)}
            >
              <Text style={[{ fontSize: activeItem === item.name ? 30 : 20 }, { color: activeItem === item.name ? 'white' : 'grey' }, { fontWeight: activeItem === item.name ? '900' : '700' }]}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </ScrollView>
    </View>
  );
}
