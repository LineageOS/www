---
layout: post
title: Last couple of weeks at LineageOS
category: blog
excerpt: W/C 3rd April
author: invisiblek
---

## Welcome to LineageOS' biweekly review, where we go over changes in the last couple of weeks

### 7.1.2 Merge
We've merged up the N branch to 7.1.2. Builds starting April 17th will include these. This merge includes all AOSP security and features to the platform.

### Major changes since the 3rd of April
* VoLTE [our new mascot](https://www.lineageos.org/Announcing-our-Mascot/) has taken an early retirement. No word yet on if he'll make a return.
* Fixes to the Extra Tiles we implemented a couple weeks ago:
  * Wakelock and service fixes that address increased battery usage problems.
  * Changes in default state of several tiles.
* Misc fixes around the platform as well as your usualy device-specific fixes from all our awesome maintainers and contributors.

### Build roster

Added 14.1 devices

* HTC M9 (GSM) - himaul - _maintainers: rashed, raymanfx_
* HTC M9 (Verizon) - himawl - _maintainers: flyhalf205, rashed, raymanfx_
* Letv LeEco Le 2 (International) - s2 - _maintainer: codeworkx_
* Letv LeEco LePro3 - zl1 - _maintainers: jrior001, Tortel_
* LG L90 - w7 - _maintainer: mobiusm_
* Samsung Galaxy Tab 3 LTE (Sprint) - lt02ltespr - _maintainer: deadman96385_
* Yu Yuphoria - lettuce - _maintainer: h2o64, mikeioannina, TheStrix_
* Yu Yureka - tomato - _maintainer: h2o64, Meninblack007, mikeioannina_

Changes to 14.1 devices

* Samsung Galaxy Note 2 LTE Korean variants (t0ltektt,t0lteskt) are now unified under t0ltekor - _maintainer: filiprrs, PoisonNinja_

Removed 14.1 devices

* Nextbit Robin - ether
  * Temporarily removed by maintainers until major bugs are addressed
* Samsung Galaxy S3 - d2att,d2spr,d2tmo,d2vzw
  * Maintainer no longer interested in continuing these devices
