const CART_KEY = "expediaSavedTrips";

const notifyCartChanged = () => {
  window.dispatchEvent(new Event("expedia-cart-updated"));
};

export const getSavedTrips = () => {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (error) {
    return [];
  }
};

export const saveTrip = (trip) => {
  const trips = getSavedTrips();
  const savedTrip = {
    ...trip,
    cartId: trip.cartId || `${trip.tripType || "trip"}-${trip.id || Date.now()}`,
    savedAt: new Date().toISOString(),
  };
  const nextTrips = [savedTrip, ...trips.filter((item) => item.cartId !== savedTrip.cartId)];
  localStorage.setItem(CART_KEY, JSON.stringify(nextTrips));
  notifyCartChanged();
  return savedTrip;
};

export const removeTrip = (cartId) => {
  localStorage.setItem(
    CART_KEY,
    JSON.stringify(getSavedTrips().filter((trip) => trip.cartId !== cartId)),
  );
  notifyCartChanged();
};
