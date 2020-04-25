const axios = require('axios');

module.exports = {
  byParam: (key, value) => {
    try {
      return axios.get(process.env.POSTGRES_URL + `/reservations?${key}=eq.${encodeURIComponent(value)}&limit=1000`)
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
      return axios.get(process.env.POSTGRES_URL + `/reservations`)
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
      } = input;
      return axios({
        method: 'PATCH',
        url: process.env.POSTGRES_URL + '/reservations',
        headers: {
          Prefer: 'return=representation',
          Accept: 'application/json'
        },
        data: {
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
      } = input;
      return axios({
        method: 'POST',
        url: process.env.POSTGRES_URL + '/reservations',
        headers: {
          Prefer: 'return=representation',
          Accept: 'application/json'
        },
        data: {
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
  }
};