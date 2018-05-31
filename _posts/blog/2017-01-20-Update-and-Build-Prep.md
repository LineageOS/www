---
layout: post
title: Update & Build Prep
category: blog
excerpt: All systems operational
author: ciwrl
---

Alright, alright, alright - it's nearly 'go time' for builds to start flowing. Before everyone gets excited and rushes to download, we want to cover a few important points.

First, we want to thank everyone that stepped forward to assist with the infrastructure (and offers continue to pour in). Thanks to you all, all infrastructure pieces are lighting up 'Operational' on our lovely [status page.](https://status.lineageos.org)

Additionally, our [Download Portal](https://download.lineageos.org), [Install stats page](https://stats.lineageos.org) (yep, that's 50k+ unofficial installs already!) and [Wiki](http://wiki.lineageos.org) are all live. Notably, all three of these sites (and this blog) are open sourced - you can contribute to them via our Gerrit instance! Bear with us if these sites look bare at the moment, they will grow with content and design as we continue marching forward.

On to the fun stuff - build roster, release process and other details:

* The build roster is ever growing, but we are supporting Marshmallow and Nougat capable devices.
  * We'll list the 80+ devices in a separate post.
* Our release cadence will be 'weekly' by default (to be nice to all the donated hardware).
* We will NOT be shipping root baked into the ROM.
  * Root will be a downloadable zip based install similar to gapps installation (only need to flash it once).
  * Home builders that want to bake su back into the ROM can use the command 'export WITH_SU=true' prior to building.
* Our official builds will all be signed with a private key for authentication and signature permission control
  * This will not break, prevent or stop any 'unofficial' builds.
  * Key verification info can be found on the wiki [Verifying Build Authenticity page](http://wiki.lineageos.org/verifying-builds.html)

Regarding installation, we recommend that users wipe when switching to LineageOS, and reinstall their gapps. However, we recognize that this can be time consuming, so we are offering an EXPERIMENTAL (read as, if it fails, you'll have to wipe anyways) solution.

* Alongside the 'weekly' release for your supported device, we'll provide an EXPERIMENTAL data migration build.
* This build will allow you to 'upgrade' from CM to the signed LineageOS weekly
* This build may wipe permissions (you'll have to re-allow app permissions), but should retain all user data
* This build will be watermarked with an ugly banner to ensure that you don't permanently run this EXPERIMENTAL release, and upgrade to a normal weekly after.
* The process for this installation will be as follows:
  * Install EXPERIMENTAL migration build on top of cm-13.0 or cm-14.1 build (don't try to install LineageOS 13.0 on top of CM 14.1, that will not work).
  * Reboot
  * Install LineageOS weekly build
  * Reboot
  * Re-setup your application permissions

Given the EXPERIMENTAL nature of this process, we are going to remove this option in two months time.

Look for builds to start rolling out this weekend!

LineageOS Team
