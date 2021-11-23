from pymongo import MongoClient

client = MongoClient("mongodb+srv://CorentinJacob:cituha@cit-cluster.5oxtl.mongodb.net/myFirstDatabase?retryWrites"
                     "=true&w=majority")
db=client.admin
# Issue the serverStatus command and print the results
serverStatusResult=db.command("serverStatus")
serverStatusResult