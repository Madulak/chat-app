import { Avatar, IconButton } from '@material-ui/core';
import { DonutLarge, SearchOutlined } from '@material-ui/icons';
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert';

import SidebarChat from '../SidebarChat/SidebarChat';

import db from '../../firebase';

import { useSelector } from 'react-redux';

import React, { useEffect, useState } from 'react';
import classes from './Sidebar.module.css';

const Sidebar = () => {

    const [rooms, setRooms] = useState([]);
    const userPhoto = useSelector(state => state.user.user);
    console.log('[PHOTOURL] ',userPhoto.photoURL);


    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map( doc => (
                ({
                    id: doc.id,
                    data: doc.data(),
                })
            )))
        ))

        return () => {
            unsubscribe();
        }
    },[userPhoto])

    return (
        <div className={classes.Sidebar}>
            <div className={classes.Sidebar__header}>
                <Avatar src={userPhoto?.photoURL} alt={userPhoto.displayName} />
                <div className={classes.Sidebar__headerRight}>
                    <IconButton >
                        <DonutLarge />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className={classes.Sidebar__search}>
                <div className={classes.Search__container}>
                    <SearchOutlined />
                    <input placeholder="search or start new chat" type="text" />
                </div>
            </div>

            <div className={classes.Sidebar__chat}>
                <SidebarChat addNewChat />
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                ))}
                
                
            </div>
        </div>
    );
}

export default Sidebar;