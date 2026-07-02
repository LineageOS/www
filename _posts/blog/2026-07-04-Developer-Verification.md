---
layout: post
title: Developer Verification
category: blog
excerpt: What it is, and how it affects you
author: Nolen Johnson (npjohnson)
---

## Developer Verification: What it is, and how it affects you

### What is Developer Verification?
[Android Developer Verification](https://developer.android.com/developer-verification) is Google's requirement, rolling out regionally starting September 2026 (global by 2027), that apps be registered to an identity-verified developer before they can be installed on a "certified" Android device, meaning any device shipping Google Play, Play Services, and the rest of the Google Mobile Services (GMS) suite. This applies regardless of the installation source; whether it is the Play Store, third-party stores, or direct APK sideload.

### How does this affect LineageOS and its users?
TL;DR: This will not affect LineageOS directly. But it *may* affect users running the stock ROM on their device.

When the [stock ROM](https://wiki.lineageos.org/glossary/#stock-rom) is installed on a certified device, package installation will be gated by the package "AndroidDeveloperVerification", which will check against the developer's registered/verified signing identity. Google is providing an ["advanced flow"](https://android-developers.googleblog.com/2026/03/android-developer-verification.html) opt in for power users to install unverified-developer apps after acknowledging risk and waiting a full day. This is a one-time toggle to disable verification, not something you have to redo every time you wish to install a package.

### Why is Google doing this?
We don't actually know. What we have is Google's stated reasoning, and even if you're skeptical of the outcome, it's worth taking at face value.

Google's public justification is fraud and malware prevention: they claim [over 50x more malware](https://www.androidauthority.com/android-developer-verification-requirements-3590911/) comes from sideloaded/internet sources than from the Play Store, and that anonymous, disposable developer identities let bad actors get caught, rebrand, and redistribute the same malware in hours. They've also pointed to regulatory pressure (the EU's DSA, India's IT Rules, etc.) pushing platforms toward developer traceability generally and framed the rollout order (fraud-heavy markets first: Brazil, Indonesia, Singapore, Thailand) as evidence the fraud rationale is the actual driver rather than a pretext.

That's the claim. Whether or not it's the whole story is a separate question.

Critics such as F-Droid, EFF, and ["Keep Android Open"](https://keepandroidopen.org) point out that this also happens to route every install path through Google-controlled infrastructure, hands Google a kill switch over any app or developer worldwide, and arrives shortly after Google's antitrust lawsuits.

Both things can be true at once: real fraud is a problem and the restriction of developers is a convenient side effect of solving it this way - and we're not in a position to pretend we know Google's internal reasoning. We're just telling you what they've said and what it changes; you can weigh the "why" yourself.

### What are we going to do about it?
This changes _nothing_ for LineageOS, so we don't need to take any direct actions. This isn't a switch Google flips on our behalf, it is enforced by a dedicated application called "AndroidDeveloperVerification" (`com.google.android.verifier`), which the OS is then told is _the_ designated verification gatekeeper. For curious developers or other ROM maintainers, it is wired up through two framework overlays, `config_developerVerificationServiceProviderPackageName` and `config_developerVerificationPolicyDelegatePackageName`.

This is a different situation from [Play Integrity](https://wiki.lineageos.org/quirks/snet/): Play Integrity's attestation logic lives inside Play Services itself, and apps call into it directly for attestation. Developer Verification, by contrast, is its own standalone app that the frameworks are pointed at as a provider.

We have not ever, nor do we intend to ever, ship GMS. That means we're not subject to the Google Test Suite (GTS) certification Google apps are required to pass. Therefore we have no obligation to install "AndroidDeveloperVerification" or point the aforementioned configurations (overlays) at it.

### What can you do about it?
If you sideload [GApps packages](https://wiki.lineageos.org/glossary/#gapps), be aware that a GApps package could choose to bundle "AndroidDeveloperVerification" and enable it. We're not aware of any reason an aftermarket GApps package would opt into that, since doing so would restrict what its own users can sideload. If your GApps provider ever does, you can simply switch to a different package.

### So it's a separate app... for now. Could Google move the functionality into Play Services?
They absolutely could. If that happens, we'll do what we already do for a number of annoying Play Services-provided [over-the-air update implementations](https://github.com/LineageOS/android_vendor_lineage/blob/lineage-23.2/prebuilt/common/etc/lineage-component-overrides.xml): disable it globally.

### What have we (LineageOS) done about all of this?
We have signed the ["Keep Android Open"](https://keepandroidopen.org) petition alongside a number of other FOSS foundations and organizations with the hope of supporting independent developers.

The LineageOS Team
