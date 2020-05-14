npm run build
cp -rf dist/* /data/rhofp.github.io/
cd /data/rhofp.github.io/
git add -A
git commit -m "ansheet deployment commit"
git push -u origin master
cd -
