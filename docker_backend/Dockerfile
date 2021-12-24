FROM python:3.8
WORKDIR ./backend

ADD . .

RUN pip install -r requirements.txt

EXPOSE 11452
CMD ["python","./backend/structure/create_database.py"] 
# 更改下面一行来使用gunicorn获取更好性能

CMD ["python","./backend/app.py"]
