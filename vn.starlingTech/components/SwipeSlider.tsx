import React from 'react';
import {Text} from 'native-base';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import Swiper from 'react-native-swiper';
import AppImage from './AppImage';
import AppButton from './AppButton';

export type SwipeSliderData = {
  image?: string;
  text?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: () => void;
};

type SwipeSlider = {
  height?: number;
  data: SwipeSliderData[];
  showsPagination?: boolean;
  style?: ViewStyle;
  autoplay?: boolean;
  autoplayTimeout?: number;
};

function SwipeSlider({
  height,
  data,
  showsPagination,
  style,
  autoplay,
  autoplayTimeout,
}: SwipeSlider) {
  return (
    <View
      style={{
        height: height || 345,
      }}>
      <Swiper
        autoplay={autoplay}
        autoplayTimeout={autoplayTimeout}
        showsButtons={false}
        showsPagination={showsPagination}
        style={style}>
        {data.map((item, index) => {
          return (
            <AppButton
              default
              key={index.toString()}
              style={{...styles.slide, ...item.style}}
              onPress={item.onPress}>
              <>
                {item.image && (
                  <AppImage
                    resizeMode="cover"
                    uri={item.image}
                    style={styles.sliderImage}
                  />
                )}
                {item.text && (
                  <Text style={item.textStyle || styles.text}>{item.text}</Text>
                )}
              </>
            </AppButton>
          );
        })}
      </Swiper>
    </View>
  );
}

export default SwipeSlider;

const styles = StyleSheet.create({
  sliderImage: {width: '100%', height: '100%'},
  slide: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
