const path = require('path');

let config;
try {
    config = require(path.resolve(__dirname, '../localConfig.json'));
} catch (error) {
    console.warn('localConfig.json saknas. Standardvärden används.');
    config = {
        endpoints: {
            menu: {
                create: "https://fallback-backend-url/api/create-menu",
                get: "https://fallback-backend-url/api/get-menu",
                sort: "https://fallback-backend-url/api/sort-menu"
            },
            user: {
                add: "https://fallback-backend-url/api/add-user"
            },
            orders: {
                create: "https://fallback-backend-url/api/orders",
                getAll: "https://fallback-backend-url/api/orders"
            },
            auth: {
                login: "https://fallback-backend-url/api/login"
            },
            basket: {
                add: "https://fallback-backend-url/api/basket",
                get: "https://fallback-backend-url/api/basket",
                delete: "https://fallback-backend-url/api/basket/{id}"
            }
        }
    };
}

module.exports = config;