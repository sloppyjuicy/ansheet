npm run build
cp -rf dist/* /f/dev/ludomatics.github.io/
cd /f/dev/proyectos/ludomatics.github.io/
git add -A
git commit -m "ansheet deployment commit"
git push -u origin master
cd -
