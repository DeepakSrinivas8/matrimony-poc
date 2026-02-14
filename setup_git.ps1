git init
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
git add .
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
git commit -m "Initial commit"
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
git branch -M main
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
git remote add origin https://github.com/DeepakSrinivas8/matrimony-poc.git
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
git push -u origin main
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
