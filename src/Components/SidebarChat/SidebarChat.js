import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import db from '../../firebase';
import classes from './SidebarChat.module.css';

const SidebarChat = ({addNewChat, id, name}) => {

    const [seed, setSeed] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (id) {
            db.collection('rooms')
            .doc(id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => (
                setMessage(snapshot.docs.map(doc => (
                    doc.data()
                )))
            ))
        }
    },[id])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    },[])

    const createChat = () => {
        const roomName = prompt('Please enter name for chat');
        if (roomName) {
            db.collection('rooms').add({
                name: roomName,
            })
        }
    }

    let src = `https://avatars.dicebear.com/api/human/${seed}.svg`;

    return !addNewChat ? (
        <Link className={classes.Link} to={`/rooms/${id}`}>
            <div className={classes.SidebarChat}>
                <Avatar />
                <div className={classes.SidebarChat__info}>
                    <h2>{name}</h2>
                    <p>{message[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div className={classes.SidebarChat} onClick={createChat}>
            <h2>Add new Chat</h2>
        </div>
    )
}

export default SidebarChat;