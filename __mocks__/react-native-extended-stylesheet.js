const {Dimensions} = require('react-native');

const EStyleSheet = require('react-native-extended-stylesheet').default;

let {width} = Dimensions.get('window');
EStyleSheet.build({
  /* Bootstrap styles here.*/
  $rem: width / 380,
  $primaryColor: '#2e62bc',
  $secondaryColor: '#ffffff',
  $successColor: '#008000',
  $warningColor: '#CCCC00',
  $errorColor: '#ff0000',
});

module.exports = EStyleSheet;
