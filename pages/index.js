import { MongoClient } from 'mongodb'
import MeetupList from '../components/meetups/MeetupList'

const HomePage = (props) => {
    return (
        <MeetupList meetups={props.meetups} />
    )
}

export default HomePage

export async function getStaticProps() {
    const client = await MongoClient.connect(process.env.MONGO);
    const db = client.db();

    const meetupCollection = db.collection('meetups');
    const meetups = await meetupCollection.find().toArray();

    client.close();

    return ({
        props: {
            meetups: meetups.map(val => ({
                id: val._id.toString(),
                title: val.title,
                image: val.image,
                address: val.address,
                description: val.description
            }))
        },
        revalidate: 1
    })
}