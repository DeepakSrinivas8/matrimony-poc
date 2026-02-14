git config user.email "DeepakSrinivas8@users.noreply.github.com"
git config user.name "DeepakSrinivas8"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote remove origin
git remote add origin https://github.com/DeepakSrinivas8/matrimony-poc.git
git push -u origin main
if ($LASTEXITCODE -ne 0) { echo "Push failed"; exit $LASTEXITCODE }
