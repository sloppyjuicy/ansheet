#!/bin/sh
# Setup variables
localRepoPath="/f/dev/ludomatics.github.io/"
commitMessage=${*:-"ansheet deployment"}

npm run lint --fix
npm run build
cp -rf dist/* README.* .gitattributes ${localRepoPath}
cd ${localRepoPath}
git add -A
git commit -m "${commitMessage}"
git push -u origin master
cd -
