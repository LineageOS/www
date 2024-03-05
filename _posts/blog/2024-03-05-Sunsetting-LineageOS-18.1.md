---
layout: post
title: Sunsetting LineageOS 18.1
category: blog
excerpt: So long, and thanks for all the fish
author: npjohnson
---

The final official builds of LineageOS 18.1 were triggered today and will be published in the coming days for all currently supported devices.

### WHAT, WHY?
Google releases Android Security Bulletins (ASBs) every month for supported Android versions.

These bulletins serve to attest that all currently known security vulnerabilities are remediated, with appropriate tracking and references for each.

On 02-05-2024 Google published the final ASB for Android R, which LineageOS 18.1 is based on.

### Can’t you just backport the security patches from newer versions?
While we could (and some independent developers likely will) backport security patches to LineageOS 18.1, we won’t be doing so for a variety of reasons.

The largest of which is that it is extremely difficult to properly track changes across versions as they pertain to each patch/security vulnerability, and there is even a chance that in backporting the code incorrectly we introduce new security vulnerabilities.

In short, there is no proper and reliable way to patch LineageOS 18.1 that will result in devices being more secure than they were before.

### What does this mean for my device?
Check the Wiki for your device, and see if an upgrade is available for your device to newer LineageOS versions. If it is, please upgrade to ensure continued support.

If your device shows as “Unmaintained”, no more official builds will be generated. You are welcome to follow the Wiki’s awesome per-device build guide, and build images for yourself, though!

### What defines a “legacy device”?
Any device that lacks a proper, reasonably up to date in-kernel eBPF implementation or an appropriately backported one (like in the case of Linux kernel 4.4).

Any device shipping with a Linux kernel version less than or equal to 3.18 lacks eBPF entirely, and backporting it is a near impossible task.

For context, in-kernel eBPF was made a hard requirement in Android S, and by proxy LineageOS 19.1 when AOSP removed legacy iptables support.
