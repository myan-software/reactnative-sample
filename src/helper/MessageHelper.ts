import firestore from '@react-native-firebase/firestore';
import {UserProfileType} from '@vn.starlingTech/components/AppContext';

export const COLLECTION = {
  MESSAGE_THREADS: 'MESSAGE_THREADS',
  MESSAGES: 'MESSAGES',
};

export const FIELD = {
  USERS: 'users',
  TYPE: 'type',
  CREATED_AT: 'createdAt',
};

export const TYPE_MESSAGE = {
  USER: 1,
  GROUP: 2,
  COMMUNITY: 3,
};

export const FLAG = {
  NOTIFICATION_ON: 1,
};

/**
 * create chat user
 * @param user
 * @param partner
 * @param callbackSuccess
 * @param callbackError
 */
export const createThreadUser = (
  user: UserProfileType | null,
  partner: UserProfileType | null,
  callbackSuccess?: (docRef: any) => void,
  callbackError?: (error: any) => void,
) => {
  firestore()
    .collection(COLLECTION.MESSAGE_THREADS)
    .add({
      name: '',
      names: [
        {
          id: user?.id ? user.id.toString() : '',
          name: user?.name ? user.name.toString() : '',
        },
        {
          id: partner?.id ? partner.id.toString() : '',
          name: partner?.name ? partner.name.toString() : '',
        },
      ],
      type: TYPE_MESSAGE.USER,
      users: [user?.id.toString(), partner?.id.toString()],
      avatar: '',
      avatars: [
        {
          id: user?.id ? user.id.toString() : '',
          avatar: user?.avatar ? user.avatar.toString() : '',
        },
        {
          id: partner?.id ? partner.id.toString() : '',
          avatar: partner?.avatar ? partner.avatar.toString() : '',
        },
      ],
      createdAt: new Date().getTime(),
    })
    .then((docRef: any) => {
      //console.log('Document written with ID: ', docRef.id);
      if (callbackSuccess) {
        callbackSuccess(docRef);
      }
    })
    .catch((error: any) => {
      console.error('Error adding document: ', error);
      if (callbackError) {
        callbackError(error);
      }
    });
};

/**
 * create chat group/community
 * @param user
 * @param typeThread
 * @param nameThread
 * @param callbackSuccess
 * @param callbackError
 */
export const createThreadGroup = (
  user: UserProfileType | null,
  typeThread: number,
  nameThread: string,
  callbackSuccess?: (docRef: any) => void,
  callbackError?: (error: any) => void,
) => {
  let data;
  switch (typeThread) {
    case TYPE_MESSAGE.GROUP:
      data = {
        name: nameThread,
        type: TYPE_MESSAGE.GROUP,
        users: [user?.id.toString()],
        avatars: [
          {
            user: user?.id.toString(),
            avatar: user?.avatar,
          },
        ],
        createdAt: new Date().getTime(),
      };
      break;
    case TYPE_MESSAGE.COMMUNITY:
      data = {
        name: nameThread,
        type: TYPE_MESSAGE.COMMUNITY,
        users: [user?.id.toString()],
        avatars: [
          {
            user: user?.id.toString(),
            avatar: user?.avatar,
          },
        ],
        createdAt: new Date().getTime(),
      };
      break;
    default:
      break;
  }

  if (!data) {
    return;
  }

  firestore()
    .collection(COLLECTION.MESSAGE_THREADS)
    .add(data)
    .then((docRef: any) => {
      // message to thread in detail: create thread
      firestore()
        .collection(COLLECTION.MESSAGE_THREADS)
        .doc(docRef.id)
        .collection(COLLECTION.MESSAGES)
        .add({
          text:
            '本サービス内にて外部SNS等への誘導は、禁止させていただいております。外部SNSでは弊社セキュリティ対象外となりますため、皆さんが安心して使えるようご協力をお願いいたします。',
          createdAt: new Date().getTime(),
          systemMessage: true,
        })
        .then(() => {
          // message to thread in list : create thread
          firestore()
            .collection(COLLECTION.MESSAGE_THREADS)
            .doc(docRef.id)
            .set(
              {
                latestMessage: {
                  text:
                    '本サービス内にて外部SNS等への誘導は、禁止させていただいております。外部SNSでは弊社セキュリティ対象外となりますため、皆さんが安心して使えるようご協力をお願いいたします。',
                  createdAt: new Date().getTime(),
                },
                seenBy: [],
              },
              {merge: true},
            )
            .then(() => {
              if (callbackSuccess) {
                callbackSuccess(docRef);
              }
            });
        });
    })
    .catch((error: any) => {
      console.error('Error adding document: ', error);
      if (callbackError) {
        callbackError(error);
      }
    });
};

/**
 * chat with user
 * @param user
 * @param partner
 * @param navigation
 * @param callbackSuccess
 * @param callbackError
 */
export const joinThreadUser = (
  user: UserProfileType | null,
  partner: UserProfileType | null,
  navigation: any,
  callbackSuccess?: (thread: any) => void,
  callbackError?: (error: any) => void,
) => {
  firestore()
    .collection(COLLECTION.MESSAGE_THREADS)
    .where(FIELD.TYPE, '==', TYPE_MESSAGE.USER)
    .where(FIELD.USERS, 'array-contains', user?.id.toString())
    .get()
    .then((docRef: any) => {
      const array: any = [];
      docRef.docs.forEach((doc: any) => {
        const data = doc.data();
        if (data.users.includes(partner?.id.toString())) {
          array.push({...data, id: doc.id});
        }
      });

      // navigate to history chat
      if (array.length > 0) {
        if (callbackSuccess) {
          callbackSuccess({id: docRef.id, ...docRef.data()});
        }
        const params = {
          id: array[0].id,
          name: array[0].names.filter(
            (_user: any) => _user.id.toString() === partner?.id.toString(),
          )[0].name,
        };
        navigation.navigate('Message');
        setTimeout(() => {
          navigation.navigate('MessageDetail', {
            dataProps: params,
          });
        }, 300);
        return;
      }

      // create new history chat user
      createThreadUser(user, partner, (docRef: any) => {
        // navigate to history chat
        navigation.navigate('Message');
        setTimeout(() => {
          navigation.navigate('MessageDetail', {
            dataProps: {
              id: docRef.id,
              name: partner?.name ? partner.name.toString() : '',
            },
          });
        }, 300);
      });
    })
    .catch((error: any) => {
      //console.log('error join thread', error);
      if (callbackError) {
        callbackError(error);
      }
    });
};

/**
 * user join group/community chat
 * @param idThread
 * @param newUser
 * @param callbackSuccess
 * @param callbackError
 */
export const joinThreadGroup = (
  idThread: string,
  newUser: UserProfileType | null,
  callbackSuccess?: (docRef: any) => void,
  callbackError?: (error: any) => void,
) => {
  // get thread group/community chat
  firestore()
    .collection(COLLECTION.MESSAGE_THREADS)
    .doc(idThread)
    .get()
    .then((docRef: any) => {
      const dataThread = docRef.data();
      // user already in the thread
      if (dataThread.users.includes(newUser?.id.toString())) {
        if (callbackSuccess) {
          callbackSuccess(docRef);
        }
        return;
      }

      let newUsers = [...dataThread?.users, newUser?.id.toString()];
      newUsers = [...new Set(newUsers)];
      // add user to thread
      firestore()
        .collection(COLLECTION.MESSAGE_THREADS)
        .doc(idThread)
        .set(
          {
            users: newUsers,
            latestMessage: {
              text: `${newUser?.name} が加入しました。`,
              createdAt: new Date().getTime(),
            },
            seenBy: [],
          },
          {merge: true},
        )
        .then(() => {
          // message to thread: user join thread
          firestore()
            .collection(COLLECTION.MESSAGE_THREADS)
            .doc(idThread)
            .collection(COLLECTION.MESSAGES)
            .add({
              text: `${newUser?.name} が加入しました。`,
              createdAt: new Date().getTime(),
              systemMessage: true,
            })
            .then(() => {
              if (callbackSuccess) {
                callbackSuccess(docRef);
              }
            });
        })
        .catch((error: any) => {
          //console.log('error join thread', error);
          if (callbackError) {
            callbackError(error);
          }
        });
    })
    .catch((error: any) => {
      //console.log('error join thread', error);
      if (callbackError) {
        callbackError(error);
      }
    });
};

/**
 * remove user from group/community
 * @param idThread
 * @param removeUser
 * @param isKicked
 * @param callbackSuccess
 * @param callbackError
 */
export const removeUserFromThread = (
  idThread: string,
  removeUser: UserProfileType | null,
  isKicked: boolean,
  callbackSuccess?: (docRef: any) => void,
  callbackError?: (error: any) => void,
) => {
  // get thread group/community chat
  firestore()
    .collection(COLLECTION.MESSAGE_THREADS)
    .doc(idThread)
    .get()
    .then((docRef: any) => {
      const dataThread = docRef.data();
      // user not in the thread
      if (!dataThread.users.includes(removeUser?.id.toString())) {
        return;
      }
      const newUsers = dataThread?.users.filter(
        (idUser: any) => idUser.toString() !== removeUser?.id.toString(),
      );

      // remove user from thread
      firestore()
        .collection(COLLECTION.MESSAGE_THREADS)
        .doc(idThread)
        .set(
          {
            users: newUsers,
            latestMessage: {
              text: `${removeUser?.name} ${
                isKicked ? 'が追放されました。' : 'が脱退しました。'
              }`,
              createdAt: new Date().getTime(),
            },
            seenBy: [],
          },
          {merge: true},
        )
        .then(() => {
          // message to thread: user remove from thread
          firestore()
            .collection(COLLECTION.MESSAGE_THREADS)
            .doc(idThread)
            .collection(COLLECTION.MESSAGES)
            .add({
              text: `${removeUser?.name} ${
                isKicked ? 'が追放されました。' : 'が脱退しました。'
              }`,
              createdAt: new Date().getTime(),
              systemMessage: true,
            })
            .then(() => {
              if (callbackSuccess) {
                callbackSuccess(docRef);
              }
            });
        })
        .catch((error: any) => {
          //console.log('error remove user from thread', error);
          if (callbackError) {
            callbackError(error);
          }
        });
    })
    .catch((error: any) => {
      //console.log('error remove user from thread', error);
      if (callbackError) {
        callbackError(error);
      }
    });
};

/**
 * navigate to screen chat detail
 * @param docId 
 * @param navigation 
 * @param callbackSuccess 
 * @param callbackError 
 */
export const goToChatDetail = (
  docId: string,
  navigation: any,
  callbackSuccess?: (docRef: any) => void,
  callbackError?: (error: any) => void,
) => {
  firestore()
    .collection(COLLECTION.MESSAGE_THREADS)
    .doc(docId)
    .get()
    .then((docRef: any) => {
      if (callbackSuccess) {
        callbackSuccess(docRef);
      }
      navigation.navigate('Message');
      setTimeout(() => {
        navigation.navigate('MessageDetail', {
          dataProps: {
            id: docId,
            ...docRef.data(),
          },
        });
      }, 300);
    })
    .catch((error: any) => {
      if (callbackError) {
        callbackError(error);
      }
    });
};

/**
 * delete thread group
 * @param docId 
 * @param callbackSuccess 
 * @param callbackError 
 */
 export const deleteThreadGroup = (
  docId: string,
  callbackSuccess?: (docRef: any) => void,
  callbackError?: (error: any) => void,
) => {
  firestore()
    .collection(COLLECTION.MESSAGE_THREADS)
    .doc(docId)
    .delete()
    .then((docRef: any) => {
      if (callbackSuccess) {
        callbackSuccess(docRef);
      }
    })
    .catch((error: any) => {
      if (callbackError) {
        callbackError(error);
      }
    });
};
