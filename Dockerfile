FROM ruby:2.6 as builder
COPY . /src
WORKDIR /src
RUN gem install bundler -v 2.3.26
RUN bundle install
RUN bundle exec jekyll build

FROM nginx:latest
COPY --from=builder /src/_site/ /usr/share/nginx/html/
