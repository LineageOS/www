---
layout: post
title: SafetyNet and You
category: blog
excerpt: SafetyNet
author: javelinanddart
---

## SafetyNet: What it is, and how it affects you

### What is SafetyNet?
SafetyNet is an API that was developed by Google in order to detect whether or not a device is in a known-good state. On older devices, this check is more lenient in order to maintain compatibility.

### How does this affect you?
App developers can choose to check the SafetyNet status of a device (i.e. passing or not passing) to disable certain functionality or to enable a toggle in the app developer console to hide their app from the Play Store if a device doesn't pass. Notable examples would be Android Pay and Netflix. This means that devices running Lineage may not be able to use these apps or install them from the Play Store.

### What are we going to do about it?
Our official stance is that *we will not purposefully disable a security system Google has put in place for app developers*. Any method taken in order to circumvent this would only result in a situation no-win siution. For apps that are no longer visible in the Play Store, please pursue alternative methods of app installation. For apps that inhibit functionality, there is nothing we can recommend that you do at this time, apart from going back to your device's stock software and relocking your bootloader.

The LineageOS Team

