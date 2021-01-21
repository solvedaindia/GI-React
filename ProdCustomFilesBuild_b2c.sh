#!/bin/sh
ls -l ./app/index.html
rm -f ./app/index.html
cp -r ./app/index.prod.html ./app/index.html
ls -l ./app/index.html
