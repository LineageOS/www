FROM ruby:3.2

COPY . /src

WORKDIR /src

RUN gem install bundler
RUN bundle install
RUN bundle exec jekyll build

CMD bundle exec jekyll serve --host 0.0.0.0 --incremental
