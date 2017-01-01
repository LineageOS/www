# Run in Docker

## Requirement
To run this site in Docker, you must have :

* [Docker Engine](https://www.docker.com/products/docker-engine)
* [docker-compose](https://docs.docker.com/compose/)

## Howto

1. Run this command `docker-compose up` in the current directory
2. Open your brower to http://localhost:4000/
3. Update files in your IDE and reload page

> Type `ctrl+c` to exit when done

## Use it without *docker-compose*

To run container without *docker-compose* (*docker engine* still needed), use this command :
```
$ docker run --rm -it -p 4000:4000 -v $(pwd):/srv/jekyll jekyll/jekyll
```

