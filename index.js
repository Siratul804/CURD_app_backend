const express = require("express");
const app = express();
const mongoose = require("mongoose");
const FriendModel = require("./models/Friends");
const Cors = require("cors");

app.use(Cors());
app.use(express.json());

const conncetion_url = "mongodb://127.0.0.1:27017/friends";
mongoose.connect(conncetion_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.post("/addFriend", async (req, res) => {

  const name = req.body.name;
  const age = req.body.age;

  const friend = new FriendModel({
    name: name,
    age: age
  });
  await friend.save();
  res.send("Success");
});

app.get("/read", async (req, res) => {
    FriendModel.find({}, (err, result) => {
        if(err) {
            res.send(err)
        } else {
            res.send(result)
        }
    });
    await friend.save();
  });

  app.put("/update", async (req, res) => {
    const newAge = req.body.newAge;
    const id = req.body.id;
    console.log(newAge, id);
    try{
      await FriendModel.findById(id, (error, friendToUpdate) => {
        friendToUpdate.age = Number(newAge);
        friendToUpdate.save();
      } );
    } catch(err) {
      console.log(err)
    }
    res.send("updated");
  } );

  app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await FriendModel.findByIdAndRemove(id).exec();
    res.send("itemdeleted")
  } )

app.listen(3001, () => {
  console.log("You are connected!!!!");
});
