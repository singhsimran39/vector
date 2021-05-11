import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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


function Card() {
  const [cardDetails, setCardDetails] = useState(initialState);

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;

    const cards = Array.from(cardDetails);
    const [reorderedCard] = cards.splice(result.source.index, 1);
    cards.splice(result.destination.index, 0, reorderedCard);

    setCardDetails(cards);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId='cards'>
        {(provided) => (
          <div className='cards' {...provided.droppableProps} ref={provided.innerRef}>
            {cardDetails.map((card: CardInterface, cardIndex) => {
              return (
                <Draggable key={card.position} draggableId={card.title} index={cardIndex}>
                  {(provided) => (
                    <div className='card' {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                      <div className='card-content'>{card.title}</div>
                      <img src={`https://fakeimg.pl/400x300/?text=${card.title}`} alt='' className='card-image' />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Card;
