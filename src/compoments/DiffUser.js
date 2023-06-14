import React from "react";
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import {db} from "../FirebaseWork";




function DiffUser({room, roomMates, user}){
    const [diffUserData, setDiffUserData] = React.useState();
    

    React.useEffect(() => {
        for(let i in roomMates){
            const fetchData = async () => {
                if (room) {
                    
                    const querySnapshot = query(collection(db, room.ROOM_ID),  where("UUID", "==", roomMates[i]));
                    const unsubscribe = onSnapshot(querySnapshot, (querySnapshot) => {
                        const data = [];
                        querySnapshot.forEach((doc) => {
                            data.push(doc.data());
                        });
                        setDiffUserData(data)
                        console.log(data)
                    });
    
    
                }
            }
            fetchData().then(() => {
    
            });



        }
    }, [roomMates])
    

    return(
        <div>
            {/* {roomMates} */}
        </div>
    )
}

export default DiffUser;