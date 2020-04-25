const { verify } = require('../../lib/jsonwebtoken');

module.exports = async (resolve, root, args, context, info) => {
    if (context.request.get("Authorization")) {
        let token;
        try {
            token = verify(context.request.get("Authorization"), "secret");
        } catch (e) {
            return new Error("Not authorized");
        }
        context.claims = token.claims;
    }

    const result = await resolve(root, args, context, info);
    return result;
};