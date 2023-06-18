---
layout: post
title: Bluetooth SBC Dual Channel HD audio mode
date: 2019-07-06
category: engineering
excerpt: 'Deep dive into the "HD Audio: SBC" checkbox'
author: ValdikSS
---

![hero]({{site.baseurl}}/images/engineering/hero_bluetooth_sbc_xq.jpg){: .blog_post_image }{: alt="On a maroon background, warm repeating line shapes emanate from the center toward the left and right, transforming from circles to rectangles as they near the image's edge. Large pink shapes, the Lineage logo, and the word Engineering sit on top."}

LineageOS 15.1 and 16.0 bring a unique audio quality enhancement to the stock Bluetooth SBC audio codec. It introduces support for SBC Dual Channel mode with the eXtreme quality profile (SBC XQ), bumping this old codec's audio quality to levels on par with Qualcomm's proprietary codec - aptX HD.

An additional "HD Audio: SBC" checkbox is available in users' Bluetooth audio device settings, as long as they are running a LineageOS 15.1 build created on or after the 31st of March 2019, or a 16.0 build created on or after the 13th of May 2019. Enabling this setting will toggle the Dual Channel mode, which offers an improved bitrate much higher than the one available in the stock SBC codec. The new bitrate of 452 or 551 kbps depends on the Bluetooth device's maximum Enhanced Data Rate and is a clear upgrade from the stock 328 kbps when using Joint Stereo mode.

The feature is available on all devices with LineageOS support, and can be used by the overwhelming majority of existing Bluetooth playback devices. It works best with cheaper audio devices that do not support additional codecs - aptX, aptX HD, AAC or LDAC.

## The SBC Codec

SBC has a lot of different parameters which are negotiated during the connection setup phase:

* **Audio channel (type and number)**: Joint Stereo, Stereo, Dual Channel, Mono;
* **Number of frequency bands**: 4 or 8;
* **Number of audio blocks in one audio frame**: 4, 8, 12, 16;
* **Quantization bit allocation algorithm**: Loudness, Signal-to-noise ratio (SNR);
* **Maximum and minimum bit pool used in quantization process**: usually 2 to 53;

The decoder (playback device) is required to support any combination of these parameters, but the encoder (smartphone) may only implement them partially.

Current Bluetooth stacks usually negotiate the following set of parameters, known as a profile: Joint Stereo, 8 bands, 16 blocks, Loudness and a bitpool of 2 to 53. This profile encodes 44.1 kHz stereo audio with a 328 kbps bitrate.

Of said parameters, the bitpool is especially important as it has a direct influence on bitrate: the higher it is, the higher the bitrate, and hence an improved quality. A specific bitpool value will lead to a corresponding bitrate value only when the other parameters in the profile remain unchanged.

The bitrate is also significantly affected by other parameters: the type of audio channel, the number of frequency bands and the number of audio blocks. You can increase the bitrate indirectly by negotiating non-standard profiles, without changing the bitpool. It is important to note that a higher bitrate does not always lead to better audio quality. For example, changing the number of blocks in a single audio frame from 16 to 4, when using Joint Stereo with a 53 bitpool, will increase bitrate from 328 kbps to 441 kbps, but will considerably decrease the algorithmic delay, which would in turn worsen the adaptive quantization process. This change won't bring better audio quality despite the increased bitrate.

![SBC bitrate formula]({{site.baseurl}}/images/engineering/content_bluetooth_sbc_xq_0.png){: .blog_post_image_content }

Fixed bitpool and bitrate values originated from the stock recommended profile for high quality audio. That recommendation should not have been the reason to set a limit on these parameters, as was done.

![SBC profiles]({{site.baseurl}}/images/engineering/content_bluetooth_sbc_xq_2.png){: .blog_post_image_content }

The A2DP specification v1.2, which was active from 2007 to 2015, requires all decoders to properly handle bitrates of up to 512 kbps:

>The decoder of the SNK shall support all possible bitpool values that do not result in excess of the maximum bit rate. This profile limits the available maximum bit rate to 320kb/s for mono, and 512kb/s for two-channel modes.

No bitrate limit was stated in the new version of the specification. It is assumed that modern headphones with EDR support released after 2015 can support bitrates of up to 1000 kbps.

## Dual Channel mode

Dual Channel mode encodes the left and right channels separately, using an individual bitpool for each channel, unlike Stereo or Joint Stereo, which both enforce a single bitpool for both channels. Switching the device from Joint Stereo to Dual Channel will almost double the bitrate to 617 kbps, which brings a noticeable change to the audio quality, while leaving the bitpool value of 53 unchanged.
I personally feel that bitpool should be an internal variable. I assume that it is an error of the A2DP specification design itself that lead to the bitpool value not being bound to other codec parameters and only being defined as an independent negotiated variable.

## Where did 551 and 452 kbps come from?

The Bluetooth time division technology is designed to efficiently transmit large fixed-size packets. Data transfer occurs in slots and the largest number of slots sent in one transmission is 5. There are also transfer modes which either use 1 or 3 slots, but never 2 or 4. You can transfer up to 679 bytes in 5 slots, at a connection speed of 2 Mbps, and up to 1021 bytes at a speed of 3 Mbps. When using 3 slots, the maximum amount of data is 367 and 552 bytes, respectively.

![Bluetooth transmission. Full 5 slot transmission takes 3.75 ms. Each slot takes 0.625 ms.]({{site.baseurl}}/images/engineering/content_bluetooth_sbc_xq_3.png){: .blog_post_image_content }

If we want to transfer less data than 679 or 1021 bytes but more than 367 or 552 bytes, the transfer will still take 5 slots, and the transmission will take the same amount of time, which would reduce the transmission efficiency.

![Bluetooth transmission. 550 bytes of data still require full 5 slot transmission and 3.75 ms.]({{site.baseurl}}/images/engineering/content_bluetooth_sbc_xq_4.png){: .blog_post_image_content }

44100 Hz audio encoded using SBC in Dual Channel mode with bitpool = 38, 16 blocks in a frame, 8 frequency bands, produces audio frame of 164 bytes, with 452 kb/s bitrate.

The audio payload should be encapsulated into L2CAP and AVDTP transmission protocols, which deduct 16 bytes of overhead from the audio payload.

![Frame length formula]({{site.baseurl}}/images/engineering/content_bluetooth_sbc_xq_1.png){: .blog_post_image_content }

One 5-slot audio transmission can contain up to 4 audio frames:

`679 (EDR 2 mbit/s DH5) - 4 (L2CAP) - 12 (AVDTP/RTP) - 1 (SBC header) - (164*4) = 6`

A single packet transmits up to 11.7 ms of audio data, which will be transmitted in 3.75 ms, and we have 6 unused bytes left in the packet.
If you slightly raise the bitpool, 4 audio frames can no longer be packed into a single transmission. You'll have to send 3 frames at a time, which would reduce transmission efficiency,  the amount of audio transmitted in one packet, and will increase the chance for audio stuttering under poor radio conditions.

551 kbps bitrate for EDR 3 Mbps was selected using the same principle: with Bitpool 47, 16 blocks per frame, 8 frequency bands, the frame size is 200 bytes, with a bit rate of 551 kbps. A single transmission can thus bundle up to 5 frames or 14.6 ms of music.

The algorithm for calculating all of the available SBC parameters is quite complicated, increasing the odds of a mistake. If you would like to calculate all of them manually, using this [interactive calculator](https://btcodecs.valdikss.org.ru/sbc-bitrate-calculator) is recommended.

## Can we go even further?

Android patchset has an additional option to increase bitrate for Enhanced Data Rate 2 mbps devices beyond their current limit. You can bump the bitrate from 452 kbps to 595 kbps, at the cost of reduced transmission stability when your device is facing congested radio conditions.

To enable this, run this command in a root shell:

`# setprop persist.bluetooth.sbc_hd_higher_bitrate 1`

This 595 kbps option is currently available in LineageOS 15.1, but not in 16.0 at the time this post was written.

## Does this change really have any benefits?

Serge Smirnoff, from SoundExpert, performed a [Bluetooth SBC XQ profile test](http://soundexpert.org/articles/-/blogs/audio-quality-of-sbc-xq-bluetooth-audio-codec). His test shows that SBC XQ 452 kbps audio has less artifacts than aptX, while 551 kbps is even comparable to aptX HD.

Want to hear the difference yourself? Try a [web service that encodes audio to SBC](https://btcodecs.valdikss.org.ru/sbc-encoder/) (as well as to aptX and aptX HD) in real time, right in the browser. You can compare the sound of different SBC profiles and other codecs without actually transmitting audio via Bluetooth using this service, on any wired headphones, speakers, and for your favorite music. You can also change the encoding parameters directly during audio playback.

## Conclusion

LineageOS users can now enhance their Bluetooth audio quality by just ticking the "HD Audio: SBC" checkbox in their Bluetooth device's settings. This feature should help change peoples' biased opinion of SBC as a low-quality and 'fallback' codec. When choosing a new Bluetooth headset or speaker, users will no longer have to take proprietary codecs into consideration.
