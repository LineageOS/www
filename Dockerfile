FROM ruby:3.0 as builder
COPY . /src
WORKDIR /src
RUN gem install bundler
RUN bundle install
RUN bundle exec jekyll build

FROM nginx:latest
COPY --from=builder /src/_site/ /usr/share/nginx/html/
