---
layout: post
title: Summertime Updates!
category: blog
excerpt: Exciting changes of all shapes and sizes are on their way!
author: Inhishonor
---

## It's Summer (in the Northern Hemisphere at Least)

Hello again! We are trying to give more regular updates, in order to inform you of some changes to our infrastructure, our apps, and our security patching efforts. Over the past few months we have had many contributors tirelessly working on every aspect of the OS, as well as the infrastrcuture behind it, especially our contributor niclimcy who is responsible for many of the changes listed below.

### New Stats Page

One of the biggest updates so far was the rewriting of our [stats page](https://stats.lineageos.org/) by niclimcy, luk1337, and luca020400. The updated application includes a map to view active locations; filtering by country, by carrier, by device model, and by version. We also pruned some data that was clearly spoofed or tampered.

### Web Flashing Support

We are pleased to offer a set of web flash-tools, something that had been requested for many years. Now by accessing the [flasher through our download portal](https://download.lineageos.org/flash), you will be able to use your browser to flash using fastboot, adb, and Samsung's Odin protocol. Please remember though that this is not a complete flashing process, you still _must_ follow our [wiki instructions](https://wiki.lineageos.org/devices/) for your specific device.

These efforts are only possible due to kdrag0n's amazing work on [fastboot.js](https://github.com/kdrag0n/fastboot.js/), yume-chan's brilliant work on [ya-webadb](https://github.com/yume-chan/ya-webadb), and r3pwn's timeless work on [libmjolnir](https://github.com/r3pwn/libmjolnir) - go thank them!

Contributors niclimcy and luk1337 brought these tools into our Updater portal and sent their improvements back upstream in many cases - massive thanks to them!

### Wiki Dark Mode

The wiki is the source truth when it coems to LineageOS, but it was also a source of temporary blindness! Thankfully, niclimcy has remedied this for us by adding built-in dark mode. And we must say, it looks very nice.

### Gerrit Updates

Our code review instance has not only been updated to the latest version, but has also had a few improvements made to it as well. In the past it was required to login with a Google account, but now you will be able to choose between logging in with your Google _or_ your GitHub account.

### Issue Tracker

Our issue tracker has been recently migrated to [GitHub](https://github.com/LineageOS/issues/issues) away from GitLab, due to problems with their automatic issue handling, and the inability to sign up without providing a phone number/credit card, among other things. The new issue tracker features many new improvements, including an easy to fill out issue forms, and immediate notification of maintainers when bugs are filed for their devices.

### Security Updates

With the release of Android 16, Google changed the way it has been handling security patches for Android, by bundling most patches into quarterly releases. We have adapted to these changes by doing the following.

1. For LineageOS versions 21, 22, and 23; we are testing and merging patches from each monthly security bulleting as they are released by Google.

2. For LineageOS versions 18, 19, and 20; we are backporting patches as quickly as possible, and are currently patched through the July 2026 security patch level (SPL).

3. For LineageOS versions 14, 15, 16, and 17; the process of backporting is much more difficult (due to codebase changes), so support is much more hit and miss. LineageOS 16 and 17 have all patches through the November 2025 SPL, and 14 and 15 should be catching up soon.

Please keep in mind though that for some of these older versions, backporting is very complex, so we can't guarantee complete (or even partial) security. But rest assured we are doing our best to support every Android version as long as we can.

![LineageOS Security Patch Level by Branch]({{site.baseurl}}/images/2026-06-08/security-patch-level-by-branch.png){: .blog_post_image_full }

A big thanks to mse1969 for spearheading the efforts, with assistance from Lost-Entrepreneur439, FlameFire, Syphyr and npjohnson!

### App Updates

It hasn't just been background updates to the OS, default apps have received several updates as well. Our integrated backup [Seedvault](https://github.com/seedvault-app/seedvault) solution and the default calendar [Etar](https://github.com/Etar-Group/Etar-Calendar) have both been updated to their latest versions. Twelve, our default music app, has received [Ampache](https://ampache.org/) support thanks to longtime contributor SebaUbuntu. And finally, Glimpse (our default gallery app) received a few improvements including Double-Tap to seek support in videos, better lock screen handling, support for motion photos, and a setting to remember the last playback position when watching videos.

#### Updater

Last blog post we teased massive changes to our Updater app, and thanks to the amazing work of pjgowtham we are pleased to unveil it. These changes have implemented Material 3 Expressive, modernized many aspects of the underlying codebase, improved the user experience, and made the app more reliable and efficient. In addition to the above changes, we have made changes to the updater API to expose more information about each individual update, mainly which [ASBs](https://wiki.lineageos.org/glossary/#asb-android-security-bulletin) are included.

We now also now [stream](https://source.android.com/docs/core/ota/ab#streaming-updates) A/B OTA update packages by default, so you'll notice both less space is necessary, and the updates apply much faster!

This hopefully means no more "Is the ASB merged yet this month?" questions, as the Updater app will show you the SPL of each new update before you install it!

### The Future

We'll keep this one short - Google has released Android 17 has released to the public. Therefore, LineageOS 24 development is underway. As always, there will be no ETAs provided - but we are progressing nicely!

### Translations

Thanks to the work of a team of contributors, we are pleased to announce that we are adding another language to our roster; Please welcome Central Kurdish! And we still need translators (for it and all other languages), so if you are bi-, tri-, or anything lingual please visit [our wiki](https://wiki.lineageos.org/how-to/translate) and join us in our efforts to make LineageOS accessible for everyone, everywhere.

### Build roster

<!-- 59b69d57409edabed411f598e868dd35f91fa819..cb49db85a858adff00c17d0bb32434f4d27ebf12 -->

#### Added 23.2 devices

{: .table }
| Device name | Wiki | Maintainers | Moved from |
|-------------|------|-------------|------------|
| LG V60 ThinQ | [timelm](https://wiki.lineageos.org/devices/timelm) | pnguyen879 | 23.0 |
| Motorola ThinkPhone by motorola | [bronco](https://wiki.lineageos.org/devices/bronco) | demon000, elginsk8r | 22.2 |
| Motorola edge | [racer](https://wiki.lineageos.org/devices/racer) | ItsVixano | 21 |
| Motorola moto g 5G / Motorola moto one 5G ace | [kiev](https://wiki.lineageos.org/devices/kiev) | basamaryan, SyberHexen, Vivekachooz | 22.2 |
| Motorola moto g 5G plus / Motorola moto one 5G | [nairo](https://wiki.lineageos.org/devices/nairo) | ItsVixano, Ivanmeler, SyberHexen, zlewchan | 22.2 |
| Motorola moto g50 | [ibiza](https://wiki.lineageos.org/devices/ibiza) | Onelots |  |
| Motorola one action | [troika](https://wiki.lineageos.org/devices/troika) | Stricted, npjohnson, DaemonMCR | 22.2 |
| Motorola one vision / Motorola p50 | [kane](https://wiki.lineageos.org/devices/kane) | Stricted, npjohnson, DaemonMCR | 22.2 |
| OSOM OV1 | [pyrite](https://wiki.lineageos.org/devices/pyrite) | mikeioannina, npjohnson |  |
| Realme GT Neo6 | [bale](https://wiki.lineageos.org/devices/bale) | MisterZtr |  |
| SHIFT SHIFTphone 8 | [otter](https://wiki.lineageos.org/devices/otter) | amartinz, mikeioannina |  |
| Samsung Galaxy A52 4G | [a52q](https://wiki.lineageos.org/devices/a52q) | Simon1511 | 22.2 |
| Samsung Galaxy A52s 5G | [a52sxq](https://wiki.lineageos.org/devices/a52sxq) | Simon1511 | 22.2 |
| Samsung Galaxy A72 | [a72q](https://wiki.lineageos.org/devices/a72q) | Simon1511 | 22.2 |
| Samsung Galaxy A73 5G | [a73xq](https://wiki.lineageos.org/devices/a73xq) | Simon1511 | 22.2 |
| Samsung Galaxy M52 5G | [m52xq](https://wiki.lineageos.org/devices/m52xq) | Simon1511 | 22.2 |
| Samsung Galaxy S23 | [dm1q](https://wiki.lineageos.org/devices/dm1q) | DaemonMCR, josip-k |  |
| Samsung Galaxy Tab S6 Lite 2024 (Wi-Fi) | [gta4xlswifi](https://wiki.lineageos.org/devices/gta4xlswifi) | Linux4 |  |
| Sony Xperia 1 VI | [pdx245](https://wiki.lineageos.org/devices/pdx245) | BotchedRPR |  |
| Sony Xperia 10 VII | [pdx257](https://wiki.lineageos.org/devices/pdx257) | LuK1337, jmpfbmx |  |
| Xiaomi 11 Lite 5G NE / Xiaomi 11 Lite NE 5G / Xiaomi Mi 11 LE | [lisa](https://wiki.lineageos.org/devices/lisa) | ItsVixano | 22.2 |
| Xiaomi 12S | [mayfly](https://wiki.lineageos.org/devices/mayfly) | Flower Sea | 23.0 |
| Xiaomi 13 Pro | [nuwa](https://wiki.lineageos.org/devices/nuwa) | Minus | 23.0 |
| Xiaomi 13 | [fuxi](https://wiki.lineageos.org/devices/fuxi) | lolipuru | 23.0 |
| Xiaomi Mi 10S | [thyme](https://wiki.lineageos.org/devices/thyme) | Alcatraz323, Flicker372 | 22.2 |
| Xiaomi Mi 10T / Xiaomi Mi 10T Pro / Xiaomi Redmi K30S Ultra | [apollon](https://wiki.lineageos.org/devices/apollon) | Ramisky | 22.2 |
| Xiaomi Mi 11 Lite 5G | [renoir](https://wiki.lineageos.org/devices/renoir) | ArianK16a | 22.2 |
| Xiaomi Mi 11 | [venus](https://wiki.lineageos.org/devices/venus) | ItsVixano |  |
| Xiaomi POCO F2 Pro / Xiaomi Redmi K30 Pro | [lmi](https://wiki.lineageos.org/devices/lmi) | SebaUbuntu | 22.2 |
| Xiaomi POCO F4 / Xiaomi Redmi K40S | [munch](https://wiki.lineageos.org/devices/munch) | SebaUbuntu | 22.2 |
| Xiaomi POCO F6 / Xiaomi Redmi Turbo 3 | [peridot](https://wiki.lineageos.org/devices/peridot) | adarshgrewal |  |
| Xiaomi POCO F6 Pro / Xiaomi Redmi K70 | [vermeer](https://wiki.lineageos.org/devices/vermeer) | Lunark | 23.0 |
| Xiaomi Redmi 12C / Xiaomi Redmi 12C NFC / Xiaomi POCO C55 | [earth](https://wiki.lineageos.org/devices/earth) | surblazer | 23.0 |
| Xiaomi Redmi K60 Pro | [socrates](https://wiki.lineageos.org/devices/socrates) | WenHao2130 | 23.0 |
| Xiaomi Redmi Note 10S / Xiaomi Redmi Note 10S NFC / Xiaomi Redmi Note 10S Latin America / Xiaomi POCO M5s | [rosemary](https://wiki.lineageos.org/devices/rosemary) | surblazer | 23.0 |
| Zinwa Q25 Pro | [Q25](https://wiki.lineageos.org/devices/Q25) | electimon, basamaryan, npjohnson, Androbots |  |

#### Added 22.2 devices

{: .table }
| Device name | Wiki | Maintainers | Moved from |
|-------------|------|-------------|------------|
| LG G5 (International) | [h850](https://wiki.lineageos.org/devices/h850) | npjohnson, Simex, basamaryan, Androbots, AShiningRay, ROMSG, Geel | 21 |
| LG G5 (T-Mobile) | [h830](https://wiki.lineageos.org/devices/h830) | npjohnson, Simex, basamaryan, Androbots, AShiningRay, ROMSG, Geel | 21 |
| LG G5 (US Unlocked) | [rs988](https://wiki.lineageos.org/devices/rs988) | npjohnson, Simex, basamaryan, Androbots, AShiningRay, ROMSG, Geel | 21 |
| LG G6 (EU Unlocked) | [h870](https://wiki.lineageos.org/devices/h870) | npjohnson, Simex, basamaryan, Androbots, AShiningRay, ROMSG, Geel | 21 |
| LG G6 (T-Mobile) | [h872](https://wiki.lineageos.org/devices/h872) | npjohnson, Simex, basamaryan, Androbots, AShiningRay, ROMSG, Geel | 21 |
| LG G6 (US Unlocked) | [us997](https://wiki.lineageos.org/devices/us997) | npjohnson, Simex, basamaryan, Androbots, AShiningRay, ROMSG, Geel | 21 |
| LG V20 (AT&T) | [h910](https://wiki.lineageos.org/devices/h910) | npjohnson, Simex, basamaryan, Androbots, AShiningRay, ROMSG, Geel | 21 |
| LG V20 (GSM Unlocked - DirtySanta) | [us996d](https://wiki.lineageos.org/devices/us996d) | npjohnson, Simex, basamaryan, Androbots, AShiningRay, ROMSG, Geel | 21 |
| LG V20 (GSM Unlocked) | [us996](https://wiki.lineageos.org/devices/us996) | npjohnson, Simex, basamaryan, Androbots, AShiningRay, ROMSG, Geel | 21 |
| LG V20 (Global) | [h990](https://wiki.lineageos.org/devices/h990) | npjohnson, Simex, basamaryan, Androbots, AShiningRay, ROMSG, Geel | 21 |
| LG V20 (Sprint) | [ls997](https://wiki.lineageos.org/devices/ls997) | npjohnson, Simex, basamaryan, Androbots, AShiningRay, ROMSG, Geel | 21 |
| LG V20 (T-Mobile) | [h918](https://wiki.lineageos.org/devices/h918) | npjohnson, Simex, basamaryan, Androbots, AShiningRay, ROMSG, Geel | 21 |
| LG V20 (Verizon) | [vs995](https://wiki.lineageos.org/devices/vs995) | npjohnson, Simex, basamaryan, Androbots, AShiningRay, ROMSG, Geel | 21 |
| Nokia 6.1 Plus | [DRG](https://wiki.lineageos.org/devices/DRG) | npjohnson, Tuan Anh | 22.1 |
| Smartisan R1 | [trident](https://wiki.lineageos.org/devices/trident) | rtx4d |  |
