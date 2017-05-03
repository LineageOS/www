---
layout: post
title: Last week in LineageOS
category: blog
excerpt: W/C 13th Feb 2017
author: harryyoud
---

## Welcome to LineageOS' weekly review, where we go over changes in the past week

### Major changes since 13th February 2017
* AptX and AptXHD have been added to supported platforms. Bear in mind, only devices that had this feature on their stock ROM will have this functionality in LineageOS ([#158337](https://review.lineageos.org/#/c/158337))
* Torch on long-press has been added. This feature can be found in Settings > Buttons > Long-press power button for torch ([long-press-power-torch](https://review.lineageos.org/#/q/topic:long-press-power-torch))
* CAF Rebase - some more information is below
* Another build slave, courtesy of [DotSrc](http://dotsrc.org/)
* Our in-house changelog viewer has been released. It's now available on the [download page](http://download.lineageos.org) ([#160901](https://review.lineageos.org/#/c/160901/))

### CAF Rebase and February Security Patches
When we started developing for Android 7.0 (not 7.1), we based our source code on CAF 7.0 (CAF we depend upon for almost all our Qualcomm based devices).  
When Android 7.1 was released to AOSP, we merged this on top, but kept CAF 7.0 for HALs. Now CAF have updated their repositories to Android 7.1, we have rewritten history and rebased all merged commits on top of the CAF 7.1 base.
This means:

* much less time spent resolving merge conflicts
* AOSP's February security patches (AKA r21) can be merged much more easily into LineageOS 14.1 (which is why we're later than usual for this month's security patches).  

Before we did the huge rebase (happening over the past week), we created branches called `cm-14.1_prerebase` to make sure we had a known good copy to go back to, just in case the rebase did not go successfully.  
We'll be working on incorporating the Feb security release into 13.0 builds in the near future.

### Build roster
Added 14.1 devices

* Wileyfox Storm - kipper
* Galaxy Tab S 8.4 (Wi-Fi) - klimtwifi
* Galaxy Tab S 10.5 (Wi-Fi) - chagallwifi
* Samsung Galaxy Note 10.1 (Wi-Fi) (2014) - n1awifi 

Added 13.0 devices

* LeEco Le Pro3 - zl1
