#!/bin/bash
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

cd $parent_path/..
bun run build
bun run start
cd $parent_path