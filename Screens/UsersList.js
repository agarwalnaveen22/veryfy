import React, {Component} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  View,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import CommonStyleSheets from '../Utilities/CommonStyleSheets';
import Header from '../Components/Header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-picker';
import fs from 'react-native-fs';
import {decode} from 'base64-arraybuffer';
import CommonMethods from '../Utilities/CommonMethods';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';
import {saveComparisionDetails} from '../Services/UserApi';

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      totalData: [],
      searchText: '',
      currentItemId: 0,
      showLoading: false,
    };
  }
  showPendingApplicants = async () => {
    let resp = await CommonMethods.getLocalStorage('pendingList');
    if (resp) {
      this.setState({data: JSON.parse(resp), totalData: JSON.parse(resp)});
    }
  };
  showVerifiedApplicants = async () => {
    let resp = await CommonMethods.getLocalStorage('verifiedList');
    if (resp) {
      this.setState({data: JSON.parse(resp), totalData: JSON.parse(resp)});
    }
  };
  searchApplicants = async (txt) => {
    await this.setState({searchText: txt});
    this.setState({
      data: CommonMethods.searchApplicants(this.state.totalData, txt),
    });
  };
  componentDidMount() {
    if (this.props.type !== 2) {
      this.showPendingApplicants();
    } else {
      this.showVerifiedApplicants();
    }
  }
  requestPermissions = async () => {
    return new Promise(async (resolve) => {
      if (Platform.OS === 'android') {
        try {
          await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          ]);
          const permissionCamera = await PermissionsAndroid.check(
            'android.permission.CAMERA',
          );
          const permissionWriteStorage = await PermissionsAndroid.check(
            'android.permission.WRITE_EXTERNAL_STORAGE',
          );
          if (!permissionCamera || !permissionWriteStorage) {
            resolve(false);
          } else {
            resolve(true);
          }
        } catch (err) {
          resolve(false);
        }
      } else {
        resolve(true);
      }
    });
  };
  openCamera = async (item) => {
    await this.setState({currentItemId: item._id});
    let permit = await this.requestPermissions();
    if (permit) {
      let options = {
        maxWidth: 500,
        maxHeight: 500,
        quality: 0.5,
        storageOptions: {
          privateDirectory: true,
        },
      };
      ImagePicker.launchCamera(options, async (response) => {
        if (response.didCancel) {
          alert('User cancelled image picker');
        } else if (response.error) {
          alert('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          alert('User tapped custom button: ', response.customButton);
        } else {
          await this.setState({showLoading: true});
          const file = {
            uri: response.uri,
            name: item.photo_name,
            type: 'image/jpeg',
          };
          this.uploadImageOnS3(file, item);
        }
      });
    }
  };
  uploadImageOnS3 = async (file, item) => {
    AWS.config.update({
      accessKeyId: 'AKIAIKLGEJGPZWOXAVCQ',
      secretAccessKey: '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',
      region: 'ap-south-1',
    });
    const s3bucket = new AWS.S3();
    let contentType = 'image/jpeg';
    let contentDeposition = 'inline;filename="' + file.name + '"';
    const base64 = await fs.readFile(file.uri, 'base64');
    const arrayBuffer = decode(base64);
    const params = {
      Bucket: 'veryfys/event/' + item.events._id + '/mobile',
      Key: file.name,
      Body: arrayBuffer,
      ContentDisposition: contentDeposition,
      ContentType: contentType,
    };
    let cthis = this;
    s3bucket.upload(params, async (err, data) => {
      if (err) {
        await cthis.setState({showLoading: false});
        alert('Can not upload image ' + file.name);
      }
      this.faceRecognition(item);
    });
  };
  faceRecognition = (item) => {
    var params = {
      SimilarityThreshold: 90,
      SourceImage: {
        S3Object: {
          Bucket: 'veryfys',
          Name: 'event/' + item.events._id + '/mobile/' + item.photo_name,
        },
      },
      TargetImage: {
        S3Object: {
          Bucket: 'veryfys',
          Name: 'event/' + item.events._id + '/original/' + item.photo_name,
        },
      },
    };
    const client = new AWS.Rekognition({apiVersion: 'latest'});
    let cthis = this;
    client.compareFaces(params, async function (err, data) {
      if (err) {
        await cthis.setState({showLoading: false});
        alert('Picture does not matched or invalid format');
      } else {
        let request = {
          id: item._id,
          match_json: data,
        };
        let resp = await saveComparisionDetails(request);
        await cthis.setState({showLoading: false});
        if (resp) {
          let newJsonData = CommonMethods.removeItemFromJson(
            cthis.state.totalData,
            item,
          );
          await CommonMethods.setLocalStorage(
            'pendingList',
            JSON.stringify(newJsonData),
          );
          await CommonMethods.setLocalStorage(
            'totalPendingList',
            newJsonData.length.toString(),
          );
          cthis.setState({data: newJsonData, totalData: newJsonData});
        }
      }
    });
  };
  renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.state.showLoading || this.props.type === 2
            ? null
            : this.openCamera(item)
        }
        style={styles.item}>
        <View style={styles.picContainer}>
          {!item.photo_url ? (
            <Icon name="user-circle" size={styles.pic.fontSize} />
          ) : (
            <Image
              style={styles.image}
              source={{
                uri: item.photo_url,
              }}
            />
          )}
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.title}>{item.full_name}</Text>
          <Text>{item.application_number}</Text>
        </View>
        <View style={styles.loadingContainer}>
          {this.state.showLoading && this.state.currentItemId === item._id ? (
            <ActivityIndicator
              size="large"
              color={
                this.props.type === 2
                  ? styles.verifiedApplicantsHeader.backgroundColor
                  : styles.pendingApplicantsHeader.backgroundColor
              }
            />
          ) : null}
        </View>
      </TouchableOpacity>
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
        <View style={styles.searchContainer}>
          <View style={styles.searchBoxOuter}>
            <TextInput
              onChangeText={(txt) => this.searchApplicants(txt)}
              value={this.state.searchText}
              style={styles.searchBox}
            />
          </View>
          <View style={styles.searchBoxIconContainer}>
            <Icon style={styles.searchIcon} name="search" />
          </View>
        </View>
        <FlatList
          data={this.state.data}
          renderItem={(item) => this.renderItem(item)}
          keyExtractor={(item) => item._id}
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
    paddingBottom: '5rem',
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
    width: '60%',
    justifyContent: 'center',
    paddingStart: '10rem',
  },
  loadingContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
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
  searchContainer: {
    width: '100%',
    height: '50rem',
    flexDirection: 'row',
  },
  searchBoxOuter: {
    width: '85%',
    height: '50rem',
  },
  searchBoxIconContainer: {
    width: '15%',
    height: '50rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: '20rem',
  },
  searchBox: {
    fontSize: '20rem',
    paddingStart: '10rem',
  },
  image: {
    width: '50rem',
    height: '50rem',
    borderRadius: '50rem',
  },
});

export default UsersList;
