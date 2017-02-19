---
layout: post
title: Last week in LineageOS
category: blog
excerpt: W/C 13th Feb 2017
author: harryyoud
---

Lots of people have been asking for changelogs, so we'll be making one for people who don't want to trawl through Gerrit.
If you want to know everything that's changed in the last week or so, check [our Gerrit](https://review.lineageos.org/#/q/status:merged). We will refrain from adding changes for each device, as this would take too much time. Instead, things that have changed for everybody, new devices added to the roster, or __major__ changes to devices (eg cm13->cm14.1, or massive breaking bug has been fixed) will be reported.

## What's changed then?
* AptX and AptXHD have been added to supported platforms. Bear in mind, only devices that had this feature on their stock ROM will have this functionality in LineageOS ([#158337](https://review.lineageos.org/#/c/158337))
* CAF Rebase - some more information is below
* Another build slave, courtesy of DotSrc (http://dotsrc.org)
* Our in-house changelog viewer has been released. It will very soon be available on the download page for your device ([#160901](https://review.lineageos.org/#/c/160901/))

## CAF Rebase and February Security Patches
When we started developing for Android 7.0 (not 7.1), we based our source code on CAF 7.0 (CAF we depend upon for almost all our Qualcomm based devices).  
When Android 7.1 was released to AOSP, we merged this on top, but kept CAF 7.0 for HALs. Now CAF have updated their repositories to Android 7.1, we have rewritten history and rebased all merged commits on top of the CAF 7.1 base.
This means:
* much less time spent resolving merge conflicts
* AOSP's February security patches (AKA r21) can be merged much more easily (which is why we're later than usual for this month's security patches).  
Before we did the huge rebase (happening over the past week), we created branches called `cm-14.1_prerebase` to make sure we had a known good copy to go back to, just in case the rebase did not go successfully.


## Build roster
Added 14.1 devices

* Wileyfox Storm - kipper
* Galaxy Tab S 8.4 (Wi-Fi) - klimtwifi
* Galaxy Tab S 10.5 (Wi-Fi) - chagallwifi

Added 13.0 devices

* Motorola Moto X - zl1

Removed 14.1 devices

* Samsung Galaxy SII - i9100 (temporary measure)
