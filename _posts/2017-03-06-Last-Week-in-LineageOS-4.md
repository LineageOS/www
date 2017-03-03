---
layout: post
title: Last week in LineageOS
category: blog
excerpt: W/C 27th Feb 2017
author: harryyoud
---

## Welcome to LineageOS' weekly review, where we go over changes in the past week

### Major changes since 27th Feb 2017
* Addon SU for LineageOS 13.0 is fixed ([addon-su-13](https://review.lineageos.org/#/q/topic:addon-su-13+(status:open+OR+status:merged)))
* One Handed Mode has arrived! ([oneHand](https://review.lineageos.org/#/q/status:merged+branch:cm-14.1+topic:oneHand))
    * This feature is enabled in all LineageOS 14.1 builds from 6th February 2017. To use it on devices with on-screen navigation buttons, swipe right or left on the home button. On devices with hardware keys, you can set the trigger for this mode in 'Settings > Buttons'
    * Take a look at some GIFs of it in action:
    <div class="container">
        <div class="row">
            <div class="col-sm-6">
                <figure>
                    <video class="center-block" width="250" src="{{site.baseurl}}/images/2017-03-06/onehand-hardware.mp4" autoplay loop muted>
                        <img class="center-block" src="{{site.baseurl}}/images/2017-03-06/onehand-hardware.gif" style="max-width:250px">
                    </video>
                    <figcaption style="text-align:center;">For devices with hardware navigation buttons</figcaption>
                </figure>
            </div>
            <div class="col-sm-6">
                <figure>
                    <video class="center-block" width="250" src="{{site.baseurl}}/images/2017-03-06/onehand-navbar.mp4" autoplay loop muted>
                        <img class="center-block" src="{{site.baseurl}}/images/2017-03-06/onehand-navbar.gif" style="max-width:250px">
                    </video>
                    <figcaption style="text-align:center;">For devices with on-screen navigation buttons</figcaption>
                </figure>
            </div>
        </div>
    </div>

### Build roster

Added 14.1 devices

* ham - Lenovo ZUK Z1 ([#163343](https://review.lineageos.org/#/c/163343/))

Removed 14.1 devices

* chagallwifi - Galaxy Tab S 10.5 (Wi-Fi) ([#164362](https://review.lineageos.org/#/c/164362/))
    * "_Our current wifi fix does not work with signing and it will not be fixed in time_" ~deadman96385

Added 13.0 devices

* maguro - Samsung Galaxy Nexus (GSM)
* toro - Samsung Galaxy Nexus (Verizon)
* toroplus - Samsung Galaxy Nexus (Sprint)
