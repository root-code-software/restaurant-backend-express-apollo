const axios = require('axios');

module.exports = {
  byParam: async (key, value) => {
    try {
      return await axios.get(process.env.POSTGRES_URL + `/users?${key}=eq.${encodeURIComponent(value)}&limit=1000`)
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
  findById: async (key, value) => {
    try {
      return await axios.get(process.env.POSTGRES_URL + `/users?${key}=eq.${encodeURIComponent(value)}`)
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
      return await axios.get(process.env.POSTGRES_URL + `/users?email=eq.${encodeURIComponent(value)}`)
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
        phone_number,
        nickname,
        avatar,
        push,
        email_notification,
        sms_notification,
        updates_notification,
        promotionals_notification,
        is_diner_locked,
        is_cook_locked,
        ssn,
        certification_photo,
        instagram,
        bio,
        video,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
        work_holidays,
        last_payoff_method,
        last_payment_method,
        other
      } = input;
      return axios({
        method: 'PATCH',
        url: process.env.POSTGRES_URL + '/users?' + key + '=eq.' + value,
        headers: {
          Prefer: 'return=representation',
          Accept: 'application/json'
        },
        data: {
          first_name,
          last_name,
          email,
          password,
          phone_number,
          nickname,
          avatar,
          push,
          email_notification,
          sms_notification,
          updates_notification,
          promotionals_notification,
          is_diner_locked,
          is_cook_locked,
          ssn,
          certification_photo,
          instagram,
          bio,
          video,
          monday,
          tuesday,
          wednesday,
          thursday,
          friday,
          saturday,
          sunday,
          work_holidays,
          last_payoff_method,
          last_payment_method,
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
        phone_number,
        nickname,
        avatar,
        push,
        email_notification,
        sms_notification,
        updates_notification,
        promotionals_notification,
        is_diner_locked,
        is_cook_locked,
        ssn,
        certification_photo,
        instagram,
        bio,
        video,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
        work_holidays,
        last_payoff_method,
        last_payment_method,
        other
      } = input;
      return axios({
        method: 'POST',
        url: process.env.POSTGRES_URL + '/users',
        headers: {
          Prefer: 'return=representation',
          Accept: 'application/json'
        },
        data: {
          first_name,
          last_name,
          email,
          password,
          phone_number,
          nickname,
          avatar,
          push,
          email_notification,
          sms_notification,
          updates_notification,
          promotionals_notification,
          is_diner_locked,
          is_cook_locked,
          ssn,
          certification_photo,
          instagram,
          bio,
          video,
          monday,
          tuesday,
          wednesday,
          thursday,
          friday,
          saturday,
          sunday,
          work_holidays,
          last_payoff_method,
          last_payment_method,
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
  remove: (key, value) => {
    try {
      return axios({
        method: 'DELETE',
        url: process.env.POSTGRES_URL + '/users?' + key + '=eq.' + value,
        headers: {
          Prefer: 'return=representation',
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
      return axios.get(process.env.POSTGRES_URL + `/users`)
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