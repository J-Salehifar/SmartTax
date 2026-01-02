@echo off
echo ===============================
echo Starting Django Backend Server
echo ===============================

cd /d E:\Projects\SmartTax\Backend

call venv\Scripts\activate

python manage.py runserver 127.0.0.1:8000
