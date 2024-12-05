# bionicFullstack


För att implementera egna endpoints som importeras i projektet:
------------------------------------
# Kontrollera .gitignore i frontend
Se till att 
"/bionicFrontend/.gitignore "
innehåller texten "src/localConfig.json"

Om den inte finns där, lägg till den!
------------------------------------
# Kontrollera .gitignore i backend (inte helt nödvändigt för det används inte endpoints i backend)
Se till att /bionicBackend/.gitignore innehåller /localConfig.json
Om den inte finns där, lägg till den!
*** Vi har dock inga url inlagda i backend, så inte helt nödvändigt!
------------------------------------
# Lägg till src/localConfig.json
Skapa /bionicFrontend/src/localConfig.json
Lägg in dina endpoints från serverles enligt följande (copy-paste men ersätt zzpn054sg0 med din unika kod):
{
    "endpoints": {
      "menu": {
        "create": "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/create-menu",
        "get": "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/get-menu",
        "sort": "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/sort-menu"
      },
      "user": {
        "add": "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/add-user"
      },
      "orders": {
        "create": "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/orders",
        "getAll": "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/orders"
      },
      "auth": {
        "login": "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/login"
      },
      "basket": {
        "add": "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/basket",
        "get": "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/basket",
        "delete": "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/basket/{id}"
      }
    }
  }
------------------------------------
#  OBS!!!  Om nytt anrop skapas, måste det läggas in i localConfig av alla användare lokalt, 
#  samt i  config.ts i enlighet med befintlig struktur! (Och config.js om vi skulle lägga in något i Backend)
------------------------------------
# Användning i frontend:

# importera först:
import config from "../config";

# lägga in i koden:
Istället för t.ex:
const response = await fetch('https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/add-user', {...
skriv: 
const response = await fetch(config.endpoints.user.add, {...           *** alltså inga citattecken!! ***

Och se då till att det sista i frasen stämmer med config.ts (.user.add,)

ELLER om url ska definieras direkt, som i: 
const url: string = 'https://xicc2u4jn5.execute-api.eu-north-1.amazonaws.com/api/get-menu'

-ersätt med:
const url: string = config.endpoints.menu.get;       *** alltså inga citattecken!! ***

------------------------------------

*** OM VI SKULLE RÅKA LÄGGA TILL EN URL I BACKEND: ***
Skapa /bionicBackend/localConfig.json
Skapa /bionicBackend/config.js med samma innehåll som bionicFrontend/scr/config.ts

Lägg in dina endpoints från serverles enligt följande (copy-paste men ersätt zzpn054sg0 med din unika kod):

{
    "endpoints": {
      "menu": {
        "create": "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/create-menu",
        "get": "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/get-menu",
        "sort": "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/sort-menu"
      },
      "user": {
        "add": "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/add-user"
      },
      "orders": {
        "create": "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/orders",
        "getAll": "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/orders"
      },
      "auth": {
        "login": "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/login"
      },
      "basket": {
        "add": "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/basket",
        "get": "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/basket",
        "delete": "https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/basket/{id}"
      }
    }
  }