---
layout: post
title: Bluetooth SBC Dual Channel HD audio mode
date: 2019-07-05
category: engineering
excerpt: "What's hiding behind new \"HD Audio\: SBC\" option in LineageOS"
author: ValdikSS
---

![hero]({{site.baseurl}}/images/engineering/hero_bluetooth_sbc_xq.png){: .blog_post_image }

LineageOS 15.1 and 16.0 brings a unique audio quality enhancement to stock Bluetooth SBC audio codec. It introduces SBC Dual Channel mode support with eXtreme quality profile (SBC XQ), bumping this old codec audio quality to be on par with Qualcomm proprietary aptX HD.

Users of newer LineageOS builds of 15.1 (since 31 March, 2019) and 16.0 (since 13 May, 2019) versions may spot additional "HD Audio: SBC" checkbox in Bluetooth audio device settings which toggles Dual Channel mode with the bitrate much higher than stock: either 452 kbps or 551 kbps (depending on headphones or speakers Enhanced Data Rate speed capabilities), compared to usual 328 kbps Joint Stereo mode.

The feature is available on all LineageOS-supported devices, and could be used with overwhelming majority of existing playback devices. It works best with cheaper audio devices without additional codec support, such as aptX/HD, AAC or LDAC.

## SBC Codec

SBC has lots of different parameters that are negotiated during the connection setup phase:

* **Audio channel type and number**: Joint Stereo, Stereo, Dual Channel, Mono
* **Number of frequency bands**: 4 or 8
* **Number of audio blocks in one packet**: 4, 8, 12, 16
* **Quantization bit allocation algorithm**: Loudness, SNR
* **Maximum and minimum bit pool used in quantization process**: usually 2-53

The decoder is required to support any combination of these parameters. Encoder may implement only a part of them.

Existing Bluetooth stacks usually negotiate the following set of options (a profile): Joint Stereo, 8 bands, 16 blocks, Loudness, bitpool 2..53. This profile encodes 44.1 kHz stereo audio with 328 kbps bitrate.

Bitpool is a parameter that has direct influence on bitrate: the higher it is, the higher the bitrate, and hence the quality. But exact bitpool value corresponds to exact bitrate only within a single profile.

The bitrate is also significantly affected by other parameters: audio channel type, number of frequency bands, number of audio blocks. You can increase the bitrate indirectly by negotiating non-standard profiles, without changing the bitpool. Higher bitrate does not lead to better audio quality in all cases, it's more complicated: changing, for example, number of blocks in a single audio frame from 16 to 4 on Joint Stereo with 53 bitpool will increase bitrate from 328 kbps to 441 kbps, but will considerably decrease algorithmic delay, which worsen adaptive quantization process.

![SBC bitrate formula]({{site.baseurl}}/images/engineering/content_bluetooth_sbc_xq_0.png){: .blog_post_image_content }

Fixed bitpool and bitrate values originated from recommended profile for high quality audio. But the recommendation should not be the reason to set the limit on these parameters.

![SBC profiles]({{site.baseurl}}/images/engineering/content_bluetooth_sbc_xq_2.png){: .blog_post_image_content }

A2DP specification v1.2, which was active from 2007 to 2015, requires all decoders to work correctly with bitrates up to 512 kbps:

>The decoder of the SNK shall support all possible bitpool values that do not result in excess of the maximum bit rate. This profile limits the available maximum bit rate to 320kb/s for mono, and 512kb/s for two-channel modes.

No bitrate limit stated in the new version of the specification. It is assumed that modern headphones with EDR support released after 2015 can support bitrates up to 1000 kbps.

## Dual Channel mode

Dual Channel mode encodes channels separately, using individual bitpool for each channel, unlike Stereo or Joint Stereo, which use bitpool for both channels. Forcing the device to use Dual Channel instead of Joint Stereo will get us almost doubled bitrate of 617 kbps with noticeable audio quality enhancement, with the same bitpool value of 53.
To me it feels that bitpool should be an internal variable. I assume that it is an A2DP specification design fault that bitpool value is not bound to other codec parameters and only defined as an independent negotiated variable.

## Where did 551 and 452 kbps come from?

Bluetooth time division technology is designed to efficiently transmit large fixed-size packets. Data transfer occurs in slots, the largest number of slots sent in one transmission is 5. There are also transfer modes using 1 or 3 slots, but not 2 or 4. You can transfer up to 679 bytes in 5 slots, at a connection speed of 2 Mbps, and up to 1021 bytes at a speed of 3 Mbps. In 3 slots maximum amount of data is 367 and 552 bytes, respectively.

![Bluetooth transmission. Full 5 slot transmission takes 3.75 ms. Each slot takes 0.625 ms.]({{site.baseurl}}/images/engineering/content_bluetooth_sbc_xq_3.png){: .blog_post_image_content }

If we want to transfer less data than 679 or 1021 bytes but more than 367 or 552 bytes, the transfer will still take 5 slots, and the transmission will take the same amount of time, which reduces the transmission efficiency.

![Bluetooth transmission. 550 bytes of data still require full 5 slot transmission and 3.75 ms.]({{site.baseurl}}/images/engineering/content_bluetooth_sbc_xq_4.png){: .blog_post_image_content }

44100 Hz audio encoded using SBC in Dual Channel mode with bitpool = 38, 16 blocks in a frame, 8 frequency bands, produces audio frame of 164 bytes, with 452 kb/s bitrate.

Audio payload should be encapsulated into L2CAP and AVDTP transmission protocols, which deduct 16 bytes of overhead from the audio payload.

![Frame length formula]({{site.baseurl}}/images/engineering/content_bluetooth_sbc_xq_1.png){: .blog_post_image_content }

One 5-slot audio transmission can contain up to 4 audio frames:

`679 (EDR 2 mbit/s DH5) - 4 (L2CAP) - 12 (AVDTP/RTP) - 1 (SBC header) - (164*4) = 6`

A single packet transmits up to 11.7 ms of audio data, which will be transmitted in 3.75 ms, and we have 6 unused bytes left in the packet.
If you slightly raise the bitpool, 4 audio frames can no longer be packed into a single transmission. You'll have to send 3 frames at a time, which reduces transmission efficiency, reduces the amount of audio transmitted in one packet, and will increase chance for audio stutter under poor radio conditions.

551 kbps bitrate for EDR 3 Mbps was selected using the same principle: with Bitpool 47, 16 blocks per frame, 8 frequency bands, the frame size is 200 bytes, with a bit rate of 551 kbps. Single transmission can bundle up to 5 frames or 14.6 ms of music.

The algorithm for calculating all the SBC parameters is quite complicated, you can easily make a mistake if you try to calculate all of them manually, so I made an [interactive calculator](https://btcodecs.valdikss.org.ru/sbc-bitrate-calculator) to help those who interested.


## What is that all for?

Serge Smirnoff from SoundExpert website performed [Bluetooth SBC XQ profile test](http://soundexpert.org/articles/-/blogs/audio-quality-of-sbc-xq-bluetooth-audio-codec). His test shows that SBC XQ 452 kbps audio has less artifacts than aptX, and 551 kbps is comparable to aptX HD.

Want to hear the difference yourself? I made a [web service that encodes audio to SBC](https://btcodecs.valdikss.org.ru/sbc-encoder/) (as well as to aptX and aptX HD) in real time, right in the browser. You can compare the sound of different SBC profiles and other codecs without actually transmitting audio via Bluetooth using this service, on any wired headphones, speakers, and on your favorite music. You can also change the encoding parameters directly during audio playback.

## Conclusion

Users of LineageOS firmware now can enhance Bluetooth audio quality with the matter of ticking the checkbox in Bluetooth device settings. This neat feature may change peoples' biased opinion of SBC as of low-quality 'fallback' codec, and aptX support now may not be the key question in new headphones selection process.
