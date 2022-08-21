// /api/new-meetup
import { MongoClient } from 'mongodb'

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://HAMZANAWAB31:OKw60Ceu8PixDsDU@cluster0.eutta.mongodb.net/?retryWrites=true&w=majority');
        const db = client.db();

        const meetupCollection = db.collection('meetups');
        const result = await meetupCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({ message: 'Meetup Inserted!' })

    }
}

export default handler;