import firebase from 'firebase';
import db, { auth, provider } from '../firebase';

export const SIGNIN = 'SIGNIN';
export const SEND_MESSAGE = 'SEND_MESSAGE';

export const signin = () => {
    return async dispatch => {
    let response;
        try {
        response = await auth.signInWithPopup(provider)
        console.log(response.user);
        } catch (error) {
            console.log(error)
            throw error
        }
        dispatch({ type: SIGNIN, user: response.user})
    }
    
}

export const send_message = (data) => {
    return async (dispatch, getState) => {
        const user = getState().user.user;
        const roomId = data.roomId;
        const input = data.input;
        db.collection('rooms').doc(roomId)
            .collection('messages').add({
                message: input,
                name: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),

            })
        
        dispatch({ type: SEND_MESSAGE, })
    }
}