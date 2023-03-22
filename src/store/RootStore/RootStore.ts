import BuyNowStore from '@store/RootStore/BuyNowStore';
import CartStore from '@store/RootStore/CartStore';
import QueryParamsStore from '@store/RootStore/QueryPramsStore';

export default class RootStore {
  readonly queryParamsStore = new QueryParamsStore();
  readonly cartStore = new CartStore();
  readonly buyNowStore = new BuyNowStore();
}
