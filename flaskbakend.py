from flask import Flask, request, render_template
import mysql.connector

# Initialize the Flask application
app = Flask(__name__)

# Establish connection to the database
def connect_todatabase():
    try:
        mydatabase = mysql.connector.connect(
            host="localhost",
            user="root",
            password="coco14576SNN",
            database="users"
        )
        print("Connection to 'users' database successful")
        return mydatabase
    except mysql.connector.Error as err:
        print("Something went wrong: {}".format(err))
        return None

# Create a table in the database
def create_table():
    mydatabase = connect_todatabase()
    if mydatabase:
        cursor = mydatabase.cursor()
        try:
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS usersinfo (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    firstname VARCHAR(255),
                    lastname VARCHAR(255)
                )
            """)
            print("Table 'usersinfo' created successfully")
        except mysql.connector.Error as err:
            print("Failed to create table: {}".format(err))
        finally:
            cursor.close()
            mydatabase.close()

# Populate the database
def populate(firstname, lastname):
    mydatabase = connect_todatabase()
    if mydatabase:
        cursor = mydatabase.cursor()
        try:
            sqlformula = "INSERT INTO usersinfo (firstname, lastname) VALUES (%s, %s)"
            val = (firstname, lastname)
            cursor.execute(sqlformula, val)
            mydatabase.commit()
            print("Data inserted successfully")
        except mysql.connector.Error as err:
            print("Failed to insert data: {}".format(err))
        finally:
            cursor.close()
            mydatabase.close()

# Define a route to handle the form submission
@app.route("/", methods=["GET", "POST"])
def getdata():
    if request.method == "POST":
        firstname = request.form.get("userfname")
        lastname = request.form.get("userlname")
        populate(firstname,lastname)
        return render_template("index.html")
    return render_template("index.html")

# Check if the executed file is the main program and run the app
if __name__ == "__main__":
    create_table()
    app.run(debug=True)