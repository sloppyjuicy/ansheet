npm run build
cp -rf dist/* ~/Documents/rhofp.github.io/
cd ~/Documents/rhofp.github.io/
git add -A
git commit -m "ansheet deployment commit"
git push -u origin master
cd -
