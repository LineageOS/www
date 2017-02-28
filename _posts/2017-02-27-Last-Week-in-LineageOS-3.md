---
layout: post
title: Last week in LineageOS
category: blog
excerpt: W/C 20th Feb 2017
author: harryyoud
---

## Welcome to LineageOS' weekly review, where we go over changes in the past week

### Major changes since 20th February 2017

* Support for more than 2 cameras in Snap ([#154734](http://review.lineageos.org/#/c/154734))
* Settings > Accounts not showing accounts has been fixed ([#162969](http://review.lineageos.org/#/c/162969))
* The work required to maintain CMFM is substantial, and on review, it was a better investment of time to change managers. The AOSP file manager (with some added extras) is its replacement ([nuke_cmfm](http://review.lineageos.org/#/q/topic:nuke_cmfm))
* Automatic Do Not Disturb rules are fixed, so you don't get pestered during the night or in meetings ([#162968](http://review.lineageos.org/#/c/162968))
* Dual SIM UI improvements in Dialer for DSDA devices ([#161227](http://review.lineageos.org/#/c/161227))
* Our download page built-in changelog now supports a frequently asked for feature: filtering out "Automatic translation imports" ([#162852](http://review.lineageos.org/#/c/162852))

### Translation

Bilingual? Trilingual? Anythinglingual?
If you think you can help translate LineageOS to a different language, jump over to [Crowdin](http://crowdin.com/project/lineageos) and have a go!
Only do this if you are reasonably literate in the target language; poor translations waste both our and your time. 

### Signing problems

With the CAF rebase, one of the tools required for signing was moved. As such, some builds were incorrectly signed and pulled as soon as we were made aware.
Future problems like this should be noticed a lot quicker going forward thanks to the changes to our build process (more on that below). 

### February Security Patches

They've been merged! ([#160504](https://review.lineageos.org/#/c/160504/) - plus a 'force' push to updated branches, which means they aren't shown in Gerrit)

Sorry they've taken so long, we had some unexpected issues with this, as well as it being stalled until we rebased on CAF. 
Future security updates will be able to be merged more quickly

### Build roster

Builds this week (and weeks to come) will be split evenly across Monday to Friday to reduce load on the build servers and build mirrors.
This also means we can check breaking errors much more quickly, rather than having to pull 30 builds on the first day. 

Added 14.1 devices

* LG G3 (AT&T) - d850
* LG G3 (Korea) - f400
* Samsung Galaxy S III (GSM LTE) - i9305

Added 13.0 devices

* LeEco LeMax2 - x2
* Samsung Galaxy Note 8.0 (GSM) - n5100
* Samsung Galaxy Note 8.0 (Wi-Fi) - n5110
* Samsung Galaxy Note 8.0 (LTE) - n5120
