import NewMeetupForm from '../../components/meetups/NewMeetupForm'

const NewMeetup = () => {
    async function addMeetupHandler(enteredMeetupData) {
        const res = await fetch(`/api/new-meetup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(enteredMeetupData)
        });
        const result = await res.json();
        console.log(result);
    }
    return (
        <NewMeetupForm onAddMeetup={addMeetupHandler} />
    )
}

export default NewMeetup
