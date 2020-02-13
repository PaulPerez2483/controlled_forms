/*

curl some_url
curl some_url -X [PUT, DELETE, POST] -d 'some_json_string' -H "Content-Type:application/json"

*/

const API = 'https://acme-users-api-rev.herokuapp.com/api';

const fetch = async() => {
    const user = {id : 'b5b36d41-5467-4c1f-8075-f9ed1ed4a4ec'};

    // gets all the notes
    let notes =  (await axios.get(`${API}/users/${user.id}/notes`)).data;
    
    console.log(notes)

    if(notes.length === 5) {
        // deletes a note 
        await axios.delete(`${API}/users/${user.id}/notes/${notes[0].id}`);
    }

    //----------------- QUESTION -------  where is the user.id being created when a new gets post ? -----------------
    const note = (await axios.post(`${API}/users/${user.id}/notes/`, {text: `peo ${Math.random()}`})).data;
    
    console.log('new note', note.text);
    
    // update the note
    await axios.put(`${API}/users/${user.id}/notes/${note.id}`, {text : `${note.text} updated!!!`, archived: true});

    notes = (await axios.get(`${API}/users/${user.id}/notes/`)).data;

    notes.forEach(note => console.log(note.text));

}

fetch()
