import rateLimit from 'express-rate-limit';

export let confiGET = () => rateLimit({
    windowMs : 30 * 1000,
    max : 5,
    standardHeaders : true,
    legacyHeaders : false,
    message: {
        status: 416,
        message: "Tiempo agotado"
    }
});