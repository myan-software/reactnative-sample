import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import {connect} from 'react-redux';
import CustomText from '../../components/CustomText';
import HeaderApp from '../../components/HeaderApp';
import colors from '../../constant/color';
import LinearGradient from 'react-native-linear-gradient';
import handleStore from '../../redux/handleStore';
import services from '../../network/services';
import SplashScreen from 'react-native-splash-screen';
import ListPost from '../post/ListPost';
import RNIap, {
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';
import AppNetworking from '@vn.starlingTech/network/AppNetworking';
import {API} from '@vn.starlingTech/network/Server';
import {AppContext} from '@vn.starlingTech/components/AppContext';
import CONSTANTS from '@vn.starlingTech/config/Constant';
import {isSuccessResponse} from '@vn.starlingTech/helpers/networkingHelper';
import {showMessageError} from '@vn.starlingTech/helpers/messageHelper';

var data = ['全て', 'エンターテイメント', 'ゲーム', '音楽/芸能', 'アニメ'];
class Home extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  purchaseUpdateSubscription = null;
  purchaseErrorSubscription = null;

  purchaseListener = () => {
    RNIap.initConnection().then(() => {
      // we make sure that "ghost" pending payment are removed
      // (ghost = failed pending payment that are still marked as pending in Google's native Vending module cache)
      RNIap.flushFailedPurchasesCachedAsPendingAndroid()
        .catch(() => {
          // exception can happen here if:
          // - there are pending purchases that are still pending (we can't consume a pending purchase)
          // in any case, you might not want to do anything special with the error
        })
        .then(() => {
          this.purchaseUpdateSubscription = purchaseUpdatedListener(
            async (purchase) => {
              //console.log('purchaseUpdatedListener', purchase);
              const receipt = purchase.transactionReceipt;
              if (receipt) {
                const networking = new AppNetworking();
                networking.init({
                  showErrorType: 'ALERT',
                  url: API.UPDATE_PAYMENT,
                  params: {
                    user_id: this.context.user?.id,
                    product_id: CONSTANTS.purchase.PRODUCT_ID,
                    trans_id: CONSTANTS.IS_IOS
                      ? purchase.transactionId
                      : purchase.purchaseToken,
                    trans_date: purchase.transactionDate,
                    platform: Platform.OS,
                  },
                });
                const {status} = await networking.postToServer();
                if (isSuccessResponse(status)) {
                  // Tell the store that you have delivered what has been paid for.
                  // Failure to do this will result in the purchase being refunded on Android and
                  // the purchase event will reappear on every relaunch of the app until you succeed
                  // in doing the below. It will also be impossible for the user to purchase consumables
                  // again until you do this.
                  await RNIap.finishTransaction(purchase, true);
                  this.context.setSubscription(true);
                  // If not consumable
                  // await RNIap.finishTransaction(purchase, false);
                } else {
                  // Retry / conclude the purchase is fraudulent, etc...
                }
              }
            },
          );

          this.purchaseErrorSubscription = purchaseErrorListener((error) => {
            showMessageError(error.message);
            // console.warn('purchaseErrorListener', error);
          });
        });
    });
  };

  componentDidMount() {
    SplashScreen.hide();
    this.getCategories();
    this.getCities();
    this.getProfile();
    this.getGenders();

    this.purchaseListener();
  }

  componentWillUnmount() {
    if (this.purchaseUpdateSubscription) {
      this.purchaseUpdateSubscription.remove();
      this.purchaseUpdateSubscription = null;
    }
    if (this.purchaseErrorSubscription) {
      this.purchaseErrorSubscription.remove();
      this.purchaseErrorSubscription = null;
    }
  }

  async getCategories() {
    try {
      let rs = await services.getCategories();
      handleStore.setCategories(rs.data);
    } catch (error) {
      //console.log(error);
    }
  }
  async getCities() {
    try {
      let rs = await services.getCities();
      handleStore.setCities(rs.data);
    } catch (error) {
      //console.log(error);
    }
  }
  async getGenders() {
    try {
      let rs = await services.getGenders();
      handleStore.setGender(rs.data);
    } catch (error) {
      //console.log(error);
    }
  }
  async getFollows() {
    try {
      let rs = await services.getFollows({user_id: this.props.user.id});
      let follows = {};
      rs.data.map((item, index) => {
        follows[item.follow_user_id] = true;
      });
      handleStore.setFollows(follows);
    } catch (error) {
      //console.log('error get follows', error);
    }
  }
  async getFavorites() {
    try {
      var page = 1;
      var data = [];
      for (var i = 0; ; i++) {
        let rs = await services.getFavorites({
          user_id: this.props.user.id,
          page,
        });
        data = data.concat(rs.data.data);
        page += 1;
        if (!rs.next_page_url) break;
      }
      let favorites = {};
      data.map((item, index) => {
        favorites[item.id] = {
          like: true,
          count: item.like,
        };
      });
      handleStore.setFavorites(favorites);
    } catch (error) {
      //console.log('error get favorites', error);
    }
  }

  async getProfile() {
    try {
      let rs = await services.getProfile({type: this.props.typeLogin});
      handleStore.setUser(rs.result);
      this.getFollows();
      this.getFavorites();
    } catch (error) {
      //console.log(error);
    }
  }

  onPageSelected = (e) => {
    if (this.state.index == e.nativeEvent.position) return;
    this.setState({index: e.nativeEvent.position});
    this.tab.scrollToIndex({
      animated: true,
      index: e.nativeEvent.position,
      viewOffset: 10,
    });
  };
  onClickTab(index) {
    this.viewPager.setPage(index);
    this.setState({index});
    this.tab.scrollToIndex({
      animated: true,
      index: index,
      viewOffset: 10,
    });
  }
  handleColor(item, index) {
    var lengthItem = item.length;
    var linergradient = {
      start: {x: 0.1, y: 0.1},
      end: {x: 0.2, y: 2},
      locations: [0, 0.3, 0.8],
    };
    if (lengthItem > 0 && lengthItem <= 3) {
      linergradient = {
        start: {x: 0.14, y: 0.1},
        end: {x: 0.5, y: 1.7},
        locations: [0, 0.3, 0.9],
      };
    }
    if (lengthItem > 3 && lengthItem <= 5) {
      linergradient = {
        start: {x: 0.1, y: 0.1},
        end: {x: 0.4, y: 2},
        locations: [0, 0.3, 0.9],
      };
    }
    if (lengthItem > 5 && lengthItem <= 11) {
      linergradient = {
        start: {x: 0.1, y: 0.1},
        end: {x: 0.2, y: 2.6},
        locations: [0, 0.3, 0.8],
      };
    }
    if (index === this.state.index) {
      linergradient.colors = colors.linearGradient;
    } else {
      linergradient.colors = ['#F2F2F2', '#F2F2F2', '#F2F2F2'];
    }

    return linergradient;
  }
  render() {
    let {categories} = this.props;
    let cateHome = [
      {
        id: 0,
        name: '全て',
      },
      ...categories,
    ];
    return (
      <View style={styles.container}>
        <HeaderApp navigation={this.props.navigation} />
        <View>
          <FlatList
            ref={(c) => (this.tab = c)}
            data={categories.length ? cateHome : []}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentListTab}
            renderItem={({item, index}) => (
              <LinearGradient
                {...this.handleColor(item, index)}
                style={styles.linerBtTab}>
                <TouchableOpacity
                  onPress={() => this.onClickTab(index)}
                  style={styles.btTab}>
                  <CustomText
                    style={{
                      color:
                        index === this.state.index ? '#fff' : colors.fontBlack,
                    }}>
                    {item.name}
                  </CustomText>
                </TouchableOpacity>
              </LinearGradient>
            )}
            keyExtractor={(item, index) => 'itemTab' + index}
          />
        </View>
        {categories.length ? (
          <ViewPager
            ref={(c) => (this.viewPager = c)}
            style={styles.viewPager}
            initialPage={this.state.index}
            // onPageScroll={this.onPageScroll}
            onPageSelected={this.onPageSelected}>
            {cateHome.map((item, index) => (
              <View key={index} style={{flex: 1}}>
                <ListPost
                  type={1}
                  categoryId={item.id}
                  navigation={this.props.navigation}
                />
              </View>
            ))}
          </ViewPager>
        ) : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  viewPager: {
    flex: 1,
  },
  linerBtTab: {
    height: 32,
    paddingHorizontal: 14,
    borderRadius: 14,
    marginRight: 10,
  },
  btTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentListTab: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 7,
  },
});
const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  typeLogin: state.userReducer.typeLogin,
  categories: state.userReducer.categories,
});
export default connect(mapStateToProps)(Home);
