## MAD Platform

To build for MAD Platform:

```
yarn build
docker build -t itetechmadacr.azurecr.io/ekstern_utlegg:`git rev-parse HEAD` .
docker push itetechmadacr.azurecr.io/ekstern_utlegg:`git rev-parse HEAD`
```

If you need to login to the repo:

```
az acr login -n itetechmadacr
```

To update the server - once pushed to the azure docker repo:

```
cd chart

helm upgrade ekstern-utlegg \
--set image.sha=`git rev-parse HEAD` \
--set image.version=`git rev-parse HEAD` \
--namespace ekstern-utlegg \
./ekstern-utlegg
```
