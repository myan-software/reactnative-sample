var english = 'abcdefghijklmnopqrstuvwxyz';
var special = "§±!@#$%^&*()-_+='" + '"{}[]:;|,<>.?/~`';
var number = '0123456789';
// let emoij = /\p{Extended_Pictographic}/u.test('flowers ✈️, ❤️ 👩🏼‍❤️‍💋‍👩🏽');
var hiragana =
  'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽきゃきゅきょしゃしゅしょちゃちゅちょにゃにゅにょひゃひゅひょみゃみゅみょりゃりゅりょぎゃぎゅぎょじゃじゅじょびゃびゅびょぴゃぴゅぴょ';
var katakana =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンギガグゲゴザジズゼゾダヂヅデドバビブベボパピプペポキャキュキョシャシュショチャチュチョニャニュニョヒャヒュヒョミャミュミョリャリュリョギャギュギョジャジュジョビャビュビョピャピュピョ';

var characters = english + special + number + hiragana + katakana;

var text1 = '1234anvb1ấ';

function test(text) {
  var split = text.split('');
  for (var i = 0; i < split.length; i++) {
    let isEmoji = /\p{Extended_Pictographic}/u.test(split[i]);
    let isInCharaters = characters.includes(split[i]);
    if (!isEmoji && !isInCharaters) {
      return {
        status: false,
        message:
          '平仮名 / 片仮名 / 英数 / 記号 / 内蔵の絵文字のみ使用可能',
      };
    }
  }
  return {
    status: true,
    message: 'ok',
  };
}
//console.log(test(text1));
