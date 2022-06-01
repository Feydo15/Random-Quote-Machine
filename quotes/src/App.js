import React, { useState, useEffect } from 'react';
import './App.css';
import { IconName } from "react-icons/fa";
import COLORS_ARRAY from "./colorsArray";

let quoteDBUrl = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

function App() {

const [quote, setQuote] = React.useState("You can never cross the ocean until you have the courage to lose sight of the shore. randomInteger ");
const [quotesArray, setQuotesArray] = React.useState(null);
const [author, setAuthor] = React.useState("Christopher Columbus");
const [accentColor, setAccentColor] = React.useState("#282c34");


const fetchQuotes = async (url) => {
  const response = await fetch(url)
  
  const parsedJSON = await response.json()

  setQuotesArray(parsedJSON.quotes)
  console.log(parsedJSON)
}

useEffect(() => {

fetchQuotes(quoteDBUrl)
}, [])

const getRandomQuote = () => {
  console.log(quotesArray)
  let randomInteger = Math.floor(quotesArray.length * Math.random())
  setAccentColor(COLORS_ARRAY[randomInteger])
  setQuote(quotesArray[randomInteger].quote)
  setAuthor(quotesArray[randomInteger].author)
}
 
  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor:accentColor, color:accentColor}}>
        <div id='quote-box' style={{color:accentColor}}> 
          <h1>Random Quotes</h1>
          <p id='text'>"{quote}"</p>
          <p id='author'>-{author}</p>
          <div className='button'><a id='tweet-quote' style={{color:accentColor}} href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote}-${author}`)}>Twitter</a></div>
          <button style={{color:accentColor}} id='new-quote' onClick={() => getRandomQuote()}>Generate A Random Quote</button>
        </div>
      </header>
    </div>
  );
}

export default App;
