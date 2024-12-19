
export interface BasketItem {
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
}

export interface BasketItemProps {
    onTotalPriceChange: (total: number) => void;
    onBasketItemsChange: (items: BasketItem[]) => void;
}

export interface OrderItem {
    menuItem: string;
    articleName: string;
    count: number;
    specialRequest?: string;
}

export interface Order {
    orderItemID: string;
    userID: string;
    createdAt: string;
    orderStatus: string;
    orderLocked: boolean;
    orderContent: OrderItem[];
}

export interface CookPageFallbackProps {
    onBackToStaff: () => void;
}

export interface WaiterPageFallbackProps {
    onBackToStaff: () => void;
}

export interface ButtonProps {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    color?: 'blue' | 'green';
    fontStyle?: 'bold' | 'extra-bold';
    className?: string;
}

export interface CounterProps {
    count: number;
    onIncrement: () => void;
    onDecrement: () => void;
}

export interface LoginModalProps {
    onClose: () => void;
    onRegisterClick: () => void;
}

export interface DecodedToken {
    userid: string;
    role: string;
    isAdmin: boolean;
    iat: number;
    exp: number;
}

export interface RegisterModalProps {
    onClose: () => void;
}


/*
Alistair 18/12
flyttat interfaces till en gemensam fil
*/