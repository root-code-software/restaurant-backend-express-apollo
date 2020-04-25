const { create } = require('../../../database/postgREST/dish');
const responseMsgs = require('../util/responseMessages');

module.exports = async (req, res) => {
    try {
        const {
            cook_id,
            title,
            description,
            style,
            glutten_allergy,
            soy_allergy,
            milk_allergy,
            peanuts_allergy,
            shrimp_allergy,
            other_allergy,
            attachment,
            minimun_diners,
            maximum_diners,
            price,
            minimum_cancel_time,
            required_tools
        } = req.body;
        const dish = await create({
            cook_id,
            title,
            description,
            style,
            glutten_allergy,
            soy_allergy,
            milk_allergy,
            peanuts_allergy,
            shrimp_allergy,
            other_allergy,
            attachment,
            minimun_diners,
            maximum_diners,
            price,
            minimum_cancel_time,
            required_tools
        });
        if (!dish) {
            return res.status(404).json(responseMsgs[404]);
        }
        return res.status(201).send(responseMsgs[201]);
    } catch (error) {
        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{error: error.message, trace: error.trace}]
        });
    }
};