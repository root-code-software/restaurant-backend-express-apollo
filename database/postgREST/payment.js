const axios = require('axios');

module.exports = {
  byParam: (key, value) => {
    try {
      return axios.get(process.env.POSTGRES_URL + `/payments?${key}=eq.${encodeURIComponent(value)}&limit=1000`)
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
        receiver,
        buyer,
        comment,
        concept,
        register,
        pay_method,
        pay_status,
        other
      } = input;
      return axios({
        method: 'PATCH',
        url: process.env.POSTGRES_URL + '/payments',
        headers: {
          Prefer: 'return=representation',
          Accept: 'application/json'
        },
        data: {
          receiver,
          buyer,
          comment,
          concept,
          register,
          pay_method,
          pay_status,
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
        payment_id,
        receiver,
        buyer,
        comment,
        concept,
        register,
        pay_method,
        pay_status,
        other
      } = input;
      console.log({
        payment_id,
        receiver,
        buyer,
        comment,
        concept,
        register,
        pay_method,
        pay_status,
        other
      })
      return axios({
        method: 'POST',
        url: process.env.POSTGRES_URL + '/payments',
        headers: {
          Prefer: 'return=representation',
          Accept: 'application/json'
        },
        data: {
          payment_id,
          receiver,
          buyer,
          comment,
          concept,
          register,
          pay_method,
          pay_status,
          other
        }
      })
        .then((res) => {
          console.log(res)
          return res.data
        })
        .catch((error) => {
          console.log(error)
          return [{
          error: error.message,
          trace: error.stack,
          method: error.config.method,
          url: error.config.url,
          msg: 'Error in query'
        }];
      });
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
      return axios.get(process.env.POSTGRES_URL + `/payments`)
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
};