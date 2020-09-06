import EStyleSheet from 'react-native-extended-stylesheet';
const CommonStyleSheets = EStyleSheet.create({
  $fullSize: '100%',
  container: {
    width: '$fullSize',
    height: '$fullSize',
  },
  body: {
    width: '$fullSize',
    height: '$fullSize',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CommonStyleSheets;
