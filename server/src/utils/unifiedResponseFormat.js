/** 
    This function is used to format the response of the API in a unified format.
    @param {number} status - The status code of the response
    @param {String} - the message to be displayed to the user on the frontend
    @param {Object} data - The data to be sent to the user
    @returns {Object} - The formatted response
*/

export const unifiedResponse = (status, message, data) => {
    return {
        status,
        message,
        data
    }
}

export default unifiedResponse