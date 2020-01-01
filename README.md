<p align="center">
  <a href="https://superdividendos.com.br" rel="noopener" target="_blank"><img width="350" alt="Super Dividendos' logo" src="https://raw.githubusercontent.com/m4theushw/superdividendos/master/assets/logo.png">
  </a>
</p>

<div align="center">

[![Build Status](https://travis-ci.com/m4theushw/superdividendos.svg?branch=master)](https://travis-ci.com/m4theushw/superdividendos) 
[![codecov](https://codecov.io/gh/m4theushw/superdividendos/branch/master/graph/badge.svg)](https://codecov.io/gh/m4theushw/superdividendos)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

</div>

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
