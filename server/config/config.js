const config = {
    production: {
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI,
        PORT: process.env.PORT
    },
    default: {
        SECRET: 'supersecretpassword123',
        DATABASE: 'mongodb://localhost:27017/books-shelf',
        PORT: 8080
    }
}

exports.get = function get(env) {
    return config[env] || config.default;
}