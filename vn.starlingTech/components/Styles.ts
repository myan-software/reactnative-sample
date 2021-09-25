import {PixelRatio, StyleSheet} from 'react-native';
import colors from '../config/colors';

export const borderWidth = 1 / PixelRatio.getPixelSizeForLayoutSize(1);

export default StyleSheet.create({
  bgTransparent: {backgroundColor: 'transparent'},
  bgWhite: {backgroundColor: '#FFF'},
  bgWindow: {backgroundColor: colors.windowBackground},
  bordered: {
    borderColor: colors.border,
    borderWidth,
  },
  bottomBordered: {
    borderBottomColor: colors.border,
    borderBottomWidth: borderWidth,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    height: 54,
    marginTop: 16,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 26,
  },
  buttonTextDisabled: {
    color: '#999',
  },
  buttonTryAgain: {height: 54, marginTop: 15, width: 120},
  card: {
    borderTopColor: 'rgba(6,6,6,0)',
    borderTopWidth: borderWidth,
    elevation: 15,
    shadowColor: '#444',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  cardContent: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 14,
    width: '100%',
  },
  cardCover: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19,
    marginBottom: 8,
  },
  colorBlack: {color: '#000000'},
  colorWhite: {color: '#FFFFFF'},
  contentCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  fade: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 9,
  },
  fill: {flex: 1},
  fontWeight3: {fontWeight: '300'},

  fontWeight4: {fontWeight: '400'},

  fontWeight5: {fontWeight: '500'},
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 9,
  },
  headerShadow: {
    borderBottomColor: '#e9e9e9',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
  },
  headerTitle: {
    color: '#FFF',
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 21,
    textAlign: 'center',
  },

  hor16: {paddingHorizontal: 16},

  infoContainer: {backgroundColor: '#FFF', marginTop: 13, paddingBottom: 14},
  inputErrTxt: {
    color: 'red',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
    marginTop: 8,
  },
  leftBordered: {
    borderLeftColor: colors.border,
    borderLeftWidth: borderWidth,
  },
  noBorder: {borderWidth: 0},
  noMargin: {marginBottom: 0, marginLeft: 0, marginRight: 0, marginTop: 0},
  normalTxt: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
  },
  rightBordered: {
    borderRightColor: colors.border,
    borderRightWidth: borderWidth,
  },

  row: {flexDirection: 'row'},
  rowCenter: {alignItems: 'center', flexDirection: 'row'},
  socialView: {alignItems: 'center', flexDirection: 'row', marginTop: 36},
  titleTxt: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 19,
    marginBottom: 8,
    marginHorizontal: 16,
    marginTop: 24,
  },
  topBordered: {
    borderTopColor: colors.border,
    borderTopWidth: borderWidth,
  },

  transparent: {backgroundColor: 'transparent'},
});
