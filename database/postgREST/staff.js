const axios = require('axios');

module.exports = {
  byParam: async (key, value) => {
    try {
      return await axios.get(process.env.POSTGRES_URL + `/staffs?${key}=eq.${encodeURIComponent(value)}&limit=1000`)
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
  findByEmail: async (value) => {
    try {
      return await axios.get(process.env.POSTGRES_URL + `/staffs?email=eq.${encodeURIComponent(value)}`)
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
  update: (key, value, input) => {
    try {
      const {
        first_name,
        last_name,
        email,
        password,
        role,
        phone_number,
        nickname,
        avatar,
        other
      } = input;
      return axios({
        method: 'PATCH',
        url: process.env.POSTGRES_URL + '/staffs?' + key + '=eq.' + value,
        headers: {
          Prefer: 'return=representation',
        },
        data: {
            first_name,
            last_name,
            email,
            password,
            role,
            phone_number,
            nickname,
            avatar,
            other
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
        first_name,
        last_name,
        email,
        password,
        role,
        phone_number,
        nickname,
        avatar,
        other
      } = input;
      return axios({
        method: 'POST',
        url: process.env.POSTGRES_URL + '/staffs',
        headers: {
          Prefer: 'return=representation'
        },
        data: {
            first_name,
            last_name,
            email,
            password,
            role,
            phone_number,
            nickname,
            avatar,
            other
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
  all: () => {
    try {
      return axios.get(process.env.POSTGRES_URL + `/staffs`)
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
  }
}