#!/usr/bin/env bash
export HOME="$(realpath ~)"
export MOZ_HOME="$HOME/src/mozilla-central"
export NETMONITOR_HOME="$MOZ_HOME/devtools/client/netmonitor"
gnome-terminal --working-directory="$MOZ_HOME"
gnome-terminal -e "google-chrome --remote-debugging-port=9222 -v"
gnome-terminal --working-directory="$MOZ_HOME" -e "./mach run http://localhost:8000 --start-debugger-server 6080"
gnome-terminal --working-directory="$NETMONITOR_HOME" -e "yarn start"
