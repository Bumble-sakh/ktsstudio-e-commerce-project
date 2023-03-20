import { ILocalStore } from '@utils/useLocalStore';
import {
  action,
  computed,
  makeObservable,
  observable,
  remove,
  set,
  toJS,
} from 'mobx';

type PrivateFields = '_currentProduct' | '_order' | '_amount';

export default class CartStore implements ILocalStore {
  private _order: number[] = [];
  private _amount: Record<number, number> = {};
  private _currentProduct: number | null = null;

  constructor() {
    makeObservable<CartStore, PrivateFields>(this, {
      _order: observable,
      _amount: observable,
      _currentProduct: observable,
      amount: computed,
      productsAmount: computed,
      productAmount: computed,
      currentProduct: computed,
      addToCart: action.bound,
      removeFromCart: action.bound,
    });
  }

  get order() {
    return this._order;
  }

  set order(value) {
    this._order = value;
  }

  get productsAmount() {
    return this._order.length;
  }

  get currentProduct(): number | null {
    return this._currentProduct;
  }

  set currentProduct(id: number | null) {
    this._currentProduct = id;
  }

  get amount() {
    return this._amount;
  }

  get productAmount(): number | null {
    return this._currentProduct
      ? toJS(this._amount)[this._currentProduct]
      : null;
  }

  addToCart(id: number) {
    if (!this._order.includes(id)) {
      set(this._order, this._order.length, id);
      set(this._amount, id, 1);
    } else {
      set(this._amount, id, this._amount[id] + 1);
    }
  }

  removeFromCart(id: number) {
    const index = this._order.indexOf(id);
    if (index !== -1) {
      const amount = this._amount[id] - 1;

      set(this._amount, id, amount);

      if (amount <= 0) {
        remove(this._order, String(index));
        remove(this._amount, String(id));
      }
    }
  }

  destroy(): void {}
}
