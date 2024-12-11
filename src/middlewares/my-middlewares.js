module.exports = () => {
    return async (ctx, next) => {
        if (!ctx.request.url.toString().startsWith('/api')) {
            ctx.request.url = '/api' + ctx.request.url;
        }

        await next();
    };
};
