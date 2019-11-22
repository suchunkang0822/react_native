import React, {useState, useEffect} from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform, View, TouchableOpacity} from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';

import { Icon, Study } from '../components';
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import db from '../firebase/fb';

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

export default function Profile() {
  const [studies, setStudies] = useState([]);
  const [users, setUsers] = useState([]);
  const [displayUpcomingStudies, updateDisplayUpcomingStudies] = useState(true);

  const renderData = () => {
    useEffect(() => {
      const handleStudies = snap => {
        let temp = Object.values(snap.val());
        setStudies(temp);
      };
      const handleUsers = snap => {
        let temp = Object.values(snap.val());
        setUsers(temp);
      };
      db.ref("studies").on("value", handleStudies, error => alert(error));
      db.ref("users").on("value", handleUsers, error => alert(error));
      return () => {
        db.ref("studies").off("value", handleStudies);
        db.ref("users").off("value", handleUsers);
      };
    }, []);
  };
  renderData();
  const studyId = users.filter((x)=>x.uid == "001");

  var currDate = new Date("11/01/2019 12:00");
  var study = studyId[0];

  var studyIds = [];
  var pastStudiesIds = [];
  var upcomingStudiesIds = [];
  var upcomingStudies = [];
  var pastStudies = [];
  if (study != undefined) {
    studyIds = Object.keys(study["studies"]);
    pastStudiesIds = studyIds.filter((x)=>new Date(study["studies"][x]["start"]) < currDate);
    upcomingStudiesIds = studyIds.filter((x)=>new Date(study["studies"][x]["start"]) >= currDate);
    upcomingStudies = studies.filter(
      function(x) {
        for (var i = 0; i < upcomingStudiesIds.length; i++) {
          if (x.sid == upcomingStudiesIds[i]) {
            return true;
          }
        }
        return false;
      }
    );
    pastStudies = studies.filter(
      function(x) {
        for (var i = 0; i < pastStudiesIds.length; i++) {
          if (x.sid == pastStudiesIds[i]) {
            return true;
          }
        }
        return false;
      }
    );
  }

  let listToDisplay;
  let listText;
  if (displayUpcomingStudies == true) {
    listToDisplay = upcomingStudies;
    listText = "Your Upcoming Studies"
  }
  else {
    listToDisplay = pastStudies;
    listText = "Your Past Studies"
  }
  return (
    <Block flex style={styles.profile}>
      <Block flex>
        <ImageBackground
          source={{uri: Images.Profile}}
          style={styles.profileContainer}
          imageStyle={styles.profileImage}>
          <Block flex style={styles.profileDetails}>
            <Block style={styles.profileTexts}>
              <Text color="white" size={28} style={{ paddingBottom: 8 }}>Jane Doe</Text>
              <Block row space="between">
                <Block row>
                  <Text color="white" size={16} muted style={styles.seller}>Student</Text>
                </Block>
                <Block>
                  <Text color={theme.COLORS.MUTED} size={16}>
                    <Icon name="map-marker" family="font-awesome" color={theme.COLORS.MUTED} size={16} />
                    {` `} Evanston, IL
                    </Text>
                </Block>
              </Block>
            </Block>
            <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={styles.gradient} />
          </Block>
        </ImageBackground>
      </Block>
      <Block flex style={styles.options}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block row space="between" style={{ padding: theme.SIZES.BASE, }}>
            <TouchableOpacity onPress={() => updateDisplayUpcomingStudies(true)} >
              <Block middle>
                <Text bold size={12} style={{marginBottom: 8}}>{upcomingStudiesIds.length}</Text>
                <Text muted size={12}>Upcoming Studies</Text>
              </Block>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => updateDisplayUpcomingStudies(false)}>
              <Block middle>
                <Text bold size={12} style={{marginBottom: 8}}>{pastStudiesIds.length}</Text>
                <Text muted size={12}>Past Studies</Text>
              </Block>
            </TouchableOpacity>
          </Block>
          <Block row space="between" style={{ paddingVertical: 16, alignItems: 'baseline' }}>
            <Text size={16}>{listText}</Text>
          </Block>
          <Block style={{ paddingBottom: -HeaderHeight * 5 }}>
            <Block col space="between" style={{ flexWrap: 'wrap' }} >
              {listToDisplay.map(study => <Study key={study.title} study={study} style={{ marginRight: theme.SIZES.BASE }} />)}
            </Block>
          </Block>
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    marginBottom: -HeaderHeight * 2,
  },
  profileImage: {
    width: width * 1.1,
    height: 'auto',
  },
  profileContainer: {
    width: width,
    height: height / 3,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: theme.SIZES.BASE / 2,
    borderRadius: 4,
    height: 19,
    width: 38,
  },
  seller: {
    marginRight: theme.SIZES.BASE / 2,
  },
  options: {
    position: 'relative',
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 21,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
    position: 'absolute',
  },
});
