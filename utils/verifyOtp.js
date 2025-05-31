const verifyOTP = (inputOTP, storedOTP, expiryTime) => {
    if (!storedOTP || !expiryTime) {
        return false;
    }
    
    const isExpired = new Date() > new Date(expiryTime);
    return !isExpired && inputOTP === storedOTP;
};

module.exports = { verifyOTP };