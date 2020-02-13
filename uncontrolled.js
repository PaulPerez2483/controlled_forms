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
const InputBox = (props) => {
    const { val, onUpdate } = props;
    return(
        <form>
            <label htmlFor="fname">First name:</label>
            <input type="text" id="fname" name="fname" value={val} onChange={onUpdate} disabled={val.length >= 5 ? "disabled" : null} />
        </form>
    )
}


class App extends Component {
    constructor(){
        super()
        this.state = {
            val: 'foo'
        }
        this.onUpdate = this.onUpdate.bind(this);
    }

    onUpdate(ev){
        
       this.setState({val: ev.target.value});
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
