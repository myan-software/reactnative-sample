import { isNull, isString, isUndefined } from 'lodash';
import React, { useState } from 'react';
import { Image, ImageBackground, ImageStyle, ImageStyle as RNImageStyle } from 'react-native';
// import FastImage, {ImageStyle} from 'react-native-fast-image';
import { consoleLog } from '../helpers/logHelper';

type ButtonsProps = {
  style?: ImageStyle;
  radius?: number;
  uri?: string | { uri: string };
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'center';
};

export default function AppImage(props: ButtonsProps) {
  const [error, setError] = useState(true);
  // const buttonBlock = props.block && styles.block;
  if (isUndefined(props.uri) || isNull(props.uri)) {
    return (
      <Image
        source={require('../../assets/images/default.png')}
        style={props.style as RNImageStyle}
        resizeMode={props.resizeMode}
      />
    );
  }
  if (isString(props.uri)) {
    return (
      <ImageBackground
        imageStyle={props.radius && { borderRadius: props.radius }}
        style={props.style}
        source={(error && require('../../assets/images/default.png')) || null}>
        <Image
          source={{
            uri: props.uri
          }}
          onError={() => {
            // consoleLog('FastImage onError');
            setError(true);
          }}
          onLoad={() => {
            // consoleLog(props.uri, 'onLoad');
            setError(false);
          }}
          style={props.style}
          resizeMode={props.resizeMode || 'cover'}
        />
        {/* <FastImage
          style={props.style}
          source={{
            uri: props.uri,
            priority: FastImage.priority.normal
          }}
          onError={() => {
            // consoleLog('FastImage onError');
            setError(true);
          }}
          onLoad={() => {
            // consoleLog(props.uri, 'onLoad');
            setError(false);
          }}
          resizeMode={props.resizeMode || 'cover'}
        /> */}
      </ImageBackground>
    );
  }
  return (
    <Image resizeMode={props.resizeMode} source={props.uri} style={props.style as RNImageStyle} />
  );
}

// const styles = StyleSheet.create({
//   default: {},
// });
