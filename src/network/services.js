import request from './request';
const services = {
  getProfile: (data = {type: 'google'}) => {
    let url = 'getProfile';
    return request.post(url, data);
  },
  updateProfile: (
    data = {
      name,
      avatar,
      description,
      age,
      gender,
      city_id,
      category_id,
      facebook_url,
      instagram_url,
      twitter_url,
    },
  ) => {
    let url = 'updateProfile';
    return request.post(url, data);
  },
  getCities: (data = {}) => {
    let url = 'getCities';
    return request.post(url, data);
  },
  getGenders: (data = {}) => {
    let url = 'getGenders';
    return request.post(url, data);
  },
  getCategories: (data = {}) => {
    let url = 'getCategories';
    return request.post(url, data);
  },
  getPosts: (data = {user_id, page, category_id}) => {
    let url = 'getPosts';
    return request.post(url, data);
  },
  searchPost: (data = {keyword}) => {
    let url = 'searchPosts';
    return request.post(url, data);
  },
  searchUsers: (data = {keyword}) => {
    let url = 'searchUsers';
    return request.post(url, data);
  },
  blockUser: (data = {user_id, block_user_id}) => {
    let url = 'user/block';
    return request.post(url, data);
  },
  getDetailPost: (data = {id}) => {
    let url = 'detailPost';
    return request.post(url, data);
  },
  creatPost: (data = {}) => {
    let url = 'createPost';
    return request.post(url, data);
  },
  updatePost: (data = {}) => {
    let url = 'updatePost';
    return request.post(url, data);
  },
  upImage: (data = {image}) => {
    let url = 'uploadImage';
    return request.post(url, data);
  },
  checkUserToGroup: (data = {user_id, post_id}) => {
    let url = 'checkUserToGroup';
    return request.post(url, data);
  },
  requestToGroup: (data = {user_id, post_id}) => {
    let url = 'requestToGroup';
    return request.post(url, data);
  },
  leaveGroup: (data = {user_id, post_id}) => {
    let url = 'leaveGroup';
    return request.post(url, data);
  },
  deleteGroup: (data = {user_id, post_id}) => {
    let url = 'deleteGroup';
    return request.post(url, data);
  },
  deletePost: (data = {user_id, post_id}) => {
    let url = 'deletePost';
    return request.post(url, data);
  },
  deleteFavorite: (data = {user_id, post_id}) => {
    let url = 'deleteFavorite';
    return request.post(url, data);
  },
  addFavorite: (data = {user_id, post_id}) => {
    let url = 'addFavorite';
    return request.post(url, data);
  },
  getFollows: (data = {user_id}) => {
    let url = 'getFollows';
    return request.post(url, data);
  },
  getFollower: (data = {user_id}) => {
    let url = 'getFollower';
    return request.post(url, data);
  },
  unfollowUser: (data = {user_id}) => {
    let url = 'unfollowUser';
    return request.post(url, data);
  },
  followUser: (data = {user_id}) => {
    let url = 'followUser';
    return request.post(url, data);
  },
  getFavorites: (data = {user_id}) => {
    let url = 'getFavorites';
    return request.post(url, data);
  },
  getListBlocks: (data = {user_id}) => {
    let url = 'getListBlocks';
    return request.post(url, data);
  },
  sendQuestion: (data = {name, email, content, user_id}) => {
    let url = 'sendQuestion';
    return request.post(url, data);
  },
  unblockUser: (data = {user_id, block_user_id}) => {
    let url = 'unblockUser';
    return request.post(url, data);
  },
  getExpirePosts: (data = {user_id, block_user_id}) => {
    let url = 'getExpirePosts';
    return request.post(url, data);
  },
  getInfoCancelSubcription: (data = {}) => {
    let url = 'getInfoCancelSubcription';
    return request.post(url, data);
  },
  cancelSubcription: (data = {user_id}) => {
    let url = 'cancelSubcription';
    return request.post(url, data);
  },
  getListCommunityWaitApprove: (data = {user_id}) => {
    let url = 'getListCommunityWaitApprove';
    return request.post(url, data);
  },
  getListGroupWaitApprove: (data = {user_id}) => {
    let url = 'getListGroupWaitApprove';
    return request.post(url, data);
  },
  getListUsersWaitApprove: (data = {user_id}) => {
    let url = 'getListUsersWaitApprove';
    return request.post(url, data);
  },
  acceptToGroup: (data = {user_id, post_id}) => {
    let url = 'acceptToGroup';
    return request.post(url, data);
  },
  rejectToGroup: (data = {user_id, post_id}) => {
    let url = 'rejectToGroup';
    return request.post(url, data);
  },
  cancelRequestToGroup: (data = {user_id, post_id}) => {
    let url = 'cancelRequestToGroup';
    return request.post(url, data);
  },
  getJoinGroup: (data = {user_id, page}) => {
    let url = 'getJoinGroup';
    return request.post(url, data);
  },
  getListNotifications: (data = {user_id}) => {
    let url = 'getListNotifications';
    return request.post(url, data);
  },
};
export default services;
