import { Subject } from 'rxjs';
import { storageService } from './storage.service';
import { NewOrder, Order } from '../interface/order';
import { NewOrder as NewOrderOnSite } from '../interface/onsiteOrder';
import { Response} from '../interface/response';


class OrderService {
  private shopId: string;
  private orderSource = new Subject<any>();
  private alertSource = new Subject<any>();

  constructor() {
    this.shopId = storageService.getShopId() ?? '';
  } 

  order$ = this.orderSource.asObservable();
  alert$ = this.alertSource.asObservable();

  private async fetchData<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${storageService.getToken() ?? ''}`,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${await response.text()}`);
    }

    return response.json();
  }

  getOrders(url: string) {
    return this.fetchData<Response>(`/${this.shopId}/bills/${url}`);
  }

  changeStatus(orderId: number | string, status: number, code?: number | string) {
    return this.fetchData<Response>(`/${this.shopId}/bills/${orderId}/status`, {
      method: 'POST',
      body: JSON.stringify({ status, code }),
    });
  }

  validateCodeOrder(orderId: number | string, code: number | string) {
    return this.fetchData<Response>(`/${this.shopId}/bills/${orderId}/code`, {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
  }

  getOrderById(orderId: number | string) {
    return this.fetchData<Response>(`/${this.shopId}/bills/${orderId}`);
  }

  getSummaryDaily(date: string) {
    return this.fetchData<Response>(`/${this.shopId}/bills/day`, {
      method: 'POST',
      body: JSON.stringify({ day: date }),
    });
  }

  newOrder(order: NewOrder) {
    return this.fetchData<Response>(`/${this.shopId}/bills`, {
      method: 'POST',
      body: JSON.stringify(order),
    });
  }

  sendOrderUpdate(orderData: Order) {
    this.orderSource.next(orderData);
  }

  showAlert(showAlert: boolean) {
    this.alertSource.next(showAlert);
  }

  createOnsiteOrder(orderData: NewOrderOnSite) {
    return this.fetchData<Response>(`/${this.shopId}/bills/in-site`, {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  getOnSiteOrders() {
    return this.fetchData<Response>(`/${this.shopId}/bills/in-site`);
  }

  assignClientOnsiteOrder(userId: number, orderId: number | string) {
    return this.fetchData<Response>(`/${this.shopId}/bills/in-site/${orderId}/add-client`, {
      method: 'POST',
      body: JSON.stringify({ client_id: userId }),
    });
  }
}

export const orderService = new OrderService();
