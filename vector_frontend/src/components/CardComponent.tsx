import { useState, useEffect, memo } from 'react';
import spinner from './images/spinner.gif';

interface CardInterface {
  doc_type: string;
  doc_title: string;
  doc_position: number;
};


function CardComponent({setSelectedImage} : {setSelectedImage: Function}) {
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [cardDetails, setCardDetails] = useState([]);
  const [cardValues, setCardValues] = useState({
    type: '',
    title: '',
    position: ''
  });

  function changeHandler(e: any) {
    setCardValues({ ...cardValues, [e.target.name]: e.target.value });
  }

  function fetchCards() {
    return fetch('http://localhost:8000/docs/')
      .then((res) => res.json());
  }

  useEffect(() => {
    if (submitted) {
      setSeconds(0);
      return;
    }
    const secs = setInterval(() => setSeconds(seconds + 1), 1000);
    return () => clearInterval(secs);
  }, [seconds, submitted]);

  useEffect(() => {
    function getCards() {
      const cardsFromServer = fetchCards();
      cardsFromServer
        .then((data: any) => {
          setLoading(false);
          setCardDetails(data);
          setSubmitted(false);
        })
        .catch((error: any) => {
          setLoading(true);
          setCardDetails([]);
          setSubmitted(true);
        });
    }

    if (!submitted) {
      const cards = setInterval(getCards, 5000);
      return () => clearInterval(cards);
    } else {
      getCards();
    }
  }, [submitted]);

  useEffect(() => {
    const cardsFromServer = fetchCards();
    cardsFromServer
      .then((data: any) => {
        setLoading(false);
        setCardDetails(data);
      })
      .catch((error) => {
        setLoading(true);
        setCardDetails([]);
      });
  }, []);


  function handleSubmit(e: any) {
    e.preventDefault();
    const input = {
      doc_type: cardValues.type,
      doc_title: cardValues.title,
      doc_position: cardValues.position
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
    };
    fetch('http://localhost:8000/docs/', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setSubmitted(true);
        setCardValues({ ...cardValues, type: '', title: '', position: '' });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <form className='form-class' onSubmit={handleSubmit}>
        <input className='input-text' name='type' placeholder='Type' value={cardValues.type} onChange={changeHandler} />
        <input className='input-text' name='title' placeholder='Title' value={cardValues.title} onChange={changeHandler} />
        <input className='input-text' name='position' placeholder='Position' value={cardValues.position} onChange={changeHandler} />
        <input className='input-text' type='submit' value='Submit'></input>
      </form>
      <div className='time-since'>Time since last save: {seconds}</div>
      <div className='card-grid'>
        {loading && <img src={spinner} alt="loading..." />}
        {cardDetails.length > 0 && (cardDetails.map((card: CardInterface, cardIndex: any) => {
          const imageUrl = `https://fakeimg.pl/400x300/?text=${card.doc_title}`;
          return (
            <div className='card' key={cardIndex}>
              <div className='card-title'>{card.doc_title}</div>
              <img
                src={imageUrl}
                alt='Not found'
                className='card-image'
                onClick={() => setSelectedImage(imageUrl)}
              />
            </div>
          );
        }))}
      </div>
    </>
  );
}

export default memo(CardComponent);
