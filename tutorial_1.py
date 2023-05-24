from flask import Flask, redirect, url_for, render_template, jsonify
import sqlite3
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, text

#create instance
app= Flask(__name__)

#Database setup
app.config['SQLALCHEMY_DATABASE_URI']= ("sqlite:///./test_database.sqlite3")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

#Init db
db= SQLAlchemy(app)


@app.route("/")
def home():
    return render_template("index.html")

#World data visualization view
@app.route("/world")
def world_summary():
    return render_template("index-1.html")

#World global representation view- geojsonresults
@app.route("/global")
def global_view():
    return render_template("index-2.html")

#Display the cleaned data used for visualization from sql
@app.route("/datasource")
def get_data_source():
   sql= '''SELECT * FROM test_database.clean_df;'''
   query=app.config.execute(text(sql))
   clean_data=query.fetchall()
   return (jsonify(clean_data.data))

#running the app
if __name__=="__main__":
    app.run()
