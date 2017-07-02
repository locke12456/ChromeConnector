#!/usr/bin/env bash
export HOME="$(realpath ~)"
export MOZ_HOME="$HOME/src/mozilla-central"
export NETMONITOR_HOME="$MOZ_HOME/devtools/client/netmonitor"
export CONNECTOR_HOME="$NETMONITOR_HOME/src/connector"
export NOT_EMPTY=$(cat $HOME/.bashrc | grep "setup_env.sh" -m 1)
if [ "$NOT_EMPTY" == "" ]; then
    echo ". '$CONNECTOR_HOME/tests/setup_env.sh'" >> $HOME/.bashrc
fi
