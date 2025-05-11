# syntax = docker/dockerfile:1

# Use a minimal Ruby image
ARG RUBY_VERSION=3.3.0
FROM registry.docker.com/library/ruby:$RUBY_VERSION-slim AS base

# Set working directory inside the container
WORKDIR /backend

# Install required system dependencies
# RUN apt-get update -qq && \
#     apt-get install --no-install-recommends -y \
#     curl postgresql-client libpq-dev libvips build-essential git pkg-config && \
#     rm -rf /var/lib/apt/lists /var/cache/apt/archives
RUN apt-get update -qq && \
    DEBIAN_FRONTEND=noninteractive apt-get install --no-install-recommends -y \
    apt-utils curl postgresql-client libpq-dev libvips build-essential git pkg-config && \
    apt-get clean && rm -rf /var/lib/apt/lists/*



# Install bundler and Rails
RUN gem install bundler -v 2.4.9  # Adjust version if needed
RUN gem install rails

# Copy Gemfile and install dependencies
COPY Gemfile Gemfile.lock ./
# RUN bundle install --jobs 4 --retry 3 && \
#     rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache
RUN bundle install --jobs 4 --retry 3 && \
    rm -rf ~/.bundle/ /usr/local/bundle/ruby/*/cache



# Copy application code
COPY . .

# Ensure database setup before running the app
RUN chmod +x bin/docker-entrypoint

# Entrypoint script to set up the database
ENTRYPOINT ["bin/docker-entrypoint"]

# Expose application port and start the Rails server
# EXPOSE 3000
EXPOSE 3000 8080

CMD ["rails", "server", "-b", "0.0.0.0"]
# CMD ["rails", "server", "-b", "0.0.0.0", "-p", "${PORT}"]












# # syntax = docker/dockerfile:1


# # Use a minimal Ruby image
# ARG RUBY_VERSION=3.3.0
# FROM registry.docker.com/library/ruby:$RUBY_VERSION-slim AS base

# # Set working directory inside the container
# WORKDIR /rails

# # Install required system dependencies
# # RUN apt-get update -qq && \
# #     apt-get install --no-install-recommends -y curl postgresql-client libvips build-essential git pkg-config && \
# #     rm -rf /var/lib/apt/lists /var/cache/apt/archives

# RUN apt-get update -qq && \
#     apt-get install --no-install-recommends -y \
#     curl postgresql-client libpq-dev libvips build-essential git pkg-config && \
#     rm -rf /var/lib/apt/lists /var/cache/apt/archives


# # Set environment variables for production
# ENV RAILS_ENV="development" \
#     BUNDLE_DEPLOYMENT="1" \
#     BUNDLE_PATH="/usr/local/bundle" \
#     BUNDLE_WITHOUT="development"

# # Install bundler and Rails
# RUN gem install bundler
# RUN gem install rails

# # Copy Gemfile and install dependencies
# COPY Gemfile Gemfile.lock ./
# RUN bundle install --jobs 4 --retry 3 && \
#     rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache

# # Copy application code
# COPY . .

# # Make entrypoint script executable
# RUN chmod +x bin/docker-entrypoint

# # Entrypoint script to set up the database
# ENTRYPOINT ["bin/docker-entrypoint"]

# # Expose application port and run the Rails server
# EXPOSE 3000
# CMD ["./bin/rails", "server"]
