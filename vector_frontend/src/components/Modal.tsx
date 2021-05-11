import { useEffect, useCallback } from 'react';

function Modal({ selectedImage, setSelectedImage }: { selectedImage: any, setSelectedImage: any }) {

  const handleClick = (e: any) => {
    if (e.target.classList.contains('backdrop')) {
      setSelectedImage(null);
    }
  }

  const keyPress = useCallback((e) => {
    if (e.keyCode === 27 && selectedImage) {
      setSelectedImage(null);
    }
  }, [selectedImage, setSelectedImage]);

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);

  return (
    <div className='backdrop' onClick={handleClick}>
      <img src={selectedImage} alt='Enlarged Pic' />
    </div>
  )
}

export default Modal;
