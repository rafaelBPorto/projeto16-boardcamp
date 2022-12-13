import dayjs from "dayjs";

export default function createRentalObjetc(req, res, next) {
    const { customerId, gameId, daysRented, originalPrice } = res.locals.rental;

    const rental = {
        customerId,
        gameId,
        rentDate:  dayjs().format("YYYY-MM-DD"),  
        daysRented,
        returnDate: null,          
        originalPrice,       
        delayFee: null             
    };

    res.locals.rental = rental;
    next();
}

