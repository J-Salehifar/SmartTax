@echo off
echo Starting SmartTax Full Stack...

start cmd /k "cd /d E:\Projects\SmartTax\Backend && call venv\Scripts\activate && python manage.py runserver"
start cmd /k "cd /d E:\Projects\SmartTax\Frontend && npm start"
