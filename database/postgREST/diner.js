const axios = require('axios');

module.exports = {
  byParam: (key, value) => {
    try {
      return axios.get(process.env.POSTGRES_URL + `/diners?${key}=eq.${encodeURIComponent(value)}&limit=1000`)
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
      return axios.get(process.env.POSTGRES_URL + `/diners`)
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
        email,
        password,
        first_name,
        last_name,
        nickname,
        avatar,
        phone_number
      } = input;
      return axios({
        method: 'PATCH',
        url: process.env.POSTGRES_URL + '/auth_diner',
        headers: {
          Prefer: 'return=representation',
          Accept: 'application/json'
        },
        data: {
          email,
          password,
          first_name,
          last_name,
          nickname,
          avatar,
          phone_number
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
    const {
      email, 
      password,
      first_name,
      last_name,
      nickname,
      avatar,
      phone_number
    } = input;
    try {
      return axios({
        method: 'POST',
        url: process.env.POSTGRES_URL + '/auth_diner',
        headers: {
          Prefer: 'return=representation',
          Accept: 'application/json'
        },
        data: {
          email, 
          password,
          first_name,
          last_name,
          nickname,
          avatar,
          phone_number
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