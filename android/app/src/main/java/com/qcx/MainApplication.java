package com.qcx;

import android.app.Application;
import android.os.Bundle;

import com.facebook.react.ReactApplication;
import com.transistorsoft.rnbackgroundfetch.RNBackgroundFetchPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import org.reactnative.camera.RNCameraPackage;
import com.rnfingerprint.FingerprintAuthPackage;
import com.sbugert.rnadmob.RNAdMobPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.microsoft.codepush.react.CodePush;
import com.oblador.vectoricons.VectorIconsPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.sha256lib.Sha256Package;
import com.bitgo.randombytes.RandomBytesPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.airbnb.android.react.lottie.LottiePackage;
import com.microsoft.appcenter.reactnative.crashes.AppCenterReactNativeCrashesPackage;
import com.microsoft.appcenter.reactnative.analytics.AppCenterReactNativeAnalyticsPackage;
import com.microsoft.appcenter.reactnative.appcenter.AppCenterReactNativePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
        }
    
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNBackgroundFetchPackage(),
            new FIRMessagingPackage(),
            new RNCameraPackage(),
            new FingerprintAuthPackage(),
            new RNAdMobPackage(),
            new RNI18nPackage(),
            new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey), getApplicationContext(), BuildConfig.DEBUG),
            new VectorIconsPackage(),
            new SplashScreenReactPackage(),
            new Sha256Package(),
            new RandomBytesPackage(),
            new RNDeviceInfo(),
            new LottiePackage(),
            new AppCenterReactNativeCrashesPackage(MainApplication.this, getResources().getString(R.string.appcenterCrashes_whenToSendCrashes)),
            new AppCenterReactNativeAnalyticsPackage(MainApplication.this, getResources().getString(R.string.appcenterAnalytics_whenToEnableAnalytics)),
            new AppCenterReactNativePackage(MainApplication.this)
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
