import { Subject } from 'rxjs';
import { storageService } from './storage.service';
import { NewOrder, Order } from '../interface/order';
import { NewOrder as NewOrderOnSite } from '../interface/onsiteOrder';
import { Response } from '../interface/response';
import { environment } from '../config/environment';

export class OrderService {
  private shopId: string;
  private orderSource = new Subject<any>();
  private alertSource = new Subject<any>();

  constructor() {
    this.shopId = storageService.getShopId() ?? '';
  } 

  order$ = this.orderSource.asObservable();
  alert$ = this.alertSource.asObservable();

  private async fetchData<T>(url: string, options?: RequestInit): Promise<T> {
    if (!this.shopId) {
      throw new Error('Shop ID is not available');
    }

    const normalizedUrl = url.startsWith('/') ? url : `/${url}`;
    const fullUrl = `${environment.baseUrl}/${this.shopId}${normalizedUrl}`;

    try {
      const response = await fetch(fullUrl, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${storageService.getToken() ?? ''}`,
        },
        ...options,
      });

      if (!response.ok) {
        let errorMessage = `Error ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
          const text = await response.text();
          if (text) errorMessage += `: ${text}`;
        }
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request Error:', {
        url: fullUrl,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  /* ================== MÉTODOS GENERALES ================== */
  getOrders(url: string) {
    return this.fetchData<Response>(`/bills/${url}`);
  }

  changeStatus(orderId: number | string, status: number, code?: number | string) {
    return this.fetchData<Response>(`/bills/${orderId}/status`, {
      method: 'POST',
      body: JSON.stringify({ status, code }),
    });
  }

  validateCodeOrder(orderId: number | string, code: number | string) {
    return this.fetchData<Response>(`/bills/${orderId}/code`, {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
  }

  getOrderById(orderId: number | string) {
    return this.fetchData<Response>(`/bills/${orderId}`);
  }

  getSummaryDaily(date: string) {
    return this.fetchData<Response>(`/bills/day`, {
      method: 'POST',
      body: JSON.stringify({ day: date }),
    });
  }

  newOrder(order: NewOrder) {
    return this.fetchData<Response>(`/bills`, {
      method: 'POST',
      body: JSON.stringify(order),
    });
  }

  /* ================== MÉTODOS IN-SITE ================== */
  createOnsiteOrder(orderData: NewOrderOnSite) {
    return this.fetchData<Response>(`/bills/in-site`, {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  getOnSiteOrders() {
    return this.fetchData<Response>(`/bills/in-site`);
  }

  assignClientToOnsiteOrder(userId: number, orderId: number | string) {
    return this.fetchData<Response>(`/bills/in-site/${orderId}/add-client`, {
      method: 'POST',
      body: JSON.stringify({ client_id: userId }),
    });
  }

  /* ================== MÉTODOS ADICIONALES ================== */
  getProcessedOrders() {
    return this.fetchData<Response>(`/bills/processed`);
  }

  getActiveOrders() {
    return this.fetchData<Response>(`/bills/active`);
  }

  /* ================== MÉTODOS DE NOTIFICACIONES ================== */
  sendOrderUpdate(orderData: Order) {
    this.orderSource.next(orderData);
  }

  showAlert(showAlert: boolean) {
    this.alertSource.next(showAlert);
  }

  /* ================== MÉTODOS DE PAGOS ================== */
  approveVoucher(voucherId: number, status: boolean) {
    return this.fetchData<Response>(`/bills/vouchers/${voucherId}/approved`, {
      method: 'POST',
      body: JSON.stringify({ status }),
    });
  }

  markVoucherAsRead(voucherId: number) {
    return this.fetchData<Response>(`/bills/vouchers/${voucherId}/read`, {
      method: 'GET',
    });
  }
}

export const orderService = new OrderService();