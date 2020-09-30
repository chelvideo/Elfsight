import React, { useState, useEffect } from 'react';
import '../FilterBar/FilterBar.css';

function FilterBar(props) {
    const [users, updateUsers] = useState([]);

    useEffect(() => {
        async function getUsers() {
            const url = 'https://jsonplaceholder.typicode.com/users';
            const resp = await fetch(url);
            const data =  await resp.json(); 
            updateUsers(data);
            props.selectActiveUser({userId: 1, userName: 'Leanne Graham'});
            document.querySelector('.user_list [data="1"]').classList.add('user--active');
        } 
        getUsers();
    }, [])

    const setFilter = (e) => {
        const userId = e.target.getAttribute('data');
        props.selectActiveUser({userId: userId, userName: users[userId - 1].name});
        const userList = document.querySelectorAll('.user_list [data]');
        userList.forEach(item => item.classList.remove('user--active'));
        document.querySelector(`.user_list [data="${userId}"]`).classList.add('user--active');
    } 
      
    let usersName = users.map(user =>
        <li key = {user.id} 
            data = {user.id} 
            className = "user"
            onClick = {setFilter}>

            {user.name}
        </li>
    )

    return(
        <div className = "filter_bar">
            <div className = "filter_title">
                Authors:
            </div>
            <ul className = "user_list">
                {usersName}
            </ul>
        </div>
    )
}

export default FilterBar;