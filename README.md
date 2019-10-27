[![CircleCI](https://circleci.com/gh/Itera/ekstern-utlegg/tree/master.svg?style=svg)](https://circleci.com/gh/Itera/ekstern-utlegg/tree/master)
[![codecov](https://codecov.io/gh/Itera/ekstern-utlegg/branch/master/graph/badge.svg)](https://codecov.io/gh/Itera/ekstern-utlegg)



# Itera External Expenses

A very simple react/redux app that allows external/students to provide a standard cover page for expenses.

It holds the data in a redux store local to the browser - and has no server component other than that required to serve the app. No user data is sent over the network. It uses localstorage to save the users having to reenter data.

Running instance: [https://utlegg.mad.itera.no/](https://utlegg.mad.itera.no/)

## Kubernetes

To deploy to kubernetes. We need to do two things initially:

First the namespace:

    kubectl apply -f k8s-namespace.yml

Now a secret:

    kubectl create secret docker-registry regcred --docker-server=docker.mad.itera.no --docker-username=<username> --docker-password=<password> -n ekstern-utlegg

Finally we can deploy the rest (this can be run for each update):

    kubectl apply -f k8s-deployment.yml
