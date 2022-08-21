import MeetupDetail from "../../components/meetups/MeetupDetail"
import { MongoClient, ObjectId } from 'mongodb'

const MeetupPage = (props) => {
    return (
        <MeetupDetail
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />
    )
}

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://HAMZANAWAB31:OKw60Ceu8PixDsDU@cluster0.eutta.mongodb.net/?retryWrites=true&w=majority');
    const db = client.db();

    const meetupCollection = db.collection('meetups');
    const meetupId = await meetupCollection.find({}, { _id: 1 }).toArray();

    return ({
        fallback: 'blocking',
        paths: meetupId.map(val => ({
            params: {
                meetupId: val._id.toString()
            }
        }))
    })
}

export async function getStaticProps(context) {
    const client = await MongoClient.connect('mongodb+srv://HAMZANAWAB31:OKw60Ceu8PixDsDU@cluster0.eutta.mongodb.net/?retryWrites=true&w=majority');
    const db = client.db();

    const meetupCollection = db.collection('meetups');
    const meetupDetail = await meetupCollection.findOne({ _id: ObjectId(context.params.meetupId) });
    client.close();

    return ({
        props: {
            meetupData: {
                id: meetupDetail._id.toString(),
                image: meetupDetail.image,
                title: meetupDetail.title,
                address: meetupDetail.address,
                description: meetupDetail.description
            }
        }
    })
}

export default MeetupPage
