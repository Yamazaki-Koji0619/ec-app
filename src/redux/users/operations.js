import { signInAction, signOutAction, fetchProductsInCartAction, fetchProductsInLikeAction, fetchOrdersHistoryAction } from "./actions";
import { push } from 'connected-react-router';
import { auth, db, FirebaseTimestamp } from '../../firebase/index';

export const addProductToCart = (addedProduct) => {
    return async(dispatch,getState) => {
        const uid = getState().users.uid;
        const cartRef = db.collection('users').doc(uid).collection('cart').doc();
        addedProduct['cartId'] = cartRef.id;
        await cartRef.set(addedProduct)
        dispatch(push('/ec-app'))
    }
} 

export const addProductToLike = (addedProduct) => {
    return async(dispatch,getState) => {
        const uid = getState().users.uid;
        const likeRef = db.collection('users').doc(uid).collection('like').doc();
        addedProduct['likeId'] = likeRef.id;
        await likeRef.set(addedProduct)
        dispatch(push('/ec-app'))
    }
} 

export const fetchOrdersHistory = () => {
    return async(dispatch, getState) => {
        const uid = getState().users.uid;
        const list = [];

        db.collection('users').doc(uid).collection('orders').orderBy('updated_at', 'desc').get()
            .then((snapshots) => {
                snapshots.forEach(snapshot => {
                    const data = snapshot.data()
                    list.push(data)
                })

                dispatch(fetchOrdersHistoryAction(list))
            })
    }
}

export const fetchProductsInCart = (products) => {
    return async(dispatch) => {
        dispatch(fetchProductsInCartAction(products))
    }
}

export const fetchProductsInLike = (products) => {
    return async(dispatch) => {
        dispatch(fetchProductsInLikeAction(products))
    }
}

export const listenAuthState = () => {
    return async(dispatch) => {
        return auth.onAuthStateChanged(user => {
            if(user){
                const uid = user.uid
                    
                db.collection('users').doc(uid).get()
                    .then(snapshot => {
                        const data = snapshot.data()

                        dispatch(signInAction({
                            isSignedIn: true,
                            role: data.role,
                            uid: uid,
                            username: data.username
                        }))
                    })
            }else{
                dispatch(push('/signin'))
            }
        })
    }
}

export const resetPassword = (email) => {
    return async(dispatch) => {
        if(email === ""){
            alert("必須項目が未入力です")
            return false
        }else{
            auth.sendPasswordResetEmail(email)
                .then(() => {
                    alert('入力されたアドレスにパスワードリセット用のメールを送信しました。')
                    dispatch(push('/signin'))
                }).catch(() => {
                    alert('パスワードリセットに失敗しました。通信を確認してもう一度お試しください。')
                })
        }
    }
}


export const signIn = (email, password) => {
    return async(dispatch) => {
        if(email === "" || password === ""){
            alert("必須項目が未入力です")
            return false
        }
        
        auth.signInWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user

                if(user){
                    const uid = user.uid
                    
                    db.collection('users').doc(uid).get()
                        .then(snapshot => {
                            const data = snapshot.data()

                            dispatch(signInAction({
                                isSignedIn: true,
                                role: data.role,
                                uid: uid,
                                username: data.username
                            }))

                            dispatch(push('/ec-app'))
                        })
                }
            })
    }
}

export const signUp = (username, email, password, confirmpassword) => {
    return async (dispatch) => {
        if(username === "" || email === "" || password === "" || confirmpassword === ""){
            alert("必須項目が未入力です")
            return false
        }

        if(password !== confirmpassword){
            alert("パスワードが一致しません。もう一度お試しください。")
            return false
        }

        return auth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user

                if(user){
                    const uid = user.uid
                    const timestamp = FirebaseTimestamp.now()

                    const userInitialData = {
                        create_at: timestamp,
                        email: email,
                        role: "customer",
                        uid: uid,
                        updated_at: timestamp,
                        username: username
                    }

                    db.collection('users').doc(uid).set(userInitialData)
                        .then(() => {
                            dispatch(push('/ec-app'))
                        })
                }
            })
    }
}

export const signOut = () => {
    return async(dispatch) => {
        auth.signOut()
            .then(() => {
                dispatch(signOutAction())
                dispatch(push('/signin'))
            })
    }
}