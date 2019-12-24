# Super Dividendos

[![Build Status](https://travis-ci.com/m4theushw/superdividendos.svg?branch=master)](https://travis-ci.com/m4theushw/superdividendos) 
[![codecov](https://codecov.io/gh/m4theushw/superdividendos/branch/master/graph/badge.svg)](https://codecov.io/gh/m4theushw/superdividendos)

A personal project I created to calculate the yields of a portfolio composed by stocks listed in B3 (Brazilian Stock Exchange). It works by scraping data from B3's website and plotting it on a chart. The website was built with React, Python, Django and Material-UI.

## Installation

#### Requirements

This project requires [Python 3](http://python.org/), [Node 12](https://nodejs.org/), [MariaDB](https://mariadb.org/) 10 and [Yarn](https://yarnpkg.com/lang/en/). Once you have `pip` and `yarn` available install the dependencies:

```shell
$ pip install -r requirements.txt
$ yarn install
```

#### Setup environment variables

Copy the file `.env.example` to `.env` and update it with your database credentials.

#### Running the backend

Start the django app:

```shell
$ python manage.py runserver
```

#### Running the frontend

In a new terminal window:

```shell
$ yarn start
```

Once you are ready open [http://localhost:1234](http://localhost:1234) in your browser.
