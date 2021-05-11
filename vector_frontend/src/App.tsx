import { useState } from 'react';
import Modal from './components/Modal';
import CardComponent from './components/CardComponent';


function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>
      <h1>Hello</h1>
      <CardComponent setSelectedImage={setSelectedImage} />
      {selectedImage && <Modal selectedImage={selectedImage} setSelectedImage={setSelectedImage} />}
    </div>
  );
}

export default App;
