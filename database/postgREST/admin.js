const axios = require('axios');

module.exports = {
  all: () => {
    try {
      return axios.get(process.env.POSTGRES_URL + `/admins`)
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
  findByEmail: async (value) => {
    try {
      return await axios.get(process.env.POSTGRES_URL + `/admins?email=eq.${encodeURIComponent(value)}`)
        .then((res) => res.data[0])
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
};