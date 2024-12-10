import { db } from "@/main"
import { addDoc, collection, deleteDoc, getDoc, getDocs, query, updateDoc} from "firebase/firestore"

export const getEntries = (userId) => {
    if (db) {
        const allEntriesReference = collection(db, 'users', userId, 'time-entries')
        const allEntriesQuery = query(allEntriesReference)

        return getDocs(allEntriesQuery)
            .then(querySnapshot => {
                const entries = []

                querySnapshot.forEach(docSnap => {
                    const curEntry = {
                        id: docSnap.id,
                        ...(docSnap.data())
                    }

                    entries.push(curEntry)
                })

                return entries
            })
            .catch(err => {
                const msg = "ERROR: getEntries: " + err
                console.error(msg)
                throw new Error(msg)
            })
    }
}


export const getEntry = (userId, entryId) => {
    const timeEntryRef = doc(db, "users", userId, "time-entries", entryId);

    return getDoc(timeEntryRef)
        .then(docSnap => {
            if (docSnap.exists()) {
                const timeEntry = {
                    id: docSnap.id,
                    ...(docSnap.data()),
                };

                return timeEntry
            } else {
                throw new Error("Post with id " + blogId + " does not exist.")
            }

        })
        .catch(err => {
            const msg = "ERROR: dbGetBlogPost: " + err
            console.log(msg)
            throw new Error(msg)
        });
}

export const addEntry = (userId, entry) => {
        
    const newEntryReference = collection(db, "users", userId, "time-entries");

    return addDoc(newEntryReference, entry)
        .then(response => {
            console.log(response.id)
            return response.id
        })
        .catch(err => {
            const msg = "ERROR: addEntry: " + err
            console.log(msg)
            throw new Error(msg)
        })
}

export const updateEntry = (userId, entry) => {
        
    const newEntryReference = collection(db, "users", userId, "time-entries");

    return updateDoc(newEntryReference, entry)
        .then(response => {
            console.log(response.id)
            return response.id
        })
        .catch(err => {
            const msg = "ERROR: updateEntry: " + err
            console.log(msg)
            throw new Error(msg)
        })
}

export const deleteEntry = (userId, entryId) => {
    const timeEntryRef = doc(db, "users", userId, "time-entries", entryId);

    return deleteDoc(timeEntryRef)
        .then(response => {
            console.log(response)
            return entryId
        })
        .catch(err => {
            const msg = "ERROR: dbGetBlogPost: " + err
            console.log(msg)
            throw new Error(msg)
        });
}
