import { create } from 'zustand'
import getMenu from '../utils/getMenu.tsx'
import { MenuItems } from '../interfaces.ts'

interface MenuStore {
    menuItems: MenuItems[]
    selectedItem: MenuItems | null
    fetchMenuItems:() => Promise<void>
    openModal:(item: MenuItems) => void
    closeModal: () => void
}

const useMenuStore = create<MenuStore>((set) => ({
    menuItems: [],
    selectedItem: null,
    fetchMenuItems: async () => {
      console.log('startar fetchMenuItems')
        try {
        console.log('före getMenu anrop')
        const menuData = await getMenu();
        console.log('efter getMenu anrop')
        set({ menuItems: menuData });
      } catch (error) {
        console.error('Kunde inte hämta menyalternativ:', error);
      }
    },
    openModal: (item) => {
        console.log('Opening modal for item:', item.articleName);
        set({ selectedItem: item });
      },
      closeModal: () => set({ selectedItem: null }),
  }));
  
  export default useMenuStore