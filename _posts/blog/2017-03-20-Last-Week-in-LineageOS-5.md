---
layout: post
title: Last couple of weeks at LineageOS
category: blog
excerpt: W/C 6th March
author: harryyoud
---

## Welcome to LineageOS' biweekly review, where we go over changes in the last couple of weeks

### It's over 1 million!

Our installation counter has ticked over the 1 million mark.  
Note that the installation counter is not a 100% accurate reflection of users, by design. Since we don't actually track devices or users, we use the randomized installation ID, which gets switched each time you wipe your device. So depending on some user's patterns, 1 physical device could count as multiple installations if they wiped that many times.  
Regardless, we're all very proud of the reception we've received and thank you for all of your continued support.

### Major changes since 6th March
* Contacts can now be stored locally regardless of whether a contacts provider exists ([contact-local-storage](http://review.lineageos.org/#/q/topic:contact-local-storage))
* Custom QuickSettings tiles are back! ([tiles](http://review.lineageos.org/#/q/topic:tiles)) Initial tiles are as follows:
  * Caffeine
  * USB Tether
  * Sync
  * Battery saver
  * Ambient display
  * Heads Up
  * Volume Panel
  * ADB over Network
* March security patches (r25) have been merged

### Build roster

kltevzw has been merged into klte. To continue receiving updates, flash the latest klte build, as this is the last week of kltevzw builds.

Removed 14.1 devices

* Maintainer is no longer active
  * Huawei Ascend Mate 2 - mt2
  * HTC One (GSM) - m7
  * HTC One (Verizon) - m7vzw

Added 14.1 devices

* Samsung Galaxy S4 (Verizon) - jfltevzw - _maintainer: invisiblek_
* Samsung Galaxy S4 (Intl) - _jfltexx - maintainer: dimitris_
* LG G5 (Intl) - h850 - _maintainer: rashed_
* LG V20 (T-Mobile) - h918 - _maintainer: rashed_

Added 13.0 devices

* Motorola Droid 4 - maserati - _maintainer: stargo_
* Motorola Droid RAZR (CDMA) - spyder - _maintainer: stargo_
* Motorola Droid Bionic - targa - _maintainer: stargo_
* Motorola Droid RAZR (GSM) - umts_spyder - _maintainer: stargo_
* Motorola Photon Q - xt897 - _maintainers: nadlabak, mccreary_
