#!/bin/bash
SITE_NAME=$1
PORT_NO=$2
DB_PASS=$3
SERVER_PATH=$4
GIT_REPO=$5

cd /home/leckr
mkdir $SITE_NAME
cd $SITE_NAME
git clone git@github.com:$GIT_REPO
cd $SERVER_PATH

# insert env
ENV_FILE="SENDGRID_API_KEY=
STRIPE_SECRET=
STAGING_DB_DB=
STAGING_DB_USER=
STAGING_DB_PASSWORD=
STAGING_DB_HOST=
DB_DB=${SITE_NAME}db
DB_USER=${SITE_NAME}user
DB_PASSWORD=${DB_PASS}
DB_HOST=${DB_HOST}
RUN_STAGING=false
APP_NAME=${SITE_NAME}
EMAIL_FROM=
DOMAIN=
CLOUDFRONT_DOMAIN=
PORT=${PORT_NO}"

echo "$ENV_FILE" > "./.env"

yarn initialDeploy