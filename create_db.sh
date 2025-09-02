#!/bin/bash

read -sp "Enter MySQL root password: " password

mysql -u root -p"$password" -e 'create database expanders360_platform'
mysql -u root -p"$password" expanders360_platform < schema.sql

echo 'Completed Successfully..'