# Installation Guide

## Node

1. Go to [Node.js download page](https://nodejs.org/en/download/) and download the LTS version.
2. Follow the installation instructions for your OS.

## Python

1. Go to [Python download page](https://www.python.org/downloads/) and download the latest version.
2. Follow the installation instructions for your OS.
3. Install pip by running `python -m ensurepip` in your terminal.

## Virtual Environment

1. Install virtualenv by running `pip install virtualenv` in your terminal.
2. Create a new virtual environment by running `virtualenv envname` (replace "envname" with your desired name).
3. Activate the virtual environment by running `source envname/bin/activate` on Unix/MacOS or `envname\Scripts\activate` on Windows.

## Install Packages

1. Install required packages by running `pip install -r requirements.txt` in your terminal.

2. `npm i` to install node packages

## Run web UI

1. Run the start script by running `npm start` in your terminal.

2. go to `localhost:3000` in a browser  this shows a form 

3. fill info and click on predict this will call express server api which will send prediction as JSON response which will be displayed in UI



