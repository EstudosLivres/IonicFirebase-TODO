Ionic Base App
=====================

A starting project for Ionic that optionally supports using custom SCSS.

## Using this project

We recommend using the [Ionic CLI](https://github.com/driftyco/ionic-cli) to create new Ionic projects that are based on this project but use a ready-made starter template.

For example, to start a new Ionic project with the default tabs interface, make sure the `ionic` utility is installed:

```bash
$ npm install -g ionic
```

Then run:

```bash
$ ionic start myProject tabs
```

More info on this can be found on the Ionic [Getting Started](http://ionicframework.com/getting-started) page and the [Ionic CLI](https://github.com/driftyco/ionic-cli) repo.

## Issues
Issues have been disabled on this repo, if you do find an issue or have a question consider posting it on the [Ionic Forum](http://forum.ionicframework.com/).  Or else if there is truly an error, follow our guidelines for [submitting an issue](http://ionicframework.com/submit-issue/) to the main Ionic repository.


# IonicFirebase-TODO
Simple TODO App using firebase

## Setup firebase
1. Add firebase JS lib & it angular plugin via CDN
2. add it module to the ionic app definitiion: angular.module("starter", ["ionic", "firebase"])
Those steps let us use the dependencies to store and sync data with AngularFire using: ```$firebaseArray```, ```$firebaseObject```, and ```$firebaseAuth```.


## Add firebase SyncData
Just create it Factory as app module child:

```
  .factory("Items", function($firebaseArray) {
    var itemsRef = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com/items");
    return $firebaseArray(itemsRef);
  })
```

## Make sure social auth work on devices
Our app works in the browser, but because there is no concept of redirects on mobile we need to add Cordova InAppBrowser as a dependency to make sure authentication works on iOS and Android:

```
  $ cordova plugin add cordova-plugin-inappbrowser
```

## Add & Config white-list
Prevent security issues by foreign requests

```
  $ cordova plugin add cordova-plugin-whitelist
```
