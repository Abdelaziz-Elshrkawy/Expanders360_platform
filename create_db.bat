@echo off
set /p password="Enter MySQL root password: "
mysql -u root -p%password% -e "create database if not exist expanders360_platform"
mysql -u root -p%password% expanders360_platform < schema.sql
echo Completed Successfully..
