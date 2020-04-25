const { update } = require('../../../database/postgREST/dish');
const responseMsgs = require('../util/responseMessages');

module.exports = async (req, res) => {
    try {
        const { dish_id } = req.params;
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
            required_tools,
            disabled,
            reasons,
            review
        } = req.body;

        const updatedDish = await update('dish_id', dish_id, {
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
            required_tools,
            disabled,
            reasons,
            review
        })

        if (!updatedDish[0].dish_id) {
            return res.status(404).json({
                ...responseMsgs[404],
                errors: updatedDish
            })
        }
        return res.status(202).send({
            ...responseMsgs[202],
            data: [{
                ...responseMsgs[202].data[0],
                title,
                description,
                style,
                price,
                disabled,
                reasons,
                review
            }]
        });
    } catch (error) {
        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{ error: error.message, trace: error.trace }]
        });
    }
};