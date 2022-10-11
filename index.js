const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const dbConnect = require('./utils/dbConnect');

require('dotenv').config()



const stripe = require("stripe")(process.env.STIPE_SECRET_KEY);


//mid deal ware 
app.use(cors());
app.use(express.json());



dbConnect();

async function run() {
    try {
        await client.connect();
        const servicesCollations = client.db("design_agency").collection("services");
        const ordersCollations = client.db("design_agency").collection("orders");
        const usersCollations = client.db("design_agency").collection("users");
        const paymentCollations = client.db("design_agency").collection("payment");
        const reviewCollations = client.db("design_agency").collection("review");

        // service get api 
        app.get('/service', async (req, res) => {
            const services = await servicesCollations.find().toArray();
            res.send(services)
        });


        //service get one item api 
        app.get('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const services = await servicesCollations.findOne(query);
            res.send(services)
        });

        app.post('/service', async (req, res) => {
            const service = req.body;
            const result = await servicesCollations.insertOne(service);
            res.send(result);
        })

        app.get('/review', async (req, res) => {
            const result = await reviewCollations.find().toArray();
            res.send(result)
        })


        app.post('/review', async (req, res) => {
            const feedback = req.body;
            const result = await reviewCollations.insertOne(feedback);
            res.send(result);
        })

        // post order api 
        app.post('/order', async (req, res) => {
            const order = req.body;
            const result = await ordersCollations.insertOne(order);
            res.send(result);

        })


        // get on your product 
        app.get('/order', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const cursor = ordersCollations.find(query)
            const order = await cursor.toArray();
            res.send(order);
        })


        // get all order data for admin 
        app.get('/orders', async (req, res) => {
            const orders = await ordersCollations.find().toArray()
            res.send(orders);
        })

        // admin change state with order place
        app.put('/order/:id', async (req, res) => {
            const id = req.params.id;
            const position = req.query;
            const updateDoc = {
                $set: position,
            }
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true }
            const result = await ordersCollations.updateOne(filter, updateDoc, options)

        })




        // get on item for pat bayer 
        app.get('/order/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await ordersCollations.findOne(query)
            res.send(result)

        })

        app.patch('/order/:id', async (req, res) => {
            const id = req.params.id;
            const payment = req.body;
            const filter = { _id: ObjectId(id) };
            const updateDoc = {
                $set: {
                    pay: true,
                    transactionId: payment.transactionId,
                },
            }
            const result = await paymentCollations.insertOne(payment);
            const updatingOrder = await ordersCollations.updateOne(filter, updateDoc);
            res.send(updatingOrder);
        });

        // add amin you project 
        app.post('/user', async (req, res) => {
            const user = req.body;
            const email = user.email;

            const query = { email: email };

            const find = await usersCollations.findOne(query);

            if (email === find?.email) {
                res.send({ message: "You are Already Admin" })
            } else {
                const updateDoc = {
                    email: email,
                    role: 'admin'
                };

                const result = await usersCollations.insertOne(updateDoc);
                res.send(result);
            }


        });


        app.get('/admin/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const result = await usersCollations.findOne(query);
            res.send(result);

        })


        app.post('/create_payment_intent', async (req, res) => {
            const service = req.body;
            const price = service.price;
            const amount = price * 100;

            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: "usd",
                payment_method_types: ['card']
            });

            res.send({
                clientSecret: paymentIntent.client_secret
            })
        })



    }
    finally {
        // await client.close()

    }
}


run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(PORT, () => {
    console.log(`listening Port ${PORT}`)
})