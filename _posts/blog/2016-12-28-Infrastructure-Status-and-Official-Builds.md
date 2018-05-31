---
layout: post
title: Infrastructure Status & Official Builds
category: blog
excerpt: Build slaves, mirrors, and builds
author: zifnab
---

We're working on getting everything operational and would like to thank everyone who's reached out offering assistance. 

If you haven't heard back from us, you should in the next week or so. 

Current needs: 

* Build Slaves
  * Must be able to finish (and upload) `make clean && make dist` within an hour, and be capable of running docker. 
* Build Mirrors
  * Minimum 1gbit network connectivity.
  * Minimum 500GB storage space. 
  * As a note, we'd prefer non-capped connections with static IPs, and they must be in some sort of professional hosting company (ie, datacenter, colocation facility, ISP, university, etc). While we appreciate the offers from people with gigabit at home, it's slightly too hard to manage.  

Please contact [infra@lineageos.org](mailto:infra@lineageos.org) if you are willing to provide either build slaves or build mirrors. 

As a reminder: we have not started doing official builds yet. One of the benefits of this being an open source project is that anyone can build it, but please be careful flashing builds you've downloaded from other sources. We will have some more information on when weeklies (or possibly nightlies) will be starting soon. 

Thanks!

LineageOS Team
