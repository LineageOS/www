---
layout: post
title: PSA - ADB keys update
category: blog
excerpt: ADB keys need to be updated
author: luca020400
---

# PSA: ADB keys update

A recent change in our code requires ADB keys to be regenerated.

Here are the steps to do this:

1. Open 'Settings'
2. Scroll down, and select 'Developer options'
3. Scroll down to the 'Debugging' section
4. Click 'Revoke USB debugging authorizations'
5. Click 'OK'
6. Plug your device into a computer with ADB
7. Trigger a key authorization by running an adb command (_adb devices_ should suffice)
8. You're done
