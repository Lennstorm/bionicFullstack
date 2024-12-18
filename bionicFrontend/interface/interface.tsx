//CheckoutPage---------------------------klar
// 1 Ändrat interface, se under.
/*export interface BasketItem {
    basketItemID: string;
    userID: string;
    menuItem: string;
    count: number;
    specialRequest: string;
    item: {
        price: number;
        quantity: number;
        image: string;
        articleName: string;
    };
}*/

//använder en mer utförlig BasketItem interface
export interface BasketItem {
    basketItemID: string;
    //userID: string | null; //la till detta så det funkar i Peter's MenuItem.tsx - fick dock en massa andra fel i filen dock
    menuItem: string;
    articleName?: string;
    price?: number;
    image?: string;
    count: number;
    specialRequest: string;
    addedAt?: string;
    item: {
        price: number;
        quantity: number;
        image: string;
        articleName: string;
    };
}


//CookPage-------------------------klar
// 2
export interface OrderItem {
    menuItem: string;
    articleName: string;
    count: number;
    specialRequest?: string;
}

// 3
export interface Order {
    orderItemID: string;
    userID: string;
    createdAt: string;
    orderStatus: string;
    orderLocked: boolean;
    orderContent: OrderItem[];
}

//CookPageFallback-----------------------klar
// 4
export interface CookPageFallbackProps {
    onBackToStaff: () => void;
}

//StaffPage---------------------------klar
// 5 finns redan en interface
/*interface OrderItem {
    menuItem: string;
    articleName: string;
    count: number;
    specialRequest?: string;
}*/

// 6 finns redan en interface
/*interface Order {
    orderItemID: string;
    userID: string;
    createdAt: string;
    orderStatus: string;
    orderLocked: boolean;
    orderContent: OrderItem[];
}*/

//WaiterPage----------------------klar
// 7 finns redan en interface
/*interface OrderItem {
    menuItem: string;
    articleName: string;
    count: number;
    specialRequest?: string;
}*/

// 8 finns redan en interface
/*interface Order {
    orderItemID: string;
    userID: string;
    createdAt: string;
    orderStatus: string;
    orderLocked: boolean;
    orderContent: OrderItem[];
}*/

//WaiterPageFallback---------------------klar
// 9
export interface WaiterPageFallbackProps {
    onBackToStaff: () => void;
}

//BasketItem.tsx----------------------klar
// 10 finns redan
/*interface BasketItem {
    basketItemID: string;
    menuItem: string;
    articleName?: string;
    price?: number;
    image?: string;
    count: number;
    specialRequest: string;
    addedAt?: string;
    item: {
        price: number;
        quantity: number;
        image: string;
        articleName: string;
    };
}*/

//BigButton----------------------klar
// 11 ändrat för att passa andra buttons med se nedan
/*export interface ButtonProps {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
}*/

export interface ButtonProps {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    color?: 'blue' | 'green';
    fontStyle?: 'bold' | 'extra-bold';
    className?: string;
}

//CheckoutBasketItem---------------klar
// 12 finns redan
/*interface BasketItem {
    basketItemID: string;
    menuItem: string;
    menuItemName?: string;
    price?: number;
    image?: string;
    count: number;
    specialRequest: string;
    addedAt?: string;
    item: {
        price: number;
        quantity: number;
        image: string;
        articleName: string;
    };
}*/

//Counter----------------------------klar
// 13
export interface CounterProps {
    count: number;
    onIncrement: () => void;
    onDecrement: () => void;
}

//LoginButton------------------------klar
// 14 finns redan
/*interface ButtonProps {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
}*/

//LoginModal---------------------klar
// 15
export interface LoginModalProps {
    onClose: () => void;
    onRegisterClick: () => void;
}

// 16
export interface DecodedToken {
    userid: string;
    role: string;
    isAdmin: boolean;
    iat: number;
    exp: number;
}

//LogoutButton--------------------klar
// 17 finns redan
/*interface ButtonProps {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
}*/

//MenuItem------------------     ----  MenuItemProps blir fel, funkar inte, ej flyttat interface ---
// 18 finns redan
/*interface BasketItem {
    basketItemID: string;
    userID: string | null;
    menuItem: string;
    count: number;
    item: {
        price: number;
        quantity: number;
        image: string;
        articleName: string;
    };
    specialRequests: string;
    orderStatus: string;
}*/

// 19 
/*export interface MenuItemProps {
    item: MenuItems
}*/

//OrderButton-----------------------klar
// 20 finns redan
/*interface ButtonProps {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
}*/

//RegisterModal-----------------------klar
// 21
export interface RegisterModalProps {
    onClose: () => void;
}

//RoundedButton------------------
// 22 finns redan
/*interface ButtonProps {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    color?: 'blue' | 'green';
    fontStyle?: 'bold' | 'extra-bold';
    className?: string;
}*/



/*
Alistair 18/12
flyttat interfaces till en gemensam fil för att städa upp. Market här och i filerna vad jag flyttat och lämnat kvar de som kommentarer så det syns vad jag gjort. Testat och verkar funka.
*/