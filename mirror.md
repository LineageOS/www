---
layout: page
title: Mirroring
permalink: /mirroring/
---

## Mirroring Information

### Requirements 

* At least 100mbit bandwidth available, preferably 1gbit. 
* 500gb of storage
* Must be hosted at a professional hosting facility (datacenter, colocation facility, ISP, fibre hotel, university, etc). 

### Techincal Information

All mirrors must be able to serve files over https, and either rsync or ftp.  

Example rsyncd configuration: 

    [mirror]
    path = /data/mirror
    hosts allow = *
    list = true
    uid = root
    gid = root
    read only = true

Example nginx configuration: 

    server {
        listen [::]:80;
        listen 80;
        server_name mirror.example.org;
        location / {
            rewrite     ^   https://$server_name$request_uri? permanent;
        }
    }

    server {
        listen [::]:443 ssl;
        listen 443 ssl;
        server_name mirror.example.org;
    
        ssl_certificate /etc/letsencrypt/live/mirror.example.org/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/mirror.example.org/privkey.pem;
    
        root /data/mirror;
    }

Example mirroring crontab: 

    */15 * * * * * rsync -avh --delete rsync://mirror-sync.lineageos.org/mirror /path/to/your/mirror/folder

### Interested in helping?

Please send an email to [infra@lineageos.org](mailto:infra@lineageos.org) with the following details: 

* Main server's IP
* Admin contact information, including name and email (this remains private)
* Sponsor information, including name, a link, and a logo (this information will be made public). 
* Available bandwidth, for load balancing. 
* rsync & https endpoints

Alternatively, we are not opposed to managing this infrastructure ourselves. If that's the case, please email the above address. 
