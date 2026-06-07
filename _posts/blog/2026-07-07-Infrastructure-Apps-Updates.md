---
layout: post
title: Summertime Updates!
category: blog
excerpt: Exciting changes of all shapes and sizes are on their way!
author: Inhishonor
---

## It's Summer (in the Northern Hemisphere at Least)

Hello again! We are continuing our trend of providing more than a yearly update, in order to inform you of some changes to our infrastructure, your apps, and your security. Over the past few months we have had many contributors tirelessly working on every aspect of the OS, and the infra behind it, especially our contributor niclimcy who is responsible for many of the changes listed below.

### New Stats Page

One of the biggest updates so far was the rewriting of our [stats page](https://stats.lineageos.org/) by niclimcy, luk1337, and luca020400. The updated application includes a map to view active locations; filtering by country, by carrier, by device model, and by version.

### Web Flashing Support

Thanks to niclimcy and luk1337, we are pleased to offer a web flasher, something that had been sorely missing for many years. Now by accessing the [flasher through our download portal](https://download.lineageos.org/flash), you will be able to use your browser to flash using fastboot and adb. Please remember though that this is not a complete flashing process, you still _must_ follow our [wiki instructions](https://wiki.lineageos.org/devices/) for your specific device.

### Wiki Dark Mode

The wiki is the source of all truth related to LineageOS, but it was also the source of temporary blindness. Thankfully, niclimcy has remedied this for us by adding built-in dark mode. And we must say, it looks very nice.

### Gerrit Updates

Our code review instance has not only been updated to the latest version, but has also had a few improvements made to it as well. In the past it was required to login with a Google account, but now you will be able to choose between logging in with your Google _or_ your GitHub account.

### Issue Tracker

Our issue tracker has been recently migrated to [GitHub](https://github.com/LineageOS/issues/issues) away from GitLab, due to problems with their automatic issue handling, and the inability to sign up without a phone number, among other things. The new issue tracker features many new improvements, including an easy to fill out issue forms, and immediate notification of maintainers.

### Security Updates

With the release of Android 16, Google changed the way it has been handling security patches for Android, by bundling most patches into quarterly releases. We have adapted to these changes by doing the following.

1. For LineageOS versions 21, 22, and 23; we are testing and merging patches as soon as they are released.

2. For LineageOS versions 18, 19, and 20; we are backporting patches as quickly as possible, and are currently providing security up to the July 2026 patch level.

3. For LineageOS versions 14, 15, 16, and 17; the process of backporting is much more difficult (due to codebase changes), so support is much more hit and miss. LineageOS 16 and 17 have full support to November 2025, and 14 and 15 should be catching up soon.

Please keep in mind though that for some of these older versions, backporting is very complex, so we can't guarantee complete (or even partial) security. But rest assured we are doing our best to support every Android version as long as we can.

![LineageOS Security Patch Level by Branch]({{site.baseurl}}/images/2026-06-08/security-patch-level-by-branch.png){: .blog_post_image_full }

A big thanks to mse1969 for spearheading the efforts, with assistance from Lost-Entrepreneur439, FlameFire, Syphyr and npjohnson!

### App Updates

It hasn't just been background updates to the OS, default apps have received several updates as well. Our integrated backup [Seedvault](https://github.com/seedvault-app/seedvault) solution and the default calendar [Etar](https://github.com/Etar-Group/Etar-Calendar) have both been updated to their latest versions. Twelve, our default music app, has received [Ampache](https://ampache.org/) support thanks to longtime contributor SebaUbuntu. And finally, Glimpse (our default gallery app) received a few improvements including Double-Tap to seek support in videos, better lock screen handling, support for motion photos, and a setting to remember the last playback position when watching videos.

#### Updater

Last blog post we teased massive changes to our Updater app, and thanks to the amazing work of pjgowtham we are pleased to unveil it. These changes have implemented Material 3 Expressive, modernized many aspects of the underlying codebase, improved the user experience, and made the app more reliable and efficient. In addition to the above changes, we have made changes to the updater API to expose more information about each individual update, mainly which [ASBs](https://wiki.lineageos.org/glossary/#asb-android-security-bulletin) are included.

### The Future

Google has released Android 17 has released to the public. Therefore, LineageOS 24 development is underway. As always, there will be no ETAs provided - but we are progressing nicely!

### Translations

Thanks to the work of a team of contributors, we are pleased to announce that we are adding another language to our roster; Please welcome Central Kurdish! And we still need translators (for it and all other languages), so if you are bi-, tri-, or anything lingual please visit [our wiki](https://wiki.lineageos.org/how-to/translate) and join us in our efforts to make LineageOS accessible for everyone, everywhere.
