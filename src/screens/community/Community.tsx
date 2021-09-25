import React, {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import HeaderApp from 'src/components/HeaderApp';
import ButtonsComponent from './components/Community.Buttons';
import ListComponent, {TYPE_COMMUNITY} from './components/Community.List';
import SearchComponent from './components/Community.Search';

type Props = {
  navigation: any;
};

const Community = (props: Props) => {
  const {navigation} = props;
  const [keyword, setKeyword] = useState<string>('');

  const onSearch = (_keyword: string) => {
    setKeyword(_keyword);
  };

  return (
    <>
      <HeaderApp navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <SearchComponent navigation={navigation} onSearch={onSearch} />
        <ListComponent
          type={TYPE_COMMUNITY.FAVORITE}
          navigation={navigation}
          keyword={keyword}
        />
        <ListComponent
          type={TYPE_COMMUNITY.RECOMMEND}
          navigation={navigation}
          keyword={keyword}
        />
        <ButtonsComponent navigation={navigation} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default Community;
