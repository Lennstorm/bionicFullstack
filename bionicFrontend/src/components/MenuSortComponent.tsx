import './styles/menuSortComponent.css';

//    När denna importeras och används i menykomponenten behöver den läsas in så här tror jag:
/* 
return (
    <div>
        <MenuSortComponent
            onSortByCheapest={sortByCheapest}
            onSortByPopular={sortByPopular}
            onSortByHealthiest={sortByHealthiest}
            onSortByMostExpensive={sortByMostExpensive}
        />
        <Menu items={menuItems} />
    </div>
 */
//      Ta bort denna kommentar senare!!!!!

interface MenuSortProps {
    onSortByCheapest: () => void;
    onSortByPopular: () => void;
    onSortByHealthiest: () => void;
    onSortByMostExpensive: () => void;
}

const MenuSortComponent = ({
    onSortByCheapest,
    onSortByPopular,
    onSortByHealthiest,
    onSortByMostExpensive,
}: MenuSortProps) => {
    return (
        <nav className='menu-sort'>
            <button className='menu-sort--btn' onClick={onSortByCheapest}>Billigaste</button>
            <button className='menu-sort--btn' onClick={onSortByPopular}>Populäraste</button>
            <button className='menu-sort--btn' onClick={onSortByHealthiest}>Nyttigaste</button>
            <button className='menu-sort--btn' onClick={onSortByMostExpensive}>Dyraste</button>            
        </nav>

    );
};

export default MenuSortComponent;


/* Författare: Andreas
*
* 
* 
* 
* 
*/