#!/usr/bin/env bash
export HOME="$(realpath ~)"
export MOZ_HOME="$HOME/src/mozilla-central"
export NETMONITOR_HOME="$MOZ_HOME/devtools/client/netmonitor"
export CONNECTOR_HOME="$NETMONITOR_HOME/src/connector"
echo "=====setup======"
echo "HOME = "$HOME
echo "MOZ_HOME = "$MOZ_HOME
echo "NETMONITOR_HOME = "$NETMONITOR_HOME
echo "CONNECTOR_HOME = "$CONNECTOR_HOME
echo "===== changing folder to CONNECTOR_HOME ====="
cd $CONNECTOR_HOME