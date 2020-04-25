const { update } = require('../../../database/postgREST/reservation');
const responseMsgs = require('../util/responseMessages');

module.exports = async (req, res) => {

    try {
        const { reservation_id } = req.params;
        const {
            diner_id,
            cook_id,
            guests,
            dishes,
            client_order,
            cook_comment,
            priority,
            comment,
            place,
            when,
            status,
            staff_id
        } = req.body;

        const updatedReservation = await update('reservation_id', reservation_id, {
            diner_id,
            cook_id,
            guests,
            dishes,
            client_order,
            cook_comment,
            priority,
            comment,
            place,
            when,
            status,
            staff_id
        });
        if (!updatedReservation[0].reservation_id) {
            return res.status(404).json({
                ...responseMsgs[404],
                errors: updatedReservation
            })
        }
        // TODO: check if payment exists
        return res.status(202).send({
            ...responseMsgs[202],
            data: [{
                ...responseMsgs[202].data[0],
                diner_id,
                when,
                comment,
                place,
                status
            }]
        });
    } catch (error) {

        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{ error: error.message, trace: error.trace }]
        });
    }
};