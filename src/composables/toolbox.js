/**
 * Gets the difference between a new date and an old date.
 * \
 * Any Return value other than all, will return the total difference in that time
 * (total minutes, total hours, etc.)
 * 
 * @param {Date | Number} newDate The newest date to compare
 * @param {Date | Number} oldDate The oldest date to compare 
 * @param {getDateDifference.differencesToReturn} toReturn The values to return from the function
 * @returns 
 */
export const getDateDifference = (newDate, oldDate, toReturn) => {
    
    let first = newDate
    let second = oldDate


    //convert the first and second dates into milliseconds, if they were passed in as date objects.
    if (first instanceof Date) {
        first = first.getTime()
    }

    if (second instanceof Date) {
        second = second.getTime
    }
    
    //get the difference in milliseconds
    const difference = newDate - oldDate

    let valuesToReturn = {}

    //determine what the user needs returned
    switch (toReturn) {
        case (getDateDifference.differencesToReturn.ALL):
            valuesToReturn = {
                milliseconds: difference,
                seconds: parseInt((difference / 1000).toString()) % 60,
                minutes: parseInt((difference / (1000 * 60)).toString()) % 60,
                hours: parseInt((difference / (1000 * 60 * 60)).toString()) % 60,
                days: parseInt((difference / (1000 * 60 * 60 * 24)).toString()) % 24,
            }
            break;
        case (getDateDifference.differencesToReturn.MILLISECONDS):
            valuesToReturn = difference
            break;
        case (getDateDifference.differencesToReturn.SECONDS):
            valuesToReturn = parseInt((difference / 1000).toString())
            break;
        case (getDateDifference.differencesToReturn.MINUTES):
            valuesToReturn = parseInt((difference / (1000 * 60)).toString())
            break;
        case (getDateDifference.differencesToReturn.HOURS):
            valuesToReturn = parseInt((difference / (1000 * 60 * 60)).toString())
            break;
        case (getDateDifference.differencesToReturn.DAYS):
            valuesToReturn = parseInt((difference / (1000 * 60 * 60 * 24)).toString())
    }

    return valuesToReturn
}

/**@enum */
getDateDifference.differencesToReturn = Object.freeze({
    ALL: 0,
    MILLISECONDS: 1,
    SECONDS: 2,
    MINUTES: 3,
    HOURS: 4,
    DAYS: 5,
})


/**
 * Formats the date object given.
 * 
 * @param {Date | Number} date Formats the given date in the format YYYY-MM-DD HH:mm:ss
 * @param {formatDate.format} format Whether to return the date in 12 or 24 hour format
 * @returns The formatted date
 */
export const formatDate = (date, format) => {

    //convert the date to a date if it was a number.
    let dateToFormat = typeof date == 'number' ? new Date(date) : date
    
    //ensure the date is a valid date
    if (dateToFormat instanceof Date) {
        
        const year = dateToFormat.getFullYear()
        const month = String(dateToFormat.getMonth() + 1).padStart(2, "0")
        const day = String(dateToFormat.getDate()).padStart(2, "0")
        const hours = String(dateToFormat.getHours()).padStart(2, "0")
        const minutes = String(dateToFormat.getMinutes()).padStart(2, "0")
        const seconds = String(dateToFormat.getSeconds()).padStart(2, "0")

        if (format == formatDate.format.TWELVE) {
            return year + "-" + month + "-" + day + " " +
                (hours % 12 || 12) + ":" + minutes + ":" + seconds + (hours > 12 ? "pm" : "am")
        } else if (format == formatDate.format.TWENTY_FOUR) {
            return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds
        }
    }
}

/**@enum */
formatDate.format = Object.freeze({
    TWELVE: 1,
    TWENTY_FOUR: 2,
})


export const appendTimezone = (dateString) => {
    const offset = new Date().getTimezoneOffset()
    const sign = offset > 0 ? '-' : '+'
    const absoluteOffset = Math.abs(offset)
    const hours = String(Math.floor(absoluteOffset / 60)).padStart(2, "0")
    const minutes = String(absoluteOffset % 60).padStart(2, "0")

    return dateString + sign + hours + ":" + minutes
}

export const validTime = (timeString) => {
    let dateString = "1970-01-01T" + timeString
    dateString = appendTimezone(dateString)

    const testDate = new Date(dateString)

    return !isNaN(testDate.getTime())
}
