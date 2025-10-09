import type { CartLine, CartPayloadOrderLine, ProductResponse } from '@/services/locker-products/locker-products-type'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { uniqBy } from 'lodash';

export const useCart = defineStore('cart', () => {
  const cart = ref<CartLine[]>([])

  const cartTabValue = ref<"casierCompose"|"casierComplet"|"water">("casierComplet")

  const setCartTabValue = (value: "casierCompose"|"casierComplet"|"water") => {
    cartTabValue.value = value
  }

  const formatCartLineToOrderPayload = ():CartPayloadOrderLine[] => {
    return cart.value.map(item => {
      return {
        type: item.type,
        qty: item.quantity,
        casierLines: item.products.map(product => {
          return {
            variant_id: product.id,
            qty: product.quantity ?? 1
          }
        })
      }
    })
  }

  const casierLength = computed(() => {
    return cart.value.map((line: CartLine) => line.type === 'locker' || line.type === 'fullLocker').length;
});

const packLength = computed(() => {
    return cart.value.map((line: CartLine) => line.type === 'water').length;
})


  const cartQuantityLength = computed(() => {
    return cart.value.reduce((total, item) => {
      return total + item.quantity  
    }, 0);
  })

  const total = computed(() => {
    return cart.value.reduce((total, item) => {
      return total + item.quantity * item.products[0].unit_price
    }, 0)
  })

  const addCartLine= (product: CartLine) => {
    const existingCartLine = cart.value.find(item => item.id === product.id)
    if (existingCartLine) {
      existingCartLine.quantity++
    } else {
      cart.value.push(product)
    }
  }

  const updateCartLine = (product: CartLine) => {
    const existingCartLine = cart.value.find(item => item.id === product.id)
    if (existingCartLine) {
      existingCartLine.quantity = product.quantity
      existingCartLine.products = product.products
    }
    
  }


  const removeCartLine = (product: CartLine) => {
    cart.value = cart.value.filter(item => item.id !== product.id) ;
  }

  const clearCart = () => {
    cart.value = []
  }

  const waterProductDefaultQuantity = (id_water_product: string) => {
  //  const waterCartLine = cart.value.filter(cartLine => cartLine.type === 'water');
  //   [].concat(array1, array2, array3)
  return cart.value.find(cartLine => cartLine.id === id_water_product)?.quantity ?? 0;


    
  }

  const productsDataGrouped = (products: ProductResponse[], type: "locker" | "fullLocker" | "water") => {
    const groupedMap = new Map<string, ProductResponse>();

    let setProducts = products;

    if (type === "locker") {

        // setProducts = Array.from(new Set(products));
        setProducts = uniqBy(setProducts, 'product_id');
    }

    // const setProducts = new Set(products);

    setProducts.forEach(product => {
        const existing = groupedMap.get(product.id);

        if (existing) {
            existing.quantity += product.quantity;
        } else {
            groupedMap.set(product.id, { ...product });
        }
    });

    return Array.from(groupedMap.values());
};


const subtotal = computed(() => {
    return cart.value.reduce((total, cartLine) => {
        const groupedProducts = productsDataGrouped(cartLine.products, cartLine.type);
        return total + groupedProducts.reduce((total, product) => {
            return total + product.unit_price * product.quantity
        }, 0) * cartLine.quantity;
    }, 0);
})

  return {
    cart,
    total,
    addCartLine,
    removeCartLine,
    clearCart,
    cartQuantityLength,
    waterProductDefaultQuantity,
    updateCartLine,
    formatCartLineToOrderPayload,
    subtotal,
    casierLength,
    packLength,
    
    // setCartTabValue,
    // cartTabValue
  }
  
},{
  persist: true
})
