import React, { useState, useEffect } from 'react';
import  '../AlbumsPreviewField/albumsPreviewField.css'

function AlbumsPreviewField(props) {
    const [albums, updateAlbums] = useState([]);
    useEffect(() => {
        async function getAlbums() {
            const url = `https://jsonplaceholder.typicode.com/user/${props.userId}/albums`;
            const resp = await fetch(url);
            const data =  await resp.json(); 
            if (Array.isArray(data)) updateAlbums(data);
        } 
        getAlbums();
    }, [props.userId])
    
    const selectAlbum = e => {
        const albumId = e.currentTarget.getAttribute('data');
        const albumTitle = albums.find(item => item.id == albumId).title;
        props.selectActiveAlbum({albumId: albumId, albumTitle: albumTitle});
        document.querySelector('.modal').classList.toggle('modal--active');
    }

    let albumsTitle = albums.map(album => {
        const index = props.photoCount.findIndex(item => item.albumId == album.id);
        return (
        <div 
            data = {album.id} 
            key = {album.id} 
            className = "album"
            onClick = {selectAlbum}
            style={{backgroundColor: `#${Math.floor(Math.random(1)*16777215).toString(16)}`}}>
                <span>
                    Album ({props.photoCount[index].photoCount} photos):
                    <br/>
                    {album.title}
                </span>
        </div>)
    })

    return(
        <div className="albums_preview_field">
            {albumsTitle}
        </div>
    )
}

export default AlbumsPreviewField;