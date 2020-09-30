import React, { useState, useEffect } from 'react';
import '../Photos/Photos.css';

function Photos(props) {
    const [photos, selectActiveAlbum] = useState([]);
    const [activePhoto, selectActivePhoto] = useState({photoId: '', url: '', photoTitle: ''});

    useEffect(() => {
        async function getPhotos() {
            const url = `https://jsonplaceholder.typicode.com/albums/${props.albumId}/photos`;
            const resp = await fetch(url);
            const data =  await resp.json(); 
            selectActiveAlbum(data);
        } 
        getPhotos();
    }, [props.albumId])
    
    let photosList = photos.map(photoItem =>
        <li key = {photoItem.id} 
            id = {photoItem.id}
            className = "photo"
            onClick = {selectPhoto}>

            {photoItem.title}
        </li>
    )

    function selectPhoto(e) {
        const photoId = e.target.getAttribute('id');
        document.querySelector('.photo_detail').classList.add('photo_detail--active');
        document.querySelector('.photos_list').classList.add('photos_list--active');
        const srcActivePhoto = photos.find(item => item.id == photoId).url;
        const urlActivePhoto = photos.find(item => item.id == photoId).title;
        selectActivePhoto({photoId: photoId, url: srcActivePhoto, title: urlActivePhoto});
    }

    function nextPhoto() {
        
        let currentIndex = photos.findIndex(item => item.id == activePhoto.photoId);
        if (currentIndex < photos.length - 1) {
            currentIndex += 1;
        }   else {
                currentIndex = 0;
            }
        const photoId = photos[currentIndex].id;
        const srcActivePhoto = photos[currentIndex].url;
        const urlActivePhoto = photos.[currentIndex].title;
        selectActivePhoto({photoId: photoId, url: srcActivePhoto, title: urlActivePhoto});
    }

    const closeModal = () => {
        document.querySelector('.modal').classList.remove('modal--active');
        document.querySelector('.photo_detail').classList.remove('photo_detail--active');
        document.querySelector('.photos_list').classList.remove('photos_list--active');
    }

    return(
        <div className="modal">
            <div className="modal__background">
                <div className="modal__title">
                    <div>
                        Author: {props.userName}
                        <br/>
                        Album: {props.albumTitle}
                    </div>
                    <div
                        className="close__btn"
                        onClick={closeModal}>
                        ╳
                    </div>
                </div>
                <div className="photo_detail">
                    <div className="photo_title">
                        Photo title: {activePhoto.title}
                    </div>
                    <img src={activePhoto.url} width="600" height="600" alt="author shot" onClick={nextPhoto} className="photo_img"/>
                    <div>*Click on photo to next</div>
                </div>
                <ol className="photos_list">
                    {photosList}
                </ol>
            </div>
        </div>
    )
}

export default Photos;