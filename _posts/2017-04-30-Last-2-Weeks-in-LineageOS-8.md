---
layout: post
title: Last couple of weeks at LineageOS
category: blog
excerpt: W/C 18th April
author: harryyoud
---

## Welcome to LineageOS' biweekly review, where we go over changes in the last couple of weeks

### Major changes since the 18th of April

* A new browser!
  * Jelly, our new browser, is a simple webview wrapper intended to be for devices with low RAM or `/system` space
  * Gello, our Chromium based browser, is soon to be updated with newer Chromium sources
* The location tile in Quick Settings has been much improved, and you can now change between different modes of location, similar to that in Settings
* We've added an autobrightness toggle in Quick Settings next to the brightness slider
* Sorting should now work correctly for non-latin characters in Trebuchet (the default launcher)

### Changes to infrastructure

We've made some changes to our infrastructure which should speed up Gerrit, and as a bonus, should reduce monthly expenditure. You can view our current costs [on the wiki](https://wiki.lineageos.org/costs/). 

You may have also noticed, we have moved the website and [wiki](https://wiki.lineageos.org) from GitHub pages to a self-hosted Jekyll install, with the added benefit of being able to serve our own HTTPS certificate, and control deployment using Jenkins. 

Alongside this, we've also added to our number of build slaves, so we should be able to blitz through the daily list of devices builds much quicker now. Thanks to the Academic Computer Club at Umeå University for providing the agrippa, iktinos, and kallikrates build slaves.

### PayPal Donations

As mentioned by the last review post, you can make Bitcoin donations. As of this week, you can also make PayPal donations. The links for doing this, and for how your money will be spent, take a look at our [costs section on the wiki](https://wiki.lineageos.org/costs/)

### Build roster

Added 14.1 devices

* Motorola Moto Z Play - addison - _maintainer: Alberto97_
* Samsung Galaxy S4 Mini (International Dual SIM) - serranodsdd - _maintainer: arco_
* HTC One A9 (International GSM) - hiaeuhl - _maintainer: intervigil_
* HTC One A9 (US GSM) - hiaeul - _maintainer: intervigil_
* Samsung Galaxy S III (AT&T) - d2att - _maintainer: javelinanddart_
* Samsung Galaxy S III (Sprint) - d2spr - _maintainer: javelinanddart_
* Samsung Galaxy S III (T-Mobile) - d2tmo - _maintainer: javelinanddart_
* Samsung Galaxy S III (Verizon) - d2vzw - _maintainers: javelinanddart, invisiblek_
* Samsung Galaxy Tab S 10.5 Wi-Fi - chagallwifi - _maintainers: deadman96385, DarkExistence_
* Samsung Galaxy Note 3 (International 3G) - ha3g - _maintainers: tincho5588, deadman96385_
* LG V20 (AT&T) - h910 - _maintainer: albinoman887_
* LG V20 (Sprint) - ls997 - _maintainer: albinoman887_
* LG V20 (US Cellular) - us996 - _maintainer: albinoman887_
* LG V20 (Verizon) - vs995 - _maintainer: albinoman887_

Changes to 14.1 devices

* Samsung Galaxy S4 Mini (International 3G) - serrano3gxx - moved from 13.0 to 14.1
* Samsung Galaxy S4 Mini (International LTE) - serranoltexx - moved from 13.0 to 14.1

Removed 14.1 devices

* Sony Xperia M - nicki - No longer maintained
