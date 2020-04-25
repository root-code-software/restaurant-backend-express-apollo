const axios = require('axios');

module.exports = {
  byParam: (key, value) => {
    try {
      return axios.get(process.env.POSTGRES_URL + `/claim_chat?${key}=eq.${encodeURIComponent(value)}&limit=10`)
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