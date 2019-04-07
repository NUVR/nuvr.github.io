#!/bin/bash

if [ ! git config --list | grep -q user.name ]; then
    git config user.name "CircleCI"
fi