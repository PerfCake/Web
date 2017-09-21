#!/bin/bash

if [ -z "${VERSION}" ]; then
  echo "Specify VERSION variable."
  exit 1
fi

wget https://github.com/PerfCake/Docs/releases/download/v${VERSION}/perfcake-docs-html.zip && unzip -o -d docs perfcake-docs-html.zip && rm perfcake-docs-html.zip

wget https://github.com/PerfCake/PerfCake/archive/devel.zip
if [[ -f devel.zip ]];
then
        unzip -o devel.zip -d xsd.install
        cp xsd.install/PerfCake-devel/perfcake/src/main/resources/schemas/* schema/
        rm -rf xsd.install
        rm devel.zip
fi

cp _config/site.yml _config/site.yml.orig
sed -i "s/^version:.*$/version: ${VERSION}/" _config/site.yml
awestruct -P production
mv _config/site.yml.orig _config/site.yml

rm -rf docs
rm -rf schema/*.xsd
rm -rf _site/*.sh
