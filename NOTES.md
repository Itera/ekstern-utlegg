## MAD VM

CircleCI will build any push to master and push it to docker.mad.itera.no/itera/ekstern_utlegg

To update the server - run the containers playbook in the madness_ansible repo (if you don't have access - then ask someone who does to run it for you).

## Azure

To build for MAD Azure:

```
yarn build
docker build -t itetechmadacr.azurecr.io/ekstern_utlegg:latest .
docker push itetechmadacr.azurecr.io/ekstern_utlegg:latest
```

If you need to login to the repo:

```
az acr login -n itetechmadacr
```


To update the server - once pushed to the azure docker repo:

```
cd chart
helm upgrade ekstern-utlegg --set image.sha=`git rev-parse --short HEAD` --namespace ekstern-utlegg ./ekstern-utlegg
```

We send in the git tag to make sure that there is a change to the actual deployment file being generated (since we're using :latest as the image tag). It isn't used in the image - but it does change the deployment descriptor.