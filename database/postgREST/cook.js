const axios = require('axios');

module.exports = {
  byParam: (key, value) => {
    try {
      return axios.get(process.env.POSTGRES_URL + `/cooks?${key}=eq.${encodeURIComponent(value)}&limit=1000`)
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
      return axios.get(process.env.POSTGRES_URL + `/cooks`)
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
        phone_number,
        ssn,
        certification_photo,
        instagram
      } = input;
      return axios({
        method: 'PATCH',
        url: process.env.POSTGRES_URL + '/auth_cook',
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
          phone_number,
          ssn,
          certification_photo,
          instagram
        }
      })
        .then((res) => res.data)
        .catch((error) => [{
          error: error.message,
          trace: error.stack,
          method: error.config.method,
          url: error.config.url,
          msg: 'Error in query'
        }]
        );
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
        email,
        password,
        first_name,
        last_name,
        nickname,
        avatar,
        phone_number,
        ssn,
        certification_photo,
        instagram
      } = input;
      return axios({
        method: 'POST',
        url: process.env.POSTGRES_URL + '/auth_cook',
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
          phone_number,
          ssn,
          certification_photo,
          instagram
        }
      })
        .then((res) => {
          return res.data
        })
        .catch((error) => {
          console.error(error);
          return [{
            error: error.message,
            trace: error.stack,
            method: error.config.method,
            url: error.config.url,
            msg: 'Error in query'
          }]
        });
    } catch (error) {
      console.error(error);
      return [{
        error: error.msg,
        trace: error.trace,
        msg: 'Error in execution'
      }]
    }
  }
};