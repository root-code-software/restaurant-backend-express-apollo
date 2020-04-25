const axios = require('axios');

module.exports = {
  byParam: (key, value) => {
    try {
      return axios.get(process.env.POSTGRES_URL + `/claims?${key}=eq.${encodeURIComponent(value)}&limit=1000`)
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
      return axios.get(process.env.POSTGRES_URL + `/claims`)
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
        claim_id,
        diner_id,
        reservation_id,
        subject,
        issue,
        attachment,
        other
    } = input;
    return axios({
      method: 'PATCH',
      url: process.env.POSTGRES_URL + '/claims',
      headers: {
        Prefer: 'return=representation',
        Accept: 'application/json'
      },
      data: {
        claim_id,
        diner_id,
        reservation_id,
        subject,
        issue,
        attachment,
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
        claim_id,
        diner_id,
        reservation_id,
        subject,
        issue,
        attachment,
        other
    } = input;
    return axios({
      method: 'POST',
      url: process.env.POSTGRES_URL + '/claims',
      headers: {
        Prefer: 'return=representation',
        Accept: 'application/json'
      },
      data: {
        claim_id,
        diner_id,
        reservation_id,
        subject,
        issue,
        attachment,
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
  } catch(error) {
    return [{
      error: error.msg,
      trace: error.trace,
      msg: 'Error in execution'
    }]
  }
}
};