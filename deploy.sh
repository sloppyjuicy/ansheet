npm run build
cp -rf dist/* /f/ludomatics/proyectos/ludomatics.github.io/
cd /f/ludomatics/proyectos/ludomatics.github.io/
git add -A
git commit -m "ansheet deployment commit"
git push -u origin master
cd -
