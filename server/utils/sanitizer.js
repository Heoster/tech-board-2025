const sanitizeForLog = (input) => {
    if (typeof input !== 'string') {
        input = String(input);
    }
    return input.replace(/[\r\n\t]/g, ' ').replace(/[<>]/g, '');
};

const sanitizeInput = (input) => {
    if (typeof input !== 'string') {
        return input;
    }
    return input.trim().replace(/[<>]/g, '');
};

module.exports = { sanitizeForLog, sanitizeInput };