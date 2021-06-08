import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { saveViewed, createTodo } from './actions'
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import { Home, About, Events, Contact, Whoops404, Services, CompanyHistory, Location} from "./pages";

const imagecollections = [
   "Natural",
   "Enhenced"
]

const imagecolObjects = imagecollections.map((col,i) => ({id: i, title: col}));

function ImagesTypes(props) {
  return (
    <section>
      <p>We have these image collections to show:</p>
      <ul>
        {props.types.map((col) => (
          <li key={col.id}>{col.title}</li>
        ))}
      </ul>
    </section>
  )
}

function Header(props)
{
  return (
    <header className="App-header">
      <ImagesTypes types={imagecolObjects} />
      {props.content}
    </header>
  );
}

function test()
{
  return (
    <p>
      Test
    </p>
  );
}

function Image({id, image, viewed, images, setImagesText, onImagePressed})
{
  return (
    <a href={'https://epic.gsfc.nasa.gov/archive/natural/'+ id.slice(0,4)+'/'+ id.slice(4,6)+'/'+ id.slice(6,8)+'/png/'+image+'.png'} target="_blank" rel="noreferrer"
      onClick={() => {
        const isViewed = 
          viewed.some(img => img.text === id)
          if (!isViewed) {
            onImagePressed(id);
            const newText = images + id +', ';
            setImagesText(newText);
          }
      }}
    >
    <img alt={"Image id:" +id} src={'https://epic.gsfc.nasa.gov/archive/natural/'+id.slice(0,4)+'/'+ id.slice(4,6)+'/'+ id.slice(6,8)+'/thumbs/'+image+'.jpg'}/>
  </a>
  );
}

function App({ todos, viewed, onCreatePressed, onImagePressed }) {
  const [data, setData] = useState(null);
  const [clicked, setClickedText] = useState(null);
  const [images, setImagesText] = useState("You have viewed these images: ");

  useEffect (() => {
   fetch("https://epic.gsfc.nasa.gov/api/natural")
   .then ((response) => response.json())
   .then(setData);
  }, []);

  if (data) {
    return (<div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />}>
          <Route path="services" element={<Services />}/>
          <Route path="history" element={<CompanyHistory />}/>
          <Route path="location" element={<Location />}/>
        </Route>
        <Route path="/events" element={<Events />} component={test}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="*" element={<Whoops404 />}/>
      </Routes>
      <Header content={images}/>

      <div className="App">
      {
        data.map(natural => (
        <div key={natural.identifier}>
          <h3>{natural.caption}</h3> 
          <p>
          <Image id={natural.identifier} image={natural.image} viewed = {viewed} images ={images} setImagesText={setImagesText} onImagePressed = {onImagePressed}/>
          </p>
        </div>
        ))}
      <button
        onClick={() => {
          const isClicked = 
            todos.some(todo => todo.text === 'Clicked')
            if (!isClicked) {
              onCreatePressed('Clicked');
              setClickedText('Button is clicked and the state is stored with redux!');
            }
            else {
              setClickedText('You have already clicked!')
            }
        }}>
      Click this once!</button>
      {clicked}
      </div>
    </div>)
  }

  return (
    <div className="App">
     No Data avalible
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

const mapStateToProps = state => ({
  todos: state.todos,
  viewed: state.viewed,
});

const mapDispatchToProps = dispatch => ({
  onImagePressed: text => dispatch(saveViewed(text)),
  onCreatePressed: text => dispatch(createTodo(text)),
})

export default connect(mapStateToProps, mapDispatchToProps) (App);
