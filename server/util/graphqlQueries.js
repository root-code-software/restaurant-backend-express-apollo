module.exports = {
    get_login_cook:  `
    query users_aggregate($email: String) {
        users_aggregate(where: {email: {_eq: $email}}) {
            nodes {
                avatar
                cook {
                  cook_disabled
                  cook_id
                  cook_paused
                  cook_reviews {
                    stars
                    comment
                    disabled
                    user_id
                  }
                  cook_verified
                  last_payment_method
                  last_payoff_method
                  preferred_payment
                  promo_code
                }
                email
                first_name
                is_cook_locked
                last_name
                nickname
                notification {
                  alerts_email
                  alerts_sms
                  messages_email
                  messages_sms
                  notification_id
                  promotions_email
                  promotions_sms
                  push_notification
                  updated_at
                  updates_notification
                }
                updated_at
              }
            }
          }
`
};