const config = {
    production: {
        SECRET: process.env.SECRET,
        DATABASE: 'mongodb://thor.ddnsking.com:27017/books-shelf',
        PORT: process.env.PORT
    },
    default: {
        SECRET: 'supersecretpassword123',
        DATABASE: 'mongodb://thor.ddnsking.com:27017/books-shelf',
        PORT: 8080
    }
}

exports.get = function get(env) {
    return config[env] || config.default;
}