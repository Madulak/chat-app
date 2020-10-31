import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticonOutlined, MicNoneOutlined, MoreVert, SearchOutlined } from '@material-ui/icons';

import { useParams } from 'react-router-dom';

import db from '../../firebase';

import * as sendActions from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';

import React, { useEffect, useState } from 'react';
import classes from './Chat.module.css';

const Chat = () => {

    const [input, setInput] = useState('');
    const { roomId } = useParams();
    const [roomName,setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user.displayName);

    useEffect(() => {
        if(roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ))

            db.collection('rooms').doc(roomId)
                .collection('messages').orderBy('timestamp', 'asc')
                .onSnapshot(snapshot => (
                    setMessages(snapshot.docs.map(doc => doc.data()))
                ))
        }
    },[roomId])

    const submitMessage = (e) => {
        e.preventDefault();
        console.log('[INPUT] ',input);
        const data = {
            input: input,
            roomId: roomId,
        }
        dispatch(sendActions.send_message(data))
        setInput('');
    }

    return (
        <div className={classes.Chat}>
            
            <div className={classes.Chat__header}>
                <Avatar />
                <div className={classes.Chat__headerInfo}>
                    <h3>{roomName}</h3>
                    <p>Last seen at {new Date(messages[messages.length -1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className={classes.Chat__headerRight}>
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className={classes.Chat__body}>
               {messages.map(message => (
                    <p className={`${classes.Chat__message} ${message.name === user && classes.Chat__receiver}`}>
                    {message.message}
                    <span className={classes.Chat__name}>
                         {message.name}
                    </span>
                    <span className={classes.Chat__timestamp}>
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                </p>
               ))}
            </div>

            <div className={classes.Chat__footer}>
                <IconButton>
                    <InsertEmoticonOutlined />
                </IconButton>
                <form onSubmit={submitMessage}>
                    <input value={input} onChange={e => setInput(e.target.value)} type='text' placeholder={'enter message'} />
                    <button type='submit'>Send a message</button>
                </form>
                <IconButton>
                    <MicNoneOutlined />
                </IconButton>
            </div>
        </div>
    );
}

export default Chat;