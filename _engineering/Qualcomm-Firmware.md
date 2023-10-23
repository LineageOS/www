---
layout: post
title: Qualcomm’s Chain of Trust
date: 2018-09-17
category: engineering
excerpt: Covering Qualcomm bootloader’s up to the point of Android being loaded
author: Nolen Johnson (@npjohnson)
---

![hero]({{site.baseurl}}/images/engineering/hero_qualcomm_firmware.jpg){: .blog_post_image }{: alt="Recolored photo of a stone stairway heading down from a left-side door. A closer stairway leads up from the center to the right. Large purple shapes, the Lineage logo, and the word Engineering sit on top."}

The Qualcomm chain-of-trust is a complex, yet straightforward to understand set of processes. Many of you have likely heard the term “bootloader” but have no clue what it actually is, or does.

In today’s post, the above will be covered as it pertains to Qualcomm chipsets.

## Glossary

* _Bootloader_: A general term for a link in the boot-chain that has a specific job that is run each cold-boot
* _cold-boot_: Fresh boot from powered off state
* _QFUSE_: Microscopic hardware fuse that is integrated into the SoC - Once physically blown, impossible to reset or replace
* _SoC_: System-on-chip (your phone’s “motherboard” of sorts)
* _EFUSE_: Software based fuse whose data is stored in QFPROM
* _QFPROM_: Qualcomm’s fuse region
* _TrustZone_: Qualcomm ARM chipset's “Secure World” implementation
* _QSEECOM_: A linux kernel driver that lets us communicate with TrustZone, and issue an SCM call to TrustZone to do things like blow fuses. It only will allow signed applets and approved calls to be made
* _SCM_: Secure Channel Manager (note: not related to Linux’s SMC calls)
* _DTB_: Device Tree Blob. Its purpose is to "provide a way to describe non-discoverable hardware" to Linux, read more [here](https://elinux.org/Device_Tree_Reference)
* _Android Verified Boot (AVB)_: A strict set of checks implemented at the aboot/ABL level to verify the integrity of various parts of the operating system, read more [here](https://source.android.com/security/verifiedboot/)
* _DM-Verity_: A component of Android Verified Boot that checks partitions to see if they have beeen mounted read/write before, read more [here](https://source.android.com/security/verifiedboot/dm-verity)
* _system_as_root_: A new mount setup logic for android that mounts the system partition as ‘/’ as opposed to ‘/system’. This means that system files now live at ‘/system/system’. This is a way for Qualcomm to check whether ‘/’ has ever been remounted read/write under Verified Boot. It also introduces the new standard that the Android ramdisk be stored on the system partition, as opposed to being stored in the boot image

## What is Qualcomm’s Chain of Trust/Boot Sequence?

Qualcomm device’s chain of trust, bootloader sequence, and Secure World.

## Information

A bootloader by definition is a program that loads an operating system, or chain-loads another bootloader when a device is turned on.

Qualcomm devices all use fuse based logic to dictate permanent feature configurations/cryptographic key sets. As stated above, the physical version of which is called a QFUSE, and is stored in a region on the SoC called QFPROM in rows.

If the QFUSE fuse row labeled Qualcomm Secure Boot is blown (which is such on non-Chinese/OnePlus devices), PBL (Qualcomm's Primary Bootloader) is verified and loaded into memory from BootROM, a non-writable storage on the SoC.
PBL is then executed and brings up a nominal amount of hardware, then verifies the signature of the next bootloader in the chain, loads it, then executes it.
The next bootloader(s) in the chain are SBL\*/XBL (Qualcomm's Secondary/eXtensible Bootloader). These early bootloaders bring up core hardware like CPU cores, the MMU, etc. They are also responsible for bringing up core processes
concurrent to Android such as the Secure World for Qualcomm ARM chipsets known as TrustZone. The last purpose of SBL\*/XBL is to verify the signature of, load, and execute aboot/ABL. Aboot is what the large majority of you refer to as “bootloader mode”, as it is
where services such as fastboot or OEM firmware flashing tools are housed. Aboot brings up most remaining core hardware then in turn normally verifies the signature of the boot image, reports the verity status to Android Verified boot
through dm-verity, then pending success of the previous two steps loads the kernel/ramdisk/DTB into memory. On many devices, Aboot/ABL can be configured to skip cyptographic signature checks and allow booting any kernel/boot image. After
aboot has loaded everything into memory, the kernel (in our case, Linux) then unpacks the ramdisk either from the boot image, or in system_as_root configurations, the system partition is verified and mounted at ‘/’ and the ramdisk extracted from there.
Shortly after this init is executed, which brings up Android as we know it.

The configuration option to disable cryptographic checks in aboot/ABL is often referred to as “Bootloader Lock Status”. When a device is referred to as “locked”, that means that aboot is currently enforcing digital
signature integrity checks by aboot/ABL on the boot image of the device and on newer devices, enforces a "Green" Android Verified Boot status. These “locked” devices don’t allow the user to flash partitions, and cannot boot
custom unsigned kernels. If a locked device is considered secure, Android Verified Boot will usually report “Green” and allow the device to continue booting, if it is considered insecure, it will report "Red" status and prevent the device from booting.
On "unlocked” devices, aboot/ABL lets the device flash, and some OEMs allow booting unsigned boot images from memory (fastboot boot), in which case Verified boot reports either “Orange” or “Red” depending on whether the images are signed or not,
but regardless allows the device to continue booting.

## Maturity of the Chain:

The Qualcomm chain of trust has grown immensely in security in the last decade.

Diagrams to describe the maturity process of the chain of trust follow:

### Pre-2013 Era

![2013-2014 Era diagram]({{site.baseurl}}/images/engineering/content_qualcomm_firmware_0.png){: .blog_post_image_content }

### 2013-2016 Era

![2015-2017 Era diagram]({{site.baseurl}}/images/engineering/content_qualcomm_firmware_1.png){: .blog_post_image_content }

### Modern (2016-2018) Era

![2018 Era diagram]({{site.baseurl}}/images/engineering/content_qualcomm_firmware_2.png){: .blog_post_image_content }

As you can see, the boot chain has evolved significantly. In 2015, the possible attack area was condensed, and the Secondary Bootloader (SBL) chain was merged into one unified SBL.
As we move further down the line we see SBL entirely replaced with Qualcomm’s new proprietary solution, the eXtensible Bootloader (XBL), which mitigated many of the security
issues SBL presented.

Aboot has also matured from LittleKernel (an open source bootloader) with some additions into a fully independent solution now called the proprietary Android Bootloader (ABL). This
new bootloader allows the use of UEFI, among many other security and quality-of-life enhancements for developers/OEMs.

The system_as_root configuration has also improved security, as well as the general architecture significantly. It moves the Android-ramdisk from being stored in the boot image to being
stored in the system partition, which as the name would imply, is mounted as ’/’. This was done in part to allow it to be verified by dm-verity/Android Verified Boot.

NOTE: The new seamless update system coined “A/B” is separate from system_as_root even though they are commonly seen hand in hand.
OEM’s have the option of implementing one and not the other.

## OEM Additions

Many OEM’s implement additional cryptographic checks into their bootloader sets to attempt to further security, or present a function (like allowing bootloader unlock to the end user).

Several prevalent examples:

 * Samsung’s use of the eMMC CID/a corresponding hashed blob of the CID in the aboot image to dictate developer (unlock) status.
 * Samsung’s “KNOX” QFUSE that is blown on any intrusion, and can be configured to wipe the device if triggered.
 * Motorola’s use of a single QFUSE that must be blown to unlock the device, permanently voiding the warranty.
 * Sony's use of a cryptographic blob and a bit set on their "TA" partition to allow unlock.

OEM’s also often implement their own proprietary mode, that has a variety of uses. Some examples include:

 * Samsung’s proprietary Download mode for firmware flashing.
 * LG’s proprietary LAF (Download) mode for firmware flashing.
 * Google’s OSS Fastboot mode for firmware flashing.

OEM specific functions/modes often have major advantages over the general solution, like the fact that Motorola was one of the first OEMs to extend the fastboot protocol to allow the flashing of sparse-chunked system images.
However, these solutions are also very likely to have unforeseen security vulnerabilities, such as LG’s frequent LAF mode vulnerabilities, or the [SamDunk](http://theroot.ninja/disclosures/SAMDUNK_1.0-03262016.pdf)
vulnerability that used Samsung’s CID method to unlock otherwise non-unlockable devices).

It is also important to note that while OEMs can customize aboot/ABL, and for a price, SBL\*/XBL, that PBL is built and distributed on the SoC by Qualcomm themselves.
PBL very rarely sees public exploits, as most fetch a large bounty throught Qualcomm's Bug Bounty Program, though PBL has seen a few public vulnerabilities before, such as Aleph Security's EDL (Qualcomm Download Mode) vulnerabillties,
which you can read about [here](https://alephsecurity.com/2018/01/22/qualcomm-edl-1/).