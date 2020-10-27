---
layout: post
date: 2020-10-26
category: engineering
excerpt: Basics of Working with SELinux on Android
author: Aayush Gupta (theimpulson)
---

 ![hero]({{site.baseurl}}/images/engineering/hero-selinux.png){: .blog_post_image }

## Glossary
* AOSP: Short for Android Open Source Project.
* AVC: Short for Access Vector Cache, the cache used by SELinux to store its decisions regarding access control.
* comm: Short for Communication.
* LSM: Short for Linux Security Modules, a framework which is part of Linux, allows supporting various security implementation.
* MAC: Short for Mandatory Access Control, a type of access control via which an OS constrains the ability of the initiator to perform the action in question.
* macros: A single instruction that expands into a set of instructions when called.
* NSA: Short for National Security Agency of the United States of America.
* regex: Short for Regular Expression.
* scontext: Short for Source Context, also referred to as Domain.
* SELinux: Short for Security-Enhanced Linux.
* SELinux policy: Policy used by SELinux which specifies a set of permissions.
* SoC: Short for System on Chip.
* tclass: Short for Target Class.
* tcontext: Short for Target Context.

## What is SELinux?
SELinux is a Linux kernel module that provides support to enforce **access control** security policies to enforce MAC. It is based on the LSM framework.

## History of SELinux
SELinux was originally developed by the [NSA](https://www.nsa.gov/) to demonstrate the value of MAC and how it can be applied to Linux. It was merged in Linux 2.6 on Aug 2003. [Red Hat](https://www.redhat.com/), [McAfee Corp.](https://www.mcafee.com/) are some of the significant contributors to the development of SELinux. Later on, a separate project called *Security Enhancements (SE) for Android* was led by NSA to integrate SELinux into Android. This project resulted in SELinux being a core part of Android. It was introduced in Android 4.3 in permissive mode, partially enforced in Android 4.4, & from Android 5.0 SELinux was completely enforced in Android.

## How SELinux works?
SELinux can operate in 2 modes which are **Enforcing** and **Permissive**. The default mode is Enforcing.

* In Enforcing mode, SELinux actively enforces the given policy which specifies what is allowed (permissions in general). If an initiator wants to perform an action, SELinux will check if it is allowed to do so in the given policy, and if allowed, only then will permit the requested action to happen. If denied, it will be logged in the kernel log buffer, which can be usually read via *dmesg*, and also on Android with *logcat*.

* In Permissive mode, SELinux only logs about the action which was taken by which initiators and was not allowed in the given policy. It doesn't restrict them.

An example log of SELinux denial looks like this:

`avc: denied { write } for comm="power@1.2-servi" name="tp_double_tap" dev="proc" ino=4026533160 scontext=u:r:hal_power_default:s0 tcontext=u:object_r:proc:s0 tclass=file permissive=0`

Permissive mode is used mostly by developers during the early stages of working on a new Android project, for instance, a developer who is working on booting a new Android release. This allows developers to save time during initial stages of development by logging all the policy which is needed by different process, services, firmware, etc and address them all together once the project has reached a required amount of stability.

## SELinux policy in a nutshell
SELinux policy is a set of rules (permissions) which states which initiator can perform which type of action. If a particular action it wants to perform is not permitted explicitly in the policy, SELinux will deny it. Therefore, on production devices, it's of utmost importance to have a complete set of rules in the SELinux policy to avoid breakages/bugs due to SELinux. SELinux policy must be as strict as possible to obtain maximum security. One while writing SELinux policy must remember 'If it ain't broke, don't fix it'.

By default, Android provides an SELinux policy for the components which are specific to the system. You can find this stored in [platform/system/sepolicy](https://android.googlesource.com/platform/system/sepolicy/+/refs/heads/master) repository of the AOSP. Later parties which does additions to the AOSP to produce a working ROM must write their SELinux policy regarding additions, the access they require. For example, Qualcomm provides sepolicy for its SoCs in [device/qcom/sepolicy](https://source.codeaurora.org/quic/la/device/qcom/sepolicy/) repository on its codeaurora servers. LineageOS provides sepolicy to the developers for it's additions/features on AOSP in [device/lineage/sepolicy](https://github.com/LineageOS/android_device_lineage_sepolicy) repository hosted in the LineageOS GitHub organization.

All of these different SELinux policy codes/rules are compiled together to generate device-partitions specific SELinux policy. For example, SELinux policy rules which are specific to the system partition will end up in system image, vendor partition specific rules will end up in vendor image, etc. These device-partition-specific policies are compiled together into one single SELinux policy when an Android system boots up and is used by SELinux.

## How to Write SELinux policy?
SELinux policy as said before is just a set of rules. Writing SELinux policy means writing these rules which may contain permissions, labeling (assigning name to) an initiator, allowing an initiator to run in permissive mode, etc. So, writing SELinux policy can be sub-divided into a lot of smaller parts concerning the type of rule being written.

There are a lot of statements that are used while writing SELinux policy. However, given the scope of the article, we will only discuss statements which are recurring and basic. These statements are used by device maintainers a lot while writing device-specific SELinux policy rules.

The first step is to label the initiator, if not done already. This ensures that the permissions granted are not towards a general target but a specific one. This results in specific initiators having only those permissions which they require to perform a specific action.

### Labeling an initiator (Not an App)
The blueprint is: `/path/to/initiator/     u:object_r:context_name_you_want:s0`

An example rule to label NFC service would be something like: `/(vendor|system/vendor)/bin/hw/android\.hardware\.nfc@1\.2-service\.sec       u:object_r:hal_nfc_default_exec:s0`

You should use regex to label an inititaor. All such label goes into a single file named *file_contexts*. For example reference, please check [platform/system/sepolicy/private/file_contexts](https://android.googlesource.com/platform/system/sepolicy/+/refs/heads/master/private/file_contexts).

### Labeling an initiator (App)
The blueprint is: `user=user_of_app seinfo=info name=name_of_app domain=scontext_to_assign type=type_of_file`

An example rule to label qtidataservices app would be something like: `user=radio seinfo=platform name=.qtidataservices domain=qtidataservices_app type=radio_data_file`

All label for applications goes into a single file named *seapp_contexts* formatted as partition requires. For example reference, please check [platform/system/sepolicy/private/seapp_contexts](https://android.googlesource.com/platform/system/sepolicy/+/refs/heads/master/private/seapp_contexts).

### Labeling filesystems
*genfscon* is a statement used to allocate contexts to file systems that don't support any other type of labeling statements. The blueprint is: `genfscon filesystem_name partial_path filesystem_context`

An example rule to label `/proc/hwmodel` would be something like: `genfscon proc /hwmodel            u:object_r:proc_fih:s0`

All genfscon statements go into a single file named *genfs_contexts*. For example reference, please check [platform/system/sepolicy/private/genfs_contexts](https://android.googlesource.com/platform/system/sepolicy/+/refs/heads/master/private/genfs_contexts).

Notice how statements used to label services, process, applications, file systems doesn't end with `;` unlike other statements used to grant permissions or suppress them.

Once the initiator has a label, permissions can be granted to it as required to perform the desired action.

### Allowing permission
If you want to allow an initiator permissions for some action, you can use the `allow` statement. This is used to grant permission.
The blueprint is: `allow scontext tcontext:tclass permission;`

An example in regards to this specific case:

`avc: denied { read write } for pid=4565 comm="init.qcom.post_" name="read_ahead_kb" dev="sysfs" ino=52742 scontext=u:r:qti_init_shell:s0 tcontext=u:object_r:sysfs_dm:s0 tclass=file`

The given permission would be: `allow qti_init_shell sysfs_dm:file { read write };`

### Suppressing a denial
If your logs contain some denials that you want to hide/suppress for some reason, you can use the `dontaudit` statement. The blueprint is: `dontaudit scontext tcontext:tclass permission;`

An example in regards to this specific case:

`avc: denied { read } for comm="thermal-engine" name="kgsl" dev="sysfs" ino=29020 scontext=u:r:thermal-engine:s0 tcontext=u:object_r:sysfs:s0 tclass=dir permissive=0`

The rule to suppress this log would be: `dontaudit thermal-engine sysfs:dir read;`


AOSP recommends to keep all rules (permissions, denials, log suppressions, permissive mode) regarding a specific initiator under a separate file in the *.te* format having it's scontext as the name. For example, all rules regarding an initiator having a scontext of *hal_power_default* would be stored in a file named *hal_power_default.te*. For example reference, please check [platform/system/sepolicy/public/vold.te](https://android.googlesource.com/platform/system/sepolicy/+/refs/heads/master/public/vold.te).

## The Concept of never allow
*neverallow* is a statement that is used to mark specific rules that must not be generated. The word *generated* refers that it is a compile-time action and not runtime. Hence, if you mark a specific rule as neverallow and grant permission regarding the same in another rule, the compiler will trigger an error and stop the compilation.

An example rule: `neverallow my_gallery my_secret_passwords:{ dir file } { read write open };`

In Android, you can find neverallows inside the system sepolicy repository. Android marks several rules as neverallow which can potentially weaken the system security. For example, every file on the system has a type called *system_data_file*, now assume that you have an initiator which wants *{ read write }* access a specific file having *system_data_file* as type. Now, if you grant it such permission, that means you allow the initiator to read & write every file on the system (as every file in the system has the same file type). This is a big security exception. Hence, it would be marked as a neverallow. A solution to this issue would be to label the file with a different context and then grant the initiator the required permissions.

While by default, a lot of rules are already marked as neverallow, not all possible exceptions are covered. It depends upon the developer to carefully grant permission keeping all scenarios in mind. For example reference, please check [platform/system/sepolicy/public/vold.te](https://android.googlesource.com/platform/system/sepolicy/+/refs/heads/master/public/vold.te).

## Macros
By default, there are several macros available to use while writing the SELinux policy. These macros not only makes writing SELinux policy easier but are also recommended to use for various reasons, such as granting a lot of permissions to a certain initiator, granting a specific set of permission for a specific task to an initiator, etc. They reduce the amount of code a developer has to write, group a specific set of rules for specific use cases, and many more benefits.

An example of using macros while writing SELinux policy to allow permissions would be:

Example 1: Macros used: *r_file_perms*

**Without macros:** `allow hal_power_default sysfs:file { read open watch lock };`
**With macros:** `allow hal_power_default sysfs:file r_file_perms;`

Example 2: Macros used: *r_dir_file*

**Without macros** `allow ueventd firmware_file:dir { open search };` and `allow ueventd firmware_file:file { read getattr open };`
**With macros** `r_dir_file(ueventd, firmware_file)`

Notice how using macros shorten the amount of code and granted the required set of permissions. You can check the available macros in [global_macros](https://android.googlesource.com/platform/system/sepolicy/+/refs/heads/master/public/global_macros) and [te_macros](https://android.googlesource.com/platform/system/sepolicy/+/refs/heads/master/public/te_macros) present in [platform/system/sepolicy](https://android.googlesource.com/platform/system/sepolicy/+/refs/heads/master) repository of AOSP.

## Some useful tools
There are some useful tools available that help working with SELinux and writing SELinux policy. Some of them are:

[`chcon`](https://linux.die.net/man/1/chcon) Helps in changing the SELinux context of a target.  
[`audit2allow`](https://linux.die.net/man/1/audit2allow) Generates SELinux policy containing allow & dontaudit rules. Doesn't covers neverallow exceptions. [`audit2allow.perl`](https://github.com/OpenDarwin-CVS/SEDarwin/blob/master/sedarwin7/src/sedarwin/policycoreutils/audit2allow/audit2allow.perl) hosted at [OpenDarwin-CVS/SEDarwin](https://github.com/OpenDarwin-CVS/SEDarwin/) is a script which requires no external dependencies & runs on any platform unlike morden versions.  
[`restorecon`](https://linux.die.net/man/8/restorecon) Restores the default SELinux contexts of the given target.  
[`sepolicy-inject`](https://github.com/phhusson/sepolicy-inject) Injects allow rules into binary SELinux kernel policies.

### Stock SELinux policy as a reference
Every stock firmware/ROM has an SELinux policy inside specific partition images. The general location of the policy is `partition_name/etc/selinux/`. This means if you are looking for SELinux policy related to the system image, it would be available in `/system/etc/selinux`, for vendor image, it would be in `/vendor/etc/selinux` and so on. Remember that the partition path differs heavily depending upon the device. A developer when writing SELinux policy for their specific device may use this stock policy as a reference. This helps in not only speeding up the task of writing rules but also serves as a reference to which rule should be granted, which not, how to address specific cases, etc.

## Useful references
I have taken a lot of references from these websites. I believe they are really helpful, hence, I am sharing them below. Do check them out for more information related to SELinux on Android.

* [source.android.com](https://source.android.com/security/selinux)
* [selinuxproject.org](https://selinuxproject.org/page/Main_Page)
* [Wikipedia](https://en.wikipedia.org/wiki/Security-Enhanced_Linux)
