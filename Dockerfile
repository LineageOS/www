FROM docker.io/ruby:3.0 as builder
COPY . /src
WORKDIR /src
RUN gem install bundler
RUN bundle install
RUN bundle exec jekyll build

FROM docker.io/nginx:latest
COPY --from=builder /src/_site/ /usr/share/nginx/html/
