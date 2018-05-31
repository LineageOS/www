---
layout: post
title: Last week in LineageOS
category: blog
excerpt: W/C 6th Feb 2017
author: harryyoud
---

Lots of people have been asking for changelogs, so we'll be making one for people who don't want to trawl through Gerrit.
If you want to know everything that's changed in the last week or so, check [our Gerrit](https://review.lineageos.org). We will refrain from adding changes for each device, as this would take too much time. Instead, things that have changed for everybody, new devices added to the roster, or __major__ changes to devices (eg cm13->cm14.1, or massive breaking bug has been fixed) will be reported.

## What's changed then?
* Removed AOSP Soundrecorder and CyanogenMod Screen Recorder, which have been replaced with our homegrown app, dubbed "Recorder". This handles both sound and screen recording
* ~~CM~~ Lineage Wallpapers have returned
* New touchscreen gestures interface for devices that support it with customizable actions
* A new website design, courtesy of [Aykut Yilmaz](https://review.lineageos.org/#/c/160330/)

It really doesn't look like much, but _lots_ of changes are happening, but most are behind the scenes things, and little edge bug fixes

## Build roster
Added 14.1 devices

* Samsung Galaxy Tab S2 8.0 (Wi-Fi) (2016) (Snapdragon) – gts28vewifi
* Samsung Galaxy Tab S2 9.7 (Wi-Fi) (2016) (Snapdragon) – gts210vewifi
* HTC 10 – pme
* ZTE Axon 7 – axon7
* Samsung Galaxy Tab S2 9.7 (LTE) (Exynos) – gts210ltexx
* Samsung Galaxy Tab S2 9.7 (Wi-Fi) (Exynos) – gts210wifi
* Samsung Galaxy S7 – herolte
* Samsung Galaxy S7 Edge – hero2lte

Added 13.0 devices

* Motorola Moto X - ghost
* Samsung Galaxy Tab 2 7.0 / Tab 2 10.1 (GSM) – espresso3g
* Samsung Galaxy Tab 2 7.0 / Tab 2 10.1 (Wi-Fi / Wi-Fi + IR) – espressowifi
