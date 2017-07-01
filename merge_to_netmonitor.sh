export HOME="$(realpath ~)"
export MOZ_HOME="$HOME/src/mozilla-central"
export NETMONITOR_HOME="$MOZ_HOME/devtools/client/netmonitor"
export CONNECTOR_HOME="$NETMONITOR_HOME/src/connector"
cp -a * .git $CONNECTOR_HOME
gnome-terminal --working-directory="$NETMONITOR_HOME" -e "git apply $CONNECTOR_HOME/0001-merge-index.js.patch"