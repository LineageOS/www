---
layout: post
title: SafetyNet and You
category: blog
excerpt: SafetyNet
author: javelinanddart
---

## SafetyNet: What it is, and how it affects you

### What is SafetyNet?
[SafetyNet](https://developer.android.com/training/safetynet/index.html) is an API that was developed by Google in order to detect whether or not a device is in a known-good state. On older devices, this check is more lenient in order to maintain compatibility.

### How does this affect you?
App developers can choose to enable a toggle in the app developer console to hide their app on the Play Store if a device doesn't pass SafetyNet tests, or can choose to check the SafetyNet status of a device to disable certain functionality. Notable examples would be Netflix, which is hidden on the Play Store, and Android Pay, which checks SafetyNet each time the app is used. Devices running Lineage may have a smaller selection of usable apps in the Play Store as a result of these checks.

### What are we going to do about it?
Our official stance is that *we will not intentionally circumvent an integrity check that Google has put in place for app developers*. Any action taken in order to bypass this would only result in a no-win situation, potentially resulting in a broad-strokes reaction against all custom OS's being reprimanded or blocked from the Play Store. We have always taken the approach that though we are highly customized, the underlying Android architecture and expectations for developers in that ecosystem should behave as expected.

### What can you do about it?
For apps that are no longer visible in the Play Store, you can pursue alternative methods of app installation. For apps that inhibit functionality, you can always go back to your device's stock software and relock your bootloader.

The LineageOS Team
