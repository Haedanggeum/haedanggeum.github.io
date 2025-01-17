#!/bin/bash
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

cd $parent_path/..
bun run start --port 3010
cd $parent_path