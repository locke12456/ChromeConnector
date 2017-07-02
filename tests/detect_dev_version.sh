#!/usr/bin/env bash
export CURRENT=$(git log | grep "commit " -m 1)
export TARGET="commit b077c7da660b84ea189ac6e4e0e71a61404f5846"
if [ "$CURRENT" != "$TARGET" ]; then
    echo "Current version didn't match on chrome connector development ver."
    echo "Current ver:"
    echo $CURRENT
    echo "Target ver:"
    echo $TARGET
fi