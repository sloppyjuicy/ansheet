npm run build
cp -rf dist/* /data/ludomatics.github.io/
cd /data/ludomatics.github.io/
git add -A
git commit -m "ansheet deployment commit"
git push -u origin master
cd -
