import React from "react";
import {
  ImageBackground,
  StyleSheet,
  StatusBar,
  Dimensions,
  Platform
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import materialTheme from "../constants/Theme";
import Images from "../constants/Images";

export default class Onboarding extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={require("../assets/images/background.jpeg")}
          style={{ height: height, width: width, zIndex: 1 }}
        >
          <Block flex space="between" style={styles.padded}>
            <Block flex space="around" style={{ zIndex: 2 }}>
              <Block>
                <Block>
                  <Text center color="white" size={50}>
                    Lab Cat
                  </Text>
                </Block>
                <Text center size={16} color="rgba(255,255,255,0.6)">
                  Paid Research Studies hub
                </Text>
              </Block>
              <Block center>
                <Button
                  shadowless
                  style={styles.button}
                  color={materialTheme.COLORS.BUTTON_COLOR}
                  onPress={() => navigation.navigate("Home")}
                >
                  GET STARTED
                </Button>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE
  },
  button: {
    width: width - theme.SIZES.BASE * 10,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  }
});
