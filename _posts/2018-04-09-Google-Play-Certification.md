---
layout: post
title: Google Play Certification
category: blog
excerpt: What it is, and how it affects you
author: javelinanddart
---

## Google Play Certification: What it is, and how it affects you

### What is Google Play Certification?

[Google Play Certification](https://www.android.com/certified/) is Google’s way of ensuring that devices running with Google Play Services are in a known-good state. This is implemented via checking of [SafetyNet](https://developer.android.com/training/safetynet/index.html), which you can read more about in our [SafetyNet blogpost](https://lineageos.org/Safetynet/).

### How does this affect you?

Google is rolling out updates to Google Play Services that may block you from using Play Services if your device is reporting as uncertified, meaning you can no longer use any apps that depend on Google Play Services.

### What can you do about it?

Google allows custom ROM users to register their Google Services Framework (GSF) ID on their [certification page](https://www.google.com/android/uncertified/). You can register your GSF ID following the instructions on the page in order to continue using Google Play Services on your LineageOS device. Originally, this system had a limit of 100 concurrent registrations per Google account, however they’ve since decided to remove this restriction.

### How often do I need to register my GSF ID?

Your device’s GSF ID is reset every time your device is factory reset (or when you wipe the GSF app itself) since it is stored in your data partition, so you must re-register your GSF ID every time you perform either of these actions.


### Why was this done in the first place?

_NOTE: This is pure speculation on our part and should be taken as such._

Some OEMs may have been shipping devices that contain Google Play Services without device certification, which lowers trust for app developers in being able to rely on the quality of devices running with Google Play Services installed.

The LineageOS Team
