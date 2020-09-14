import React, {Component} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {View, SafeAreaView, FlatList, Text, ScrollView} from 'react-native';
import CommonStyleSheets from '../Utilities/CommonStyleSheets';
import Header from '../Components/Header';
import Icon from 'react-native-vector-icons/FontAwesome5';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28baa',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63a',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72a',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bab',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63b',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72b',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bac',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63c',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72c',
    title: 'Third Item',
  },
];
class UsersList extends Component {
  renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <View style={styles.picContainer}>
          <Icon name="user-circle" size={styles.pic.fontSize} />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </View>
    );
  };
  render() {
    return (
      <SafeAreaView style={[CommonStyleSheets.container, styles.container]}>
        <Header
          title={
            this.props.type === 1
              ? 'All Applicants'
              : this.props.type === 2
              ? 'Verified Applicants'
              : 'Pending Applicants'
          }
          headerStyle={
            this.props.type === 1
              ? styles.allApplicantsHeader
              : this.props.type === 2
              ? styles.verifiedApplicantsHeader
              : styles.pendingApplicantsHeader
          }
        />
        <FlatList
          data={DATA}
          renderItem={(item) => this.renderItem(item)}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '#f1f1f1',
  },
  title: {
    fontSize: '18rem',
  },
  item: {
    width: '100%',
    height: '70rem',
    marginTop: '2rem',
    backgroundColor: '$secondaryColor',
    flexDirection: 'row',
  },
  picContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pic: {
    fontSize: '50rem',
  },
  nameContainer: {
    width: '80%',
    justifyContent: 'center',
    paddingStart: '10rem',
  },
  allApplicantsHeader: {
    backgroundColor: '$primaryColor',
  },
  verifiedApplicantsHeader: {
    backgroundColor: '$successColor',
  },
  pendingApplicantsHeader: {
    backgroundColor: '$warningColor',
  },
});

export default UsersList;
