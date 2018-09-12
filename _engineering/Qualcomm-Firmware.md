---
layout: post
title: Qualcomm’s Chain of Trust
category: engineering
excerpt: Covering Qualcomm Bootloader’s up to the point of Android being loaded.
author:  Nolen Johnson(npjohnson)
date: 20180630
---

![hero]({{site.baseurl}}/images/engineering/hero_<title>.png){: .blog_post_image }

The Qualcomm chain-of-trust is a complex, yet straightforward to understand set of processes. Many of you have likely heard the term “bootloader” but have no clue what it actually is, or does.

In today’s post, the above will be covered as it pertains to Qualcomm chipsets.

## Glossary

* Bootloader: A general term for a link in the boot-chain that has a specific job that is run each cold-boot
* cold-boot: Fresh boot from powered off state
* QFUSE: Microscopic hardware fuse that is integrated into the SoC - Once physically blown, impossible to reset or replace
* SoC: System-on-chip (your phone’s “motherboard” of sorts)
* EFUSE: Software based fuse whose data is stored in QFPROM
* QFPROM: Qualcomm’s fuse region
* TrustZone: ARM’s “Secure World” implementation.
* QSEECOM: A linux kernel driver that lets us communicate with TrustZone, and issue an SCM call to TrustZone to do things like blow fuses. It only will allow signed applets and approved calls to be made.
* SCM: Secure Channel Manager (note: not related to Linux’s SMC)
* Verified Boot: Read [here](https://source.android.com/security/verifiedboot/), Tl;DR: A strict set of checks implemented at the aboot level to verify the integrity of various parts of the operating system.
* DM-Verity: A component of Verified Boot, checks partitions to see if they have beeen mounted read/write before, read more [here](https://source.android.com/security/verifiedboot/dm-verity)
* system_as_root: A new mount setup logic for android that mounts the system partition as / as opposed to /system. This means that system files now live at /system/system. This is a way for Qualcomm to check whether / has ever been remounted read/write under Verified Boot. It also introduces the new standard that the Android ramdisk be stored on the system partition, as opposed to being stored in the boot image.


## Qualcomm’s Chain of Trust/Boot Sequence

Qualcomm device’s chain of trust, bootloader sequence, and Secure World.

## Information

A bootloader by definition is a program that loads an operating system, or chain-loads another bootloader when a computer is turned on.

If the Qualcomm Secure Boot QFUSE fuse row is blown (which is such on 99% of non-Chinese/OnePlus production devices), then PBL is verified and loaded into memory from BootROM (non-overwritable). Next PBL is executed and brings a nominal amount of hardware up, then verifies the signature of the next bootloader in the chain (SBL1/XBL) and if valid, loads it into memory and executes it. These early bootloaders bring up core hardware (CPU’s, MMU, etc.), they also bring up core concurrent processes to Android such as the Secure World for ARM known as TrustZone. Pending success of the previous, aboot is then verified and executed. Aboot is what the large majority of you refer to as “bootloader mode”, as it is where services such as fastboot are housed. Aboot then in turn (optionally) verifies the signature of, loads, and executes the kernel. The kernel then unpacks the ramdisk into memory, and shortly after, Android’s Init begins, which brings up Android as we know it.

When we refer to “Bootloader Lock Status”, what we refer to are a set of cryptographic checks done on components in the bootloader/operating system set of software. When a device is referred to as “locked”, that means that aboot is currently enforcing digital signature integrity checks on the boot image of the device, whether that contains only the kernel like on system_as_root devices, or a full android boot image with kernel, ramdisk, and optionally DTB. These “Locked” devices don’t allow the user to flash partitions, cannot boot custom kernels, and verified boot will usually report “Green”. On “unlocked” devices, aboot lets the device flash and (for some OEMs) boot unsigned boot images, and Verified boot reports either “Orange” or “Red”.

Pending the above’s success, the Linux kernel is verified and loaded into memory, assigned its cmdline/atags/dtb by the aboot/abl, and executed. It then extracts the ramdisk (either from the boot image, or in system_as_root configurations, the system partition is verified and mounted at ‘/’ and the ramdisk extracted from there.


Maturity of the Chain:

The Qualcomm chain of trust has grown immensely in security in the last decade.

Diagrams to describe the maturity process of the chain of trust follow:

2013-2014 Era



2015-2017 Era


Modern (2018) Era
 

As you can see, the boot chain has evolved significantly. In 2015, the possible attack area was condensed, and the Secondary Bootloader (SBL) chain merged into one unified SBL. And as we move further down the line we see SBL entirely replaced with Qualcomm’s new proprietary solution, the Extended Bootloader (XBL), which mitigated many of the security issues in SBL.

Aboot has also matured from LittleKernel (an open source bootloader) with some additions into a fully independent solution now called the proprietary Android Bootloader (ABL). This new bootloader allows the use of UEFI, among many other security and quality-of-life enhancements for developers.

The system_as_root configuration has also improved security, as well as the general architecture significantly. It moves the ramdisk from being stored in the boot image to being stored in the system partition, which as the name would imply, is mounted as ’/’.

NOTE: The new seamless update system coined “A/B” is separate from system_as_root even though they are commonly seen hand in hand. OEM’s have the option of implementing one and not the other.



OEM Additions

Many OEM’s implement additional cryptographic checks into their bootloader sets to attempt to further security, or present a function (like allowing bootloader unlock to the end user).

Several prevalent examples:

-        Samsung’s use of the eMMC CID/a corresponding hashed blob of the CID to dictate developer (unlock) status.
-        Samsung’s “KNOX” QFUSE that is blown on any intrusion, and can be configured to wipe the device if triggered.
-        Motorola’s use of a single QFUSE that must be blown to unlock the device, permanently voiding the warranty.

OEM’s also often implement their own proprietary mode, that has a variety of uses. Some examples include:

-        Samsung’s proprietary Download mode for firmware flashing.
-        LG’s proprietary LAF (Download) mode for firmware flashing.
-        Google’s OSS Fastboot mode for firmware flashing.


OEM specific functions/modes often have major advantages over the general solution, but are also very likely to have unforeseen security vulnerabilities due to the additions (see LG’s repeated LAF mode vulnerabilities, or the SamDunk vulnerability that used Samsung’s CID method to unlock otherwise non-unlockable devices).


## Credits

Nolen Johnson (@npjohnson) heavily contributed to this post, and provided the diagrams based on one he previously created for an InfoSec presentation.



