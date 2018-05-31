---
layout: post
title: SafetyNet
category: blog
excerpt: What it is, and how it affects you
author: javelinanddart
---

## SafetyNet: What it is, and how it affects you

### What is SafetyNet?
[SafetyNet](https://developer.android.com/training/safetynet/index.html) is an API that was developed by Google in order to detect whether or not a device is in a known-good state. On older devices, this check is more lenient in order to maintain compatibility.

### How does this affect you?
App developers can choose to enable a toggle in the app developer console to hide their app on the Play Store if a device doesn't pass SafetyNet tests, or can choose to check the SafetyNet status of a device to disable certain functionality. Notable examples would be Netflix, which is hidden on the Play Store, and Android Pay, which checks SafetyNet each time the app is used. Devices running Lineage may have a smaller selection of usable apps in the Play Store as a result of these checks.

### What are we going to do about it?
Our official stance is that **we will not intentionally circumvent an integrity check that Google has put in place for app developers**. Any action taken to bypass SafetyNet risks a backlash against all custom OSes, and could cause Google to block them entirely from the Play Store. We have always taken the approach that our customizations should not change the underlying Android architecture in ways that developers cannot predict.

### What can you do about it?
For apps that are no longer visible in the Play Store, you can pursue alternative methods of app installation. For apps that inhibit functionality, you can always install your device's stock software and relock your bootloader.

The LineageOS Team
