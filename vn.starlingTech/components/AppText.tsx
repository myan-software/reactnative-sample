import {Text} from 'native-base';
import React, {ReactElement} from 'react';
import {TextStyle, StyleSheet, StyleProp} from 'react-native';

import colors from '../../vn.starlingTech/config/colors';

type TextProp = {
  style?: StyleProp<TextStyle>;
  title?: boolean | null;
  bold?: boolean;
  children: string | number | ReactElement;
  numberOfLines?: number;
  note?: boolean;
  center?: boolean;
  adjustsFontSizeToFit?: boolean;
};

function AppText(props: TextProp) {
  const textStyle = props.title && styles.title;
  const noteStyle = props.note && styles.note;
  const centerStyle = props.center && styles.center;
  const boldStyle = props.bold && styles.bold;
  let fontWeightStyle = {};

  // if (props.style && props.style.fontWeight) {
  //   const { fontWeight } = props.style;
  //   // consoleLog(fontWeight, 'fontWeight');
  //   switch (fontWeight) {
  //     case '100':
  //     case '200':
  //     case '300':
  //     case '400':
  //       fontWeightStyle = { fontFamily: 'SF UI Display' };
  //       break;
  //     case '500':
  //     case '600':
  //     case '700':
  //     case '800':
  //     case '900':
  //     case 'bold':
  //       fontWeightStyle = { fontFamily: 'SF UI Display Medium' };
  //       break;
  //   }
  // }

  return (
    <Text
      {...props}
      adjustsFontSizeToFit={props.adjustsFontSizeToFit !== undefined}
      style={[
        styles.text,
        fontWeightStyle,
        textStyle,
        noteStyle,
        centerStyle,
        boldStyle,
        props.style,
      ]}>
      {props.children}
    </Text>
  );
}

export default AppText;

const styles = StyleSheet.create({
  bold: {
    fontFamily: 'NotoSans-Bold',
    // fontWeight: 'bold',
  },
  center: {
    textAlign: 'center',
  },
  note: {
    color: '#828282',
    fontFamily: 'NotoSans-Regular',
    fontSize: 10,
    fontWeight: '300',
    lineHeight: 14,
  },
  text: {
    color: colors.text,
    fontFamily: 'NotoSans',
    fontSize: 12,
    lineHeight: 16,
  },
  title: {
    // fontFamily: 'SF UI Display Medium'
    // fontSize: 15,
    fontWeight: '600',
    // lineHeight: 21,
  },
  // fontWeight300: {
  //   fontFamily: "Roboto-Thin",
  // },
  // fontWeight400: {
  //   fontFamily: "Roboto-Regular",
  // },
  // fontWeight500: {
  //   fontWeight: "500",
  //   fontFamily: "Roboto-Medium",
  // },
  // fontWeight700: {
  //   fontFamily: "Roboto-Bold",
  // },
  // fontWeight900: {
  //   fontFamily: "Roboto-Bold",
  // },
});
