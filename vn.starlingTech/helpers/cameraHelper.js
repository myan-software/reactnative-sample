// import { Alert } from 'react-native';
// import * as Permissions from 'expo-permissions';
// import * as ImagePicker from 'expo-image-picker';
// import * as ImageManipulator from 'expo-image-manipulator';

// const resizeWidth = 500;
// const resizeHeight = 500;

// export const getPermissionAsync = async pCamera => {
//   // if (devices.IS_IOS) {
//   const { status } = await Permissions.askAsync(pCamera);
//   if (status !== 'granted') {
//     Alert.alert('Bạn cần cấp quyền sử dụng máy ảnh để sử dụng chức năng này!');
//     return false;
//   }
//   // }
//   // return true;
// };

// export const launchCameraAsync = async () => {
//   if (
//     !getPermissionAsync(Permissions.CAMERA_ROLL) ||
//     !getPermissionAsync(Permissions.CAMERA)
//   ) {
//     return false;
//   }
//   const result = await ImagePicker.launchCameraAsync({
//     quality: 1,
//     allowsEditing: true,
//     aspect: [3, 3],
//     base64: false,
//     exif: false
//   });
//   if (result.cancelled) return;
//   const localUri = result.uri;
//   const filename = localUri.split('/').pop();
//   const match = /\.(\w+)$/.exec(filename);
//   const type = match ? `image/${match[1]}` : 'image';
//   return {
//     uri: localUri,
//     name: filename,
//     type,
//     width: result.width,
//     height: result.height,
//     base64: result.base64
//   };
// };

// export const launchImageLibraryAsync = async () => {
//   if (!getPermissionAsync(Permissions.CAMERA_ROLL)) {
//     return false;
//   }
//   const result = await ImagePicker.launchImageLibraryAsync({
//     quality: 1,
//     mediaTypes: 'Images',
//     allowsEditing: true,
//     aspect: [4, 3],
//     base64: false,
//     exif: true
//   });
//   if (result.cancelled) return;
//   const localUri = result.uri;
//   const filename = localUri.split('/').pop();
//   const match = /\.(\w+)$/.exec(filename);
//   const type = match ? `image/${match[1]}` : 'image';
//   return {
//     uri: localUri,
//     name: filename,
//     type,
//     width: result.width,
//     height: result.height,
//     base64: result.base64
//   };
// };

// export const resizeImage = async image => {
//   let widthNew = image.width < image.height ? resizeHeight : resizeWidth;
//   let heightNew = Math.floor(widthNew * (image.height / image.width));
//   if (heightNew > (image.width < image.height ? resizeWidth : resizeHeight)) {
//     heightNew = image.width < image.height ? resizeWidth : resizeHeight;
//     widthNew = Math.floor(heightNew * (image.width / image.height));
//   }
//   const imageNew = await ImageManipulator.manipulateAsync(image.uri, [
//     { resize: { width: widthNew, height: heightNew } }
//   ]);
//   return { ...image, ...imageNew };
// };
