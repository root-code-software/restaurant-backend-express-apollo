const axios = require('axios');

const logger = require('../../util/logger');
module.exports = {
  byParam: (key, value) => {
    try {
      return axios.get(process.env.POSTGRES_URL + `/dishes?${key}=eq.${encodeURIComponent(value)}&limit=1000`)
        .then((res) => res.data)
        .catch((error) => [{
          error: error.message,
          trace: error.stack,
          method: error.config.method,
          url: error.config.url,
          msg: 'Error in query'
        }])
    } catch (error) {
      return [{
        error: error.msg,
        trace: error.trace,
        msg: 'Error in execution'
      }]
    }
  },
  all: () => {
    try {
      return axios.get(process.env.POSTGRES_URL + `/dishes`)
        .then((res) => res.data)
        .catch((error) => [{
          error: error.message,
          trace: error.stack,
          method: error.config.method,
          url: error.config.url,
          msg: 'Error in query'
        }])
    } catch (error) {
      return [{
        error: error.msg,
        trace: error.trace,
        msg: 'Error in execution'
      }]
    }
  },
  update: (input) => {
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
      } = input
      return axios({
        method: 'PATCH',
        url: process.env.POSTGRES_URL + '/dishes',
        headers: {
          Prefer: 'return=representation',
        },
        data: {
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
        }
      })
        .then((res) => res.data)
        .catch((error) => [{
          error: error.message,
          trace: error.stack,
          method: error.config.method,
          url: error.config.url,
          msg: 'Error in query'
        }]);
    } catch (error) {
      return [{
        error: error.msg,
        trace: error.trace,
        msg: 'Error in execution'
      }]
    }
  },
  create: (input) => {
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
      } = input;
      return axios({
        method: 'POST',
        url: process.env.POSTGRES_URL + '/dishes',
        headers: {
          Prefer: 'return=representation',
          Accept: 'application/json'
        },
        data: {
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
        }
      })
        .then((res) => {
          // console.info(res.data)
          // logger.info(res.data)
          return res.data
        })
        .catch((error) => {
          console.error(error.message)
          return [{
            error: error.message,
            trace: error.stack,
            method: error.config.method,
            url: error.config.url,
            msg: 'Error in query'
          }]
        });
    } catch (error) {
      return [{
        error: error.msg,
        trace: error.trace,
        msg: 'Error in execution'
      }]
    }
  }
};