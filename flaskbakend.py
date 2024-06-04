from flask import Flask, request, render_template
import mysql.connector

# Initialize the Flask application
app = Flask(__name__)

#def create a database
def create_database():
    try:
        mydb = mysql.connector.connect(
             host="localhost",
            user="root",
            password="coco14576SNN",
        )
    except mysql.connector.Error as err:
        print(f"this error happened{err}".capitalize())
        return None


# Establish connection to the database
def connect_todatabase(database=None):
    try:
        mydatabase = mysql.connector.connect(
            host="localhost",
            user="root",
            password="coco14576SNN",
            database="clients"
        )
        print(f"Connection to {'database ' + database if database else 'MySQL server'} successful")
        return mydatabase
    except mysql.connector.Error as err:
        print(f"Something went wrong: {err}")
        return None

# Create a table in the database
def create_table():
    mydatabase = connect_todatabase()
    if mydatabase:
        cursor = mydatabase.cursor()
        create_schema_query = """
            CREATE SCHEMA IF NOT EXISTS `clients` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
        """
        create_table_query = """
            CREATE TABLE IF NOT EXISTS `clients`.`userinfo` (
                `userid` INT NOT NULL AUTO_INCREMENT,
                `fname` VARCHAR(20) NOT NULL,
                `lname` VARCHAR(20) NOT NULL,
                `telephone` VARCHAR(15) NOT NULL,
                `email` VARCHAR(1000) NOT NULL,
                `address1` VARCHAR(255),
                `address2` VARCHAR(255),
                `package1` VARCHAR(255),
                `package2` VARCHAR(255),
                `message`  VARCHAR(2000),
                PRIMARY KEY (`userid`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        """
        try:
            cursor.execute(create_schema_query)
            cursor.execute(create_table_query)
            print("Table 'userinfo' created successfully")
        except mysql.connector.Error as err:
            print(f"Failed to create table: {err}")
        finally:
            cursor.close()
            mydatabase.close()

# Populate the database
def populate(firstname, lastname, telephone, email, address1, address2, package1, package2, message):
    mydatabase = connect_todatabase("clients")
    if mydatabase:
        cursor = mydatabase.cursor()
        try:
            sqlformula = """
                INSERT INTO userinfo (fname, lname, telephone, email, address1, address2,package1,package2,message) 
                VALUES (%s, %s, %s, %s, %s, %s,%s,%s,%s)
            """
            val = (firstname, lastname, telephone, email, address1, address2,package1,package2,message)
            cursor.execute(sqlformula, val)
            mydatabase.commit()
            print("Data inserted successfully")
        except mysql.connector.Error as err:
            print(f"Failed to insert data: {err}")
        finally:
            cursor.close()
            mydatabase.close()

# Define a route to handle the form submission
@app.route("/", methods=["GET", "POST"])
def getdata():
    if request.method == "POST":
        firstname = request.form.get("userfname")
        lastname = request.form.get("userlname")
        telephone = request.form.get("userphone")
        email = request.form.get("email")
        address1 = request.form.get("address1")
        address2 = request.form.get("address2")
        country = request.form.get("country")
        package1 = request.form.get("webdevelopment")
        package2 = request.form.get("french")
        message = request.form.get("additionalinfo")
        populate(firstname, lastname, telephone, email, address1, address2, package1, package2, message)
        return render_template("index.html")
    return render_template("index.html")

# Check if the executed file is the main program and run the app
if __name__ == "__main__":
    create_table()
    app.run(debug=True)
