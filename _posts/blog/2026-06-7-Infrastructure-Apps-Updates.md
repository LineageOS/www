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

niclimcy came through again for us, by adding web flasher support, something that had been sorely missing for many years. Now by accessing the [flasher through our download portal](https://download.lineageos.org/flash), you will be able to use your browser to flash using fastboot and adb. Please remember though that this is not a complete flashing process, you still _must_follow our [wiki instructions](https://wiki.lineageos.org/devices/) for your specific device.

### Wiki Dark Mode

The wiki is the source of all truth related to LineageOS, but it was also the source of temporary blindness. Thankfully, niclimcy has remedied this for us by adding built-in dark mode. And we must say, it looks very nice.

### Gerrit Updates

Our code review instance has not only been updated to the latest version, but has also had a few improvements made to it as well. In the past it was required to login with a Google account, but now you will be able to choose between logging in with your Google _or_ your GitHub account. Moreover, we have removed the CLA (Contributor License Agreement) requirement that was necessary for contribution in the past.

### Security Updates

Google released their quarterly security patches in June, and we promptly merged them into Lineage versions 21, 22, and 23. Additionally, we have backported those patches back to Lineage versions 19 and 20, and will continue to support all the above versions.

Recently, we have had a renewed effort to support older versions back until Lineage 14, and while we can't guarantee complete (or even partial) security, we are doing our best to merge all the applicable patches so that if you choose to run these versions there is still some measure of protection.

### App Updates

It hasn't just been background updates to the OS, default apps have received several updates as well. Our integrated backup [Seedvault](https://github.com/seedvault-app/seedvault) solution and the default calendar [Etar](https://github.com/Etar-Group/Etar-Calendar) have both been updated to their latest versions. Tweleve, our default music app, has received [Ampache](https://ampache.org/) support thanks to longtime contributor SebaUbuntu. And finally, Glimpse (our default gallery app) received a few improvements including Double-Tap to seek support in videos, better lock screen handling, and the setting to remember the last playback position when watching videos.

#### Updater

Last blog post we teased massive changes to our Updater app, and thanks to the amazing work of pjgowtham we are pleased to unveil it. These changes have implemented Material 3 Expressive, modernized many aspects of the underlying codebase, improved the user experience, and made the app more reliable and efficient.

### Translations

Thanks to the work of a team of contributors, we are pleased to add Central Kurdish to our roster of languages! And we still need translators, so if you are bi-, tri- or anything lingual please visit [our wiki](https://wiki.lineageos.org/how-to/translate) and join us in our efforts to make LineageOS accessible for everyone, everywhere.
