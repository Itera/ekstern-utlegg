# Itera External Expenses

[![Build Status](https://travis-ci.org/Itera/ekstern-utlegg.svg?branch=master)](https://travis-ci.org/Itera/ekstern-utlegg)
[![CircleCI](https://circleci.com/gh/Itera/ekstern-utlegg.svg?style=shield)](https://circleci.com/gh/Itera/ekstern-utlegg)
[![codecov.io](https://codecov.io/github/Itera/ekstern-utlegg/coverage.svg?branch=master)](https://codecov.io/github/Itera/ekstern-utlegg?branch=master)

A very simple react/redux app that allows external/students to provide a standard cover page for expenses.

It holds the data in a redux store local to the browser - and has no server component other than that required
to serve the app via heroku. No user data is sent over the network. It will use localstorage to save the users having to
reenter data.

Running instance: [http://j.mp/itera-expenses](http://j.mp/itera-expenses)