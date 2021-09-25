import { consoleLog } from '@vn.starlingTech/helpers/logHelper';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomInput from 'src/components/CustomInput';
import CustomText from 'src/components/CustomText';
import SearchIcon from '../../../../assets/svg/SearchIcon';

type Props = {
  navigation: any;
  onSearch: (keyword: string) => void;
};

const SearchComponent = (props: Props) => {
  const {navigation, onSearch} = props;

  const onCreate = () => {
    navigation.navigate('CommunityCreate');
  };

  const _onSearch = (event: any) => {
    onSearch(event.nativeEvent.text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewInput}>
        <SearchIcon />
        <CustomInput
          style={styles.input}
          placeholder={'キーワード検索'}
          placeholderTextColor={'#828282'}
          returnKeyType={'search'}
          onEndEditing={_onSearch}
        />
      </View>
      <TouchableOpacity onPress={onCreate}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0.2, y: 1.6}}
          colors={['#833AB4', '#FD1D1D', '#FCB045']}
          style={styles.button}>
          <CustomText style={styles.textButton}>{'新規作成'}</CustomText>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  viewInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: '#F2F2F2',
    height: 42,
    paddingLeft: 12,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    marginLeft: 23,
    marginRight: 8,
    height: 42,
  },
  button: {
    width: 112,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    marginLeft: 10,
  },
  textButton: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '700',
    lineHeight: 20,
  },
});

export default React.memo(SearchComponent);
