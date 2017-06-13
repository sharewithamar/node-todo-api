const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err)
        return console.log("Unable to connect to MongoDB server");
    console.log("connected to MongoDB server");

/*    db.collection('Todos').findOneAndUpdate({_id: new ObjectID("593b88b7335235671f223d78")},{
        $set:{
            completed:true
        }
    },{returnOriginal:false}).then(result=>console.log(result));*/

    db.collection('Users').findOneAndUpdate({_id: new ObjectID("593b8b24335235671f223e29")},{
        $set:{
            name:"Raji",

        },
        $inc:{
            age:1
        }
    },{returnOriginal:false}).then(result=>console.log(result));


    //db.close()
});