import React, { useState, useEffect } from 'react';
import './App.css';
import Main from './components/Main';

function App() {
  const [allPhotos, updateAllPhotos] = useState([]);

  useEffect(() => {
      async function getAllPhotos() {
          const url = 'https://jsonplaceholder.typicode.com/photos';
          const resp = await fetch(url);
          const data =  await resp.json(); 
          updateAllPhotos(data);
      } 
      getAllPhotos();
  }, [])

  let photoCount;
  if (allPhotos.length!=0) {
    const albumId = allPhotos.map(item => item.albumId);
    const albumIdName = albumId.filter((item, index, arr) => { return (arr.indexOf(item)) == index});
    const count = albumIdName.map(item => albumId.filter(val => val==item).length);
    photoCount = albumIdName.map((item, index) => {return {'albumId': item, 'photoCount': count[index]}});
  }
  
  return (
    <Main photoCount = {photoCount}/>
  );
}

export default App;
