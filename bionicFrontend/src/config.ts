let config: {
    endpoints: {
        menu: {
            create: string;
            get: string;
            sort: string;
        };
        user: {
            add: string;
        };
        orders: {
            create: string;
            getAll: string;
        };
        auth: {
            login: string;
        };
        basket: {
            add: string;
            get: string;
            delete: string;
        };
    };
};

try {
    config = require('./localConfig.json');
} catch (error) {
    console.warn('localConfig.json saknas. Standardvärden används.');
    config = {
        endpoints: {
            menu: {
                create: "https://fallback-frontend-url/api/create-menu",
                get: "https://fallback-frontend-url/api/get-menu",
                sort: "https://fallback-frontend-url/api/sort-menu"
            },
            user: {
                add: "https://fallback-frontend-url/api/add-user"
            },
            orders: {
                create: "https://fallback-frontend-url/api/orders",
                getAll: "https://fallback-frontend-url/api/orders"
            },
            auth: {
                login: "https://fallback-frontend-url/api/login"
            },
            basket: {
                add: "https://fallback-frontend-url/api/basket",
                get: "https://fallback-frontend-url/api/basket",
                delete: "https://fallback-frontend-url/api/basket/{id}"
            }
        }
    };
}

export default config;


/* 
* Författare Andreas
*
* 
* 
*
* 
* 
*/