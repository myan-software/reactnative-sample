import CONSTANTS from '@vn.starlingTech/config/Constant';
import {isSuccessResponse} from '@vn.starlingTech/helpers/networkingHelper';
import AppNetworking from '@vn.starlingTech/network/AppNetworking';
import {API} from '@vn.starlingTech/network/Server';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomText from 'src/components/CustomText';
import AnimeIcon from '../../../../assets/svg/AnimeIcon';
import ComicIcon from '../../../../assets/svg/ComicIcon';
import GameIcon from '../../../../assets/svg/GameIcon';
import MoreSquareIcon from '../../../../assets/svg/MoreSquareIcon';
import PaintBoardAndBrushIcon from '../../../../assets/svg/PaintBoardAndBrushIcon';
import TeamLeaderIcon from '../../../../assets/svg/TeamLeaderIcon';
import VideoCameraIcon from '../../../../assets/svg/VideoCameraIcon';

type Props = {
  navigation: any;
};

const ButtonsComponent = (props: Props) => {
  const {navigation} = props;
  const [listCategories, setListCategories] = useState<any>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const networking = new AppNetworking();
    networking.init({
      url: API.GET_CATEGORIES,
      params: {},
    });
    const {data, status, message} = await networking.postToServer();
    if (isSuccessResponse(status)) {
      setListCategories(data);
    }
  };

  const onPress = (item: any) => () => {
    navigation.navigate('CommunityList', {
      title: item?.name,
      categoryId: item?.id,
    });
  };

  const renderIcon = (id: number) => {
    switch (id) {
      case 1:
        return <VideoCameraIcon />;
      case 2:
        return <GameIcon />;
      case 3:
        return <PaintBoardAndBrushIcon />;
      case 4:
        return <AnimeIcon />;
      case 5:
        return <ComicIcon />;
      case 6:
        return <TeamLeaderIcon />;
      case 7:
        return <MoreSquareIcon />;
      default:
        return <MoreSquareIcon />;
    }
  };

  const renderItem = ({item, index}: any) => {
    return (
      <View
        style={[
          styles.item,
          {
            paddingLeft: index % 2 === 0 ? 0 : 5,
            paddingRight: index % 2 === 0 ? 5 : 0,
          },
        ]}>
        <TouchableOpacity style={styles.button} onPress={onPress(item)}>
          {renderIcon(item?.id)}
          <CustomText style={styles.text}>{item?.name}</CustomText>
        </TouchableOpacity>
      </View>
    );
  };

  if (listCategories.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <CustomText style={[styles.text, {marginLeft: 0, marginBottom: 10}]}>
        {'ジャンル'}
      </CustomText>
      <FlatList
        data={listCategories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  text: {
    flex: 1,
    fontSize: 14,
    color: '#000000',
    fontWeight: '400',
    lineHeight: 20,
    marginLeft: 5,
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item: {
    width: (CONSTANTS.screenWidth - 20) / 2,
    height: 57,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    borderRadius: 14,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 14,
    paddingRight: 10,
  },
});

export default React.memo(ButtonsComponent);
