let config: {
    endpoints: {
      menu: { create: string; get: string; sort: string };
      user: { add: string };
      orders: { create: string; getAll: string; update: string; updateDish: string };
      auth: { login: string };
      basket: { add: string; get: string; delete: string };
    };
  };

  config = {
    endpoints: {
      menu: {
        create: "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/create-menu",
        get: "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/get-menu",
        sort: "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/sort-menu",
      },
      user: {
        add: "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/add-user",
      },
      orders: {
        create: "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/orders",
        getAll: "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/orders",
        update: "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/orders/{orderItemID}",
        updateDish: "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/orders",
      },
      auth: {
        login: "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/login",
      },
      basket: {
        add: "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/basket",
        get: "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/basket",
        delete: "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/basket/{id}",
      },
    },
  };
  
  /* try {
    config = await import('./localConfig.json');
    console.log('localConfig hittad! Hämtar data.');
  } catch (error) {
    console.log('localConfig.json hittas inte. Standardvärden används.');
    console.warn('localConfig.json saknas. Standardvärden används.');
    config = {
      endpoints: {
        menu: {
        create: "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/create-menu",
        get: "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/get-menu",
        sort: "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/sort-menu",
      },
      user: {
        add: "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/add-user",
      },
      orders: {
        create: "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/orders",
        getAll: "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/orders",
        update: "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com//api/orders/{orderItemID}",
        updateDish: "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/orders",
      },
      auth: {
        login: "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/login",
      },
      basket: {
        add: "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/basket",
        get: "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/basket",
        delete: "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/basket/{id}",
        },
      },
    };
  }
   */
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