[![codecov](https://codecov.io/gh/Itera/ekstern-utlegg/branch/master/graph/badge.svg)](https://codecov.io/gh/Itera/ekstern-utlegg)

# Itera External Expenses

A very simple react/redux app that allows external/students to provide a standard cover page for expenses.

It holds the data in a redux store local to the browser - and has no server component other than that required to serve the app. No user data is sent over the network. It uses localstorage to save the users having to reenter data.

Running instance: [https://utlegg.mad.itera.no/](https://utlegg.mad.itera.no/)

## Kubernetes

To deploy to kubernetes - we need a namespace then we will use helm (v3) to deploy the actual application.

First the namespace:

    kubectl apply -f k8s-namespace.yml

Finally we can deploy the rest:

    cd chart

    helm install ekstern-utlegg \
    --set image.sha=`git rev-parse HEAD` \
    --set image.version=`git rev-parse HEAD` \
    --namespace ekstern-utlegg \
    ./ekstern-utlegg

Update:

    cd chart

    helm upgrade ekstern-utlegg \
    --set image.sha=`git rev-parse HEAD` \
    --set image.version=`git rev-parse HEAD` \
    --namespace ekstern-utlegg \
    ./ekstern-utlegg
