import React, { useState } from 'react';
import Title from './Title/Title';
import FilterBar from './FilterBar/FilterBar';
import AlbumsPreviewField from './AlbumsPreviewField/AlbumsPreviewField';
import Photos from './Photos/Photos';

function Main(props) {
    const [activeUserId, selectActiveUser] = useState({userId: '', userName: ''});
    const [activeAlbum, selectActiveAlbum] = useState({albumId: 1, albumTitle: ''});
    
    return(
        <div>
            <Title />
            <FilterBar 
                userId = {activeUserId.userId} 
                selectActiveUser = {selectActiveUser}
            />
            <AlbumsPreviewField 
                photoCount = {props.photoCount}
                userId = {activeUserId.userId}
                albumId = {activeAlbum.albumId}
                albumTitle = {activeAlbum.albumTitle}
                selectActiveAlbum = {selectActiveAlbum}
            />
            <Photos
                userName = {activeUserId.userName}
                albumId = {activeAlbum.albumId}
                albumTitle = {activeAlbum.albumTitle}
                selectActiveAlbum = {selectActiveAlbum}
            />
        </div>
    )
}

export default Main;