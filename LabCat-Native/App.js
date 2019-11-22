/*!

 =========================================================
 * Material Kit React Native - v1.4.0
 =========================================================
 * Product Page: https://demos.creative-tim.com/material-kit-react-native/
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/material-kit-react-native/blob/master/LICENSE)
 =========================================================
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, {useState} from 'react';
import { Platform, StatusBar, Image } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import { Block, GalioProvider } from 'galio-framework';

import AppContainer from './navigation/Screens';
import { Images, studies, materialTheme } from './constants/';
import db from './firebase/fb';

// cache app images
const assetImages = [
  Images.Pro,
  Images.Profile,
  Images.Avatar,
  Images.Onboarding,
];

// cache study images
studies.map(study => assetImages.push(study.image));

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default function App() {
  [isLoadingComplete,setloading] = useState(false);
  [skiploadingscreen, setskip] = useState(false)

  if (isLoadingComplete && skiploadingscreen) {
    return (
      <AppLoading
        startAsync={_loadResourcesAsync}
        onError={_handleLoadingError}
        onFinish={_handleFinishLoading}
      />
    );
  } else {
    return (
      <GalioProvider theme={materialTheme}>
        <Block flex>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppContainer />
        </Block>
      </GalioProvider>
    );
  }

  const _loadResourcesAsync = async () => {
    return Promise.all([
      ...cacheImages(assetImages),
    ]);
  };

  const _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  const _handleFinishLoading = () => {
    setloading(true);
  };
}
