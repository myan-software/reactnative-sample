import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomInput from 'src/components/CustomInput';
import CustomText from 'src/components/CustomText';

type Props = {
  onSend: (text: string) => void;
  editable?: boolean;
  byMe?: boolean;
};

const InputComponent = (props: Props) => {
  const {onSend, editable = true, byMe = false} = props;
  const [text, setText] = useState<string>('');

  const onChangeText = (_text: string) => {
    setText(_text);
  };

  const _onSend = () => {
    setText('');
    onSend(text);
  };

  if (!editable) {
    return (
      <LinearGradient
        start={{x: 0.01, y: 0.1}}
        end={{x: 0.03, y: 2}}
        colors={['#833AB4', '#FD1D1D', '#FCB045']}
        style={styles.viewBlock}>
        <CustomText style={styles.textBlock}>
          {byMe ? 'ブロックしているため、利用することが出来ません。' : 'ブロックされているため、利用することが出来ません。'}
        </CustomText>
      </LinearGradient>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.viewInput}>
        <CustomInput
          style={styles.input}
          placeholder={'Aa...'}
          placeholderTextColor={'#828282'}
          returnKeyType={'send'}
          value={text}
          onChangeText={onChangeText}
          onSubmitEditing={_onSend}
        />
        {/* <SmileIcon /> */}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  viewInput: {
    height: 56,
    backgroundColor: '#F2F2F2',
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    height: '100%',
  },
  viewBlock: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  textBlock: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '400',
    lineHeight: 20,
  },
});

export default React.memo(InputComponent);
