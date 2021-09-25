import React, {Component} from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import services from 'src/network/services';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import CustomText from 'src/components/CustomText';
import LinearGradient from 'react-native-linear-gradient';
import colors from 'src/constant/color';
import HeaderScreen from 'src/components/HeaderScreen';
import Ripple from 'react-native-material-ripple';
import images from 'src/assets/images';
class ListUserBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      done: false,
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData = async () => {
    try {
      let rs = await services.getListBlocks({user_id: this.props.user.id});
      let data = rs.data.map((item, index) => {
        item.block = true;
        return item;
      });
      this.setState({data, done: true});
    } catch (error) {
      //console.log(error);
    }
  };

  toggle = async (item, index) => {
    try {
      if (item.block) {
        await services.unblockUser({
          user_id: this.props.user.id,
          block_user_id: item.id,
        });
      } else {
        await services.blockUser({
          user_id: this.props.user.id,
          block_user_id: item.id,
        });
      }
      var data = [...this.state.data];
      data[index] = {
        ...this.state.data[index],
        block: !this.state.data[index].block,
      };
      this.setState({data});
    } catch (error) {
      console.error(error);
    }
  };
  renderItem = ({item, index}) => (
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.overAvatar}
        onPress={() => {
          this.props.navigation.navigate('DetailUser', {user: item});
        }}>
        <FastImage
          source={
            item.avatar
              ? {
                  uri: item.avatar,
                }
              : images.avatar
          }
          style={styles.imgAvatar}
        />
      </TouchableOpacity>
      <View style={styles.center}>
        <CustomText style={styles.name}>{item.name}</CustomText>
        {/* <CustomText style={styles.subName}>{item.email}</CustomText> */}
      </View>
      <View style={styles.right}>
        <LinearGradient
          colors={colors.linearGradient}
          start={{x: 0.13, y: 0.1}}
          end={{x: 0.3, y: 2.45}}
          locations={[0, 0.4, 0.9]}
          style={styles.linerBt}>
          <Ripple style={styles.bt} onPress={() => this.toggle(item, index)}>
            <CustomText style={styles.txtButton}>
              {item.block ? 'ブロックを解除する' : 'ブロック'}
            </CustomText>
          </Ripple>
        </LinearGradient>
      </View>
    </View>
  );
  keyExtractor = (item, index) => 'item' + index;
  render() {
    const {data, done} = this.state;
    return (
      <View>
        <HeaderScreen
          navigation={this.props.navigation}
          title="ブロックリスト"
        />
        <FlatList
          data={data}
          ListEmptyComponent={
            done ? (
              <CustomText style={styles.txtLoad}>ユーザーがいません</CustomText>
            ) : null
          }
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  overAvatar: {
    width: 45,
    height: 45,
    overflow: 'hidden',
    borderRadius: 25,
  },
  imgAvatar: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  center: {
    flex: 1,
    paddingLeft: 20,
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: '700',
    fontSize: 17,
  },
  subName: {
    fontSize: 12,
    color: '#828282',
  },
  linerBt: {
    width: 112,
    height: 24,
    borderRadius: 12,
  },
  bt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtButton: {
    fontSize: 10,
    color: '#fff',
  },
  txtSubButton: {
    fontSize: 12,
    color: '#828282',
    marginTop: 2,
    textAlign: 'right',
    paddingRight: 2,
  },
  txtLoad: {
    textAlign: 'center',
    marginTop: 12,
  },
});
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};
export default connect(mapStateToProps)(ListUserBlock);
