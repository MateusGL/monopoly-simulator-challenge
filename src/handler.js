const simulator = require('./game/simulator')

module.exports.handler = async (event) => {
    const result = simulator()
    return {
        statusCode: 200,
        body:
        {
            result,
            input: event,
        },
    };
};
