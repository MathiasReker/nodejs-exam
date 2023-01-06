'use strict';

const error = (req, res) => {
    res.status(500).send({
        error: 'Something broke. Try again later',
        data: {},
    });
}

export default error;