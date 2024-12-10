import { db } from "@/main"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, Timestamp, updateDoc} from "firebase/firestore"

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
                    }

                    const docData = docSnap.data()

                    //ensure all timestamps are 
                    convertToDate(docData, curEntry)

                    if (curEntry.breaks.length > 0) {
                        curEntry.breaks.forEach(curBreak => {
                            //in this situation, the thing the dates are being thrown into is the break object.
                            convertToDate(curBreak, curBreak)
                        })
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
                };

                const docData = docSnap.data()

                convertToDate(docData, timeEntry)

                if (timeEntry.breaks.length > 0) {
                    timeEntry.breaks.forEach(curBreak => {
                        //in this situation, the thing the dates are being thrown into is the break object.
                        convertToDate(curBreak, curBreak)
                    })
                }
                
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

const convertToDate = (docData, timeEntry) => {
    for (const [key, value] of Object.entries(docData)) {
        if (value instanceof Timestamp) {
            timeEntry[key] = value.toDate()
        } else {
            timeEntry[key] = value
        }
    }
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
    
    console.log(entry)

    const newEntryReference = doc(db, "users", userId, "time-entries", entry.id);

    return updateDoc(newEntryReference, entry)
        .then(response => {
            return entry.id
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
            return entryId
        })
        .catch(err => {
            const msg = "ERROR: dbGetBlogPost: " + err
            console.log(msg)
            throw new Error(msg)
        });
}
