
const API = 'https://acme-users-api-rev.herokuapp.com/api';

const fetchUser = async ()=> {
  const storage = window.localStorage;
  const userId = storage.getItem('userId'); 
  if(userId){
    try {
      return (await axios.get(`${API}/users/detail/${userId}`)).data;
    }
    catch(ex){
      storage.removeItem('userId');
      return fetchUser();
    }
  }
  const user = (await axios.get(`${API}/users/random`)).data;
  storage.setItem('userId', user.id);
  return  user;
};

const getUser = async () => {
    let user =  await fetchUser();
    // console.log(user)
}
getUser()


const { Component } = React;
const { render } = ReactDOM;
const root = document.getElementById('root');

const DisplayText = (props) => {
    const {val} = props;
    return(
        <div>{`this input has ${val.length} - ${val.length > 1 ? `characters` : `character` }`}</div>
    );
}

 // functional component or presentational component
class InputBox extends Component {
    constructor(props){ 
        // gets the props from App component
        // console.log(props.val) 
        super();
        this.state ={
            // sets the InputBox state to what ever the prop is in App Component
            val: props.val
        }
    }
 
    render(){
        const { onUpdate } = this.props;
        const { val } = this.state;
        console.log(val)
        return(
            <div>
            <label htmlFor="fname">First name:</label>
            <input type="text" id="fname" name="fname" value={val} onChange={ (ev) => this.setState({val:ev.target.value})} disabled={val.length >= 20 ? "disabled" : null} />
            <button disabled={val === this.props.val} onClick={ ()=> onUpdate(val)}>Update</button>
            <button onClick={ ()=> this.setState({val: this.props.val}) }>Cancel</button>
            </div>
    )
}
}


class App extends Component {
    constructor(){
        super()
        this.state = {
            val: 'Enter Name'
        }
        this.onUpdate = this.onUpdate.bind(this);
    }

    onUpdate(ev){ 
        console.log(ev)
       this.setState({val: ev}); // OR this.setState({val}) BUT onUpdate(val) needs to rcv the val argument
    }

    render(){
        const {val} = this.state;
        const {onUpdate} = this;
        return(
            <section>
            <DisplayText val={val}/>
            <InputBox val ={val} onUpdate={onUpdate} />
            </section>
        )
    }
}

render(<App/>, root);



