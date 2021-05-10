import { useState } from 'react';


let initialState = [
  {
    'type': 'bank-draft',
    'title': 'Bank Draft',
    'position': 0
  },
  {
    'type': 'bill-of-landing',
    'title': 'Bill of Landing',
    'position': 1
  },
  {
    'type': 'invoice',
    'title': 'Invoice',
    'position': 2
  },
  {
    'type': 'bank-draft-2',
    'title': 'Bank Draft 2',
    'position': 3
  },
  {
    'type': 'bill-of-landing-2',
    'title': 'Bill of Landing 2',
    'position': 4
  },
];

interface CardInterface {
  type: string;
  title: string;
  position: number;
};


function CardComponent() {
  const [cardDetails, ] = useState(initialState);


  return (
    <>
      <div className='cards'>
        {(cardDetails.map((card: CardInterface, cardIndex: any) => {
          const imageUrl = `https://fakeimg.pl/400x300/?text=${card.title}`;
          return (
            <div className='card' key={cardIndex}>
              <div className='card-content'>{card.title}</div>
              <img
                src={imageUrl}
                alt='Not found'
                className='card-image'
              />
            </div>
          );
        }))}
      </div>
    </>
  );
}

export default CardComponent;
