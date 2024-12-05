export interface MenuItems {
   MenuItemID : string
   articleName: string,
   allergies:string,
   description: string,
   fullDescription:string,
   ingredience: string[],
   visible: boolean,
   timeToCook: number,
   price: number,
   quantity: number,
   inStock: number,
   toDaysSpecial: boolean,
   healthyIndex: number,
   popularIndex: number,
   image: string

}

export interface OrderContent {
   count: number;
   specialRequest: string;
   menuItemID: string;
 }
 
 export interface OrderItem {
   orderItemID: string;
   editedAt: string; // Om du använder Date, kan detta justeras till Date
   orderLocked: boolean;
   orderStatus: string;
   userID: string;
   createdAt: string; // Om du använder Date, kan detta justeras till Date
   orderContent: OrderContent[];
 }