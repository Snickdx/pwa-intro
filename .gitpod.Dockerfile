FROM gitpod/workspace-full

# Install custom tools, runtimes, etc.
# For example "bastet", a command-line tetris clone:
RUN npm install -g firebase-tools workbox-cli serve
#
# More information: https://www.gitpod.io/docs/config-docker/
