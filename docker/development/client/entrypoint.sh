#!/bin/sh

#GIT_TAG= $(git describe --tags --abbrev=0)
#GIT_LAST_COMMIT= $(git log -1 --format='%at' | xargs -I{} date -d @{} +%Y/%m/%d\ %H:%M:%S)


if [ ! -f /etc/node-first-run ]; then
  touch /etc/node-first-run

  echo "Installing node dependencies..."
  pnpm i
fi

exec "$@"
