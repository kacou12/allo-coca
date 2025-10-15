import type {
  CartLine,
  CartPayloadOrderLine,
  ProductResponse,
} from "@/services/locker-products/locker-products-type";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { uniqBy } from "lodash";

export const useCart = defineStore(
  "cart",
  () => {
    const cart = ref<CartLine[]>([]);

    const count_has_own_lockers = ref(0);

    const has_own_lockers = ref(false);

    watch(has_own_lockers, (newValue, oldValue) => {
        if (!newValue) {
            count_has_own_lockers.value = 0;
        }
    })

    const cartTabValue = ref<"casierCompose" | "casierComplet" | "water">(
      "casierComplet",
    );

    const setCartTabValue = (
      value: "casierCompose" | "casierComplet" | "water",
    ) => {
      cartTabValue.value = value;
    };

  // const productsDataGroupedOnlyLockerOrFullLocker = (products: ProductResponse[], type: "locker" | "fullLocker") => {
  //   const groupedMap = new Map<string, ProductResponse>();

  //   const bottlesName = products.map(product => product.product.name);


  //   let setProducts = products;

  //   // if (type === "locker") {
  //       setProducts = uniqBy(setProducts, 'product_id');
  //   // }



  //   setProducts.forEach(product => {
  //       const existing = groupedMap.get(product.id);

  //       if (existing) {
  //           existing.quantity += product.quantity;
  //       } else {
  //           groupedMap.set(product.id, { ...product });
  //       }
  //   });

  //   return Array.from(groupedMap.values());
 
  // };


  const productsDataGroupedOnlyLockerOrFullLocker = (
  products: ProductResponse[], 
  type: "locker" | "fullLocker"
) => {
  const grouped = products.reduce((acc, product) => {
    const key = product.product_id;
    
    if (acc[key]) {
      acc[key].quantity += product.quantity;
    } else {
      acc[key] = { ...product };
    }
    
    return acc;
  }, {} as Record<string, ProductResponse>);

  return Object.values(grouped);
};
    const formatCartLineToOrderPayload = (): CartPayloadOrderLine[] => {
      return cart.value.map((item) => {
        let localProducts = item.products;
        if(item.type !=  "water"){
          localProducts =   productsDataGroupedOnlyLockerOrFullLocker(item.products, item.type)
        }
        return {
          type: item.type,
          qty: item.quantity,
          casierLines: item.products.map((product) => {
            return {
              variant_id: product.id,
              qty: product.quantity ?? 1,
            };
          }),
        };
      });
    };

    const casierQuantityLength = computed(() => {
      return cart.value
        .filter(
          (line: CartLine) =>
            line.type === "locker" || line.type === "fullLocker",
        )
        .reduce((total, item) => {
          return total + item.quantity;
        }, 0);
    });

    const casierLength = computed(() => {
      return cart.value.map(
        (line: CartLine) =>
          line.type === "locker" || line.type === "fullLocker",
      ).length;
    });

    const packLength = computed(() => {
      return cart.value.map((line: CartLine) => line.type === "water").length;
    });

    const cartQuantityLength = computed(() => {
      return cart.value.reduce((total, item) => {
        return total + item.quantity;
      }, 0);
    });

    const total = computed(() => {
      return cart.value.reduce((total, item) => {
        return total + item.quantity * item.products[0].unit_price;
      }, 0);
    });

    const addCartLine = (product: CartLine) => {
      const existingCartLine = cart.value.find(
        (item) => item.id === product.id,
      );
      if (existingCartLine) {
        existingCartLine.quantity++;
      } else {
        cart.value.push(product);
      }
    };

    const updateCartLine = (product: CartLine) => {
      const existingCartLine = cart.value.find(
        (item) => item.id === product.id,
      );
      if (existingCartLine) {
        existingCartLine.quantity = product.quantity;
        existingCartLine.products = product.products;
      }
    };

    const removeCartLine = (product: CartLine) => {
      cart.value = cart.value.filter((item) => item.id !== product.id);
    };

    const clearCart = () => {
      cart.value = [];
      has_own_lockers.value = false;
    };

    const waterProductDefaultQuantity = (id_water_product: string) => {
      //  const waterCartLine = cart.value.filter(cartLine => cartLine.type === 'water');
      //   [].concat(array1, array2, array3)
      return (
        cart.value.find((cartLine) => cartLine.id === id_water_product)
          ?.quantity ?? 0
      );
    };

    const productsDataGrouped = (
      products: ProductResponse[],
      type: "locker" | "fullLocker" | "water",
    ) => {
      const groupedMap = new Map<string, ProductResponse>();

      let setProducts = products;

      if (type === "locker") {
        // setProducts = Array.from(new Set(products));
        setProducts = uniqBy(setProducts, "id");
      }

      // const setProducts = new Set(products);

      setProducts.forEach((product) => {
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
        const groupedProducts = productsDataGrouped(
          cartLine.products,
          cartLine.type,
        );
        return (
          total +
          groupedProducts.reduce((total, product) => {
            return total + product.unit_price * product.quantity;
          }, 0) *
            cartLine.quantity
        );
      }, 0)+  amountConsignation.value;
    });

    const amountConsignation = computed(() => {
      if (has_own_lockers.value) {
          return (casierQuantityLength.value - count_has_own_lockers.value) * 3600;
      }
      return casierQuantityLength.value * 3600;

   });

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
      casierQuantityLength,
      has_own_lockers,
      count_has_own_lockers,
      amountConsignation,
      // setCartTabValue,
      // cartTabValue
    };
  },
  {
    persist: true,
  },
);
