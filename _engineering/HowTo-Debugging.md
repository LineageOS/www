---
layout: post
title: Android Debugging Crash Course
date: 2023-04-17
category: engineering
excerpt: Understanding the different tools used during debugging
author: Nicholas Lim (niclimcy)
---

![hero]({{site.baseurl}}/images/engineering/hero-debugging.png){: .blog_post_image }

## Glossary
* ADB: Short for Android Debug Bridge.
* Buffer: A fixed size stored in memory.
* CLI: Short for command-line interface.
* Commits: A snapshot of changes made for version control.
* Debugging: The process of finding and fixing errors, bugs, and unintended behavior.
* DTS: Short for Device Tree Source.
* gdb: Short for GNU Debugger.
* HAL: Short for Hardware Abstraction Layer.
* Kernel Space: Space where kernel runs and interacts with device drivers.
* Logging: Recording and storing events that occur when running software, such as error messages, warnings, and debugging information.
* PID: Short for Process ID.
* pstore: Short for Persistent Store.
* Rebase: The process of moving commits from one branch to another branch.
* UART: Short for Universal Asynchronous Receiver / Transmitter.
* User Space: Space where normal user processes run, such as applications.

## What is Debugging?
To understand Android debugging, it is important to understand the different parts of the Android system. At a high level, the Android system is made up of three main components: apps, the platform, and the kernel.

![Android Stack]({{site.baseurl}}/images/engineering/android_stack.png){: .blog_post_image_content }

## User Space Debugging
User space debugging allows us to find and fix app and platform issues. This process can be fairly straightforward on Android if we use the right tools.

### ADB
The Android Debug Bridge (ADB) allows us to access a device’s CLI (or shell), letting us use native debugging tools like Logcat. See our wiki on how you can start [Using ADB and fastboot](https://wiki.lineageos.org/adb_fastboot_guide) on your devices.

### logcat
`logcat` is a CLI tool that outputs a log of system messages including messages that you have written from your app with the Log class.

There are various circular buffers stored by the `logcat` process and they can be accessed using the `-b` option, with the following options available:

  * `radio`: Views the buffer that contains radio/telephony related messages.
  * `events`: Views the interpreted binary system event buffer messages.
  * `main`: Views the main log buffer (default), which doesn't contain system and crash log messages.
  * `system`: Views the system log buffer (default).
  * `crash`: Views the crash log buffer (default).
  * `all`: Views all buffers.
  * `default`: Reports main, system, and crash buffers.

You can find out more about how to use `logcat` on [Android Developers](https://developer.android.com/tools/logcat).

### Interpreting a crash buffer from `logcat`
**:/ $** `adb shell logcat -b crash`

  ```java
  --------- beginning of crash
  04-14 11:22:34.256  5199  5199 E AndroidRuntime: FATAL EXCEPTION: main
  04-14 11:22:34.256  5199  5199 E AndroidRuntime: Process: com.android.settings, PID: 5199
  04-14 11:22:34.256  5199  5199 E AndroidRuntime: java.lang.RuntimeException: Unable to resume activity {com.android.settings/com.android.settings.SubSettings}: java.lang.ArrayIndexOutOfBoundsException: length=7; index=7
  …
  ```

> Date Time PID PID LogLevel MainProcess: Message

The crash buffer is particularly useful for debugging app crashes (e.g., Settings has stopped), identifying runtime errors.

### Tombstones
Sometimes, the ADB service may not be running (possible reasons include a system process causing a reboot before adb has started). In such a case, we are not able to access the logcat command. Fret not, a tombstone file is written to /data/tombstones, which contains a stack trace leading up to the crash.

Tombstones are also more detailed, providing a longer stack trace if a logcat output is insufficient. It is hence possible to export the tombstone from a running process using the following command:

  **:/ $** `adb shell debuggerd {PID}`

### ramoops-pmsg
ramoops-pmsg user space accessible version of ramoops. See below for a more detailed explanation of the ramoops kernel feature.

## Kernel Space Debugging
Kernel space debugging helps us identify issues within the kernel. Device manufacturers, on top of providing device kernel drivers, may customize other parts of the kernel when releasing a device kernel source. As such, when a device maintainer rebases their device kernel on newer kernel versions (to keep up with security patches), regressions may occur.

### dmesg
`dmesg` is a CLI tool that displays kernel buffer messages. It provides a detailed view of kernel-level activities allowing device maintainers to diagnose system crashes, driver issues, and monitor system events.

Example of a truncated dmesg output showing a NULL pointer dereference:

  **:/ $** `adb shell dmesg`

  ```log
  | Unable to handle kernel NULL pointer dereference at virtual address 0000000000000010
  | Internal error: Oops: 96000006 [#1] SMP
  | Call trace:
  | update_insn_emulation_mode+0xc0/0x148
  | emulation_proc_handler+0x64/0xb8
  | proc_sys_call_handler+0x9c/0xf8
  | proc_sys_write+0x18/0x20
  | __vfs_write+0x20/0x48
  | vfs_write+0xe4/0x1d0
  | ksys_write+0x70/0xf8
  | __arm64_sys_write+0x20/0x28
  | el0_svc_common.constprop.0+0x7c/0x1c0
  | el0_svc_handler+0x2c/0xa0
  | el0_svc+0x8/0x200
  ```

### ramoops
ramoops is a [Linux Kernel feature](https://www.kernel.org/doc/html/next/admin-guide/ramoops.html) that writes to memory before a system crashes. ramoops can be set-up in a device’s kernel device tree source (DTS), by reserving a memory buffer for ramoops-pmsg. It works in conjunction with the kernel pstore driver to save the ramoops to a persistent file at `/sys/fs/pstore` before a reboot.

An example of a ramoops configuration with a pmsg buffer allocated:

  ```C
  /{
      reserved-memory {
          ramoops: ramoops@b0000000 {
              compatible = "ramoops";
              reg = <0 0xb0000000 0 0x00400000>;
              record-size = <0x40000>; /*256x1024*/
              console-size = <0x40000>;
              ftrace-size = <0x40000>;
              pmsg-size = <0x200000>;
              ecc-size = <0x0>;
          };
      };
  };
  ```

On newer kernels, ramoops can be enabled via the following config options:

  ```
  CONFIG_PSTORE=y
  CONFIG_PSTORE_CONSOLE=y
  CONFIG_PSTORE_RAM=y
  ```

### Serial / gdb
On devices with a UART port (see Google Pixels with 3.5mm headphone port), a UART cable can be connected to view kernel console messages (kgdb). With serial, you can debug issues that happen even before the kernel has started.

You can consider using serial when your device is for example stuck on the boot logo (usually an oem’s logo).

## Conclusion
Debugging is a crucial process in ensuring the stability of LineageOS. It helps identify and rectify errors and bugs that could potentially cause the system to crash or malfunction. By using some of the debugging tools mentioned above, we can effectively trace the source of an issue and fix it promptly. The constant debugging and testing of LineageOS also helps to improve performance and functionality over time. Overall, debugging is an essential aspect of maintaining the stability and reliability of LineageOS, ensuring that users have a smooth and seamless experience.

## Bonus
While working on non private system apps like Aperture, you could use [Android Studio](https://developer.android.com/studio) for easier testing and debugging!
