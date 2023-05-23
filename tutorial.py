from flask import Flask, redirect, url_for, render_template

#create instance
app= Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

#World data visualization view
@app.route("/world")
def world_summary():
    return render_template("index-1.html")

#Welcoming the user by input name
@app.route("/<name>")
def user(name):
    return f"Hello {name}!"

#Redirecting user to a desired page
@app.route("/admin/")
def admin():
    return redirect(url_for("home"))

#running the app
if __name__=="__main__":
    app.run()