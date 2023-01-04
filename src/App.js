
import './App.css';
import Images from './Images.js'
import {useState} from "react";
import {shuffle} from 'lodash';

function App() {
  const [cards,setCards] = useState( shuffle([...Images, ...Images]) );

  const [win,setWin] = useState(false);
  const [activeCards,setActiveCards] = useState([]);
  const [foundPairs,setFoundPairs] = useState([]);

  function flipCard(index) {
    if (win) {
      setCards(shuffle([...Images, ...Images]));
      setFoundPairs([]);
      setWin(false);
      
    }
    if (activeCards.length === 0) {
      setActiveCards([index]);
    }
    if (activeCards.length === 1) {
      const firstIndex = activeCards[0];
      const secondsIndex = index;
      if (cards[firstIndex] === cards[secondsIndex]) {
        if (foundPairs.length + 2 === cards.length) {
          setWin(true);
        }
        setFoundPairs( [...foundPairs, firstIndex, secondsIndex] );
      }
      setActiveCards([...activeCards, index]);
    }
    if (activeCards.length === 2) {
      setActiveCards([index]);
    }
    
  }

  return (
    <div>
      <div className="grid gap-2 grid-cols-6 m-auto  board">
        {cards.map((card,index) => {
          const flippedToFront =  (activeCards.indexOf(index) !== -1) || foundPairs.indexOf(index) !== -1;
          return (
            <div className={"card-outer " + (flippedToFront ? 'flipped' : '')}
                 onClick={() => flipCard(index)}>
              <div className="w-[100%] h-[100%] rounded-2 relative card">
                <div className="absolute w-[100%] h-[100%] front">
                  <img src={card} alt="card" className="block max-w-[100%]"/>
                </div>
                <div className="absolute w-[100%] h-[100%] back" />
              </div>
            </div>
          );
        })}
      </div>
      <div className=" w-[400px] m-auto text-center text-white py-10 px-2 text-lg ">
        {win && (
          <>You win the game<br />
            Click any card to play again.<br /><br />
          </>
        )}
        Found :{foundPairs.length/2}
      </div>
    </div>
  );
}


export default App;
