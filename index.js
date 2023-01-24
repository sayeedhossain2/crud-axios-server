const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.CRUD_USER}:${process.env.CRUD_PASS}@cluster0.khpqtwr.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const employerInfoCollection = client
      .db("allEmployer")
      .collection("employerInfo");

    // // Employer delete
    // app.delete("/sayeed/:id", async (req, res) => {
    //   const id = req.params.id;
    //   console.log(id);
    //   const query = { _id: ObjectId(id) };
    //   const result = await employerInfoCollection.deleteOne(query);
    //   res.send(result);
    // });

    app.delete("/sayeed/:id", async (req, res) => {
      const saif = req.params.id;
      const query = { _id: ObjectId(saif) };
      const result = await employerInfoCollection.deleteOne(query);
      res.send(result);
    });

    //   employer info post
    app.post("/employerInfo", async (req, res) => {
      const info = req.body;
      const result = await employerInfoCollection.insertOne(info);
      res.send(result);
    });

    //   employer info get
    app.get("/employerInfo", async (req, res) => {
      const query = {};
      const allInfo = await employerInfoCollection.find(query).toArray();
      res.send(allInfo);
    });

    // Update method
    app.put("/employUpdate/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const dataInfo = req.body;
      const option = { upsert: true };
      const updatedInfo = {
        $set: {
          firstname: dataInfo.firstname,
          lastname: dataInfo.lastname,
          email: dataInfo.email,
          phonenumber: dataInfo.phonenumber,
        },
      };
      const result = await employerInfoCollection.updateOne(
        filter,
        updatedInfo,
        option
      );
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.log);

app.get("/", async (req, res) => {
  res.send("Crud server is running ");
});

app.listen(port, () => console.log(`Crud server running on ${port}`));
