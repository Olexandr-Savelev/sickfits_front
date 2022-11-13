export default function countTotalPrice(cart) {
  return cart.reduce((acc, cartItem) => {
    if (!cartItem) return acc;
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0);
}
