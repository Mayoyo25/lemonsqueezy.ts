import fetch from "node-fetch";
import { join } from "node:path";

import type {
  GetUserOptions,
  GetUserResult,
  LemonsqueezyOptions,
  ListAllFilesOptions,
  ListAllFilesResult,
  ListAllOrderItemsOptions,
  ListAllOrderItemsResult,
  ListAllOrdersOptions,
  ListAllOrdersResult,
  ListAllProductsOptions,
  ListAllProductsResult,
  ListAllStoresOptions,
  ListAllStoresResult,
  ListAllSubscriptionsOptions,
  ListAllSubscriptionsResult,
  ListAllVariantsOptions,
  ListAllVariantsResult,
  RetrieveFileOptions,
  RetrieveFileResult,
  RetrieveOrderItemOptions,
  RetrieveOrderItemResult,
  RetrieveOrderOptions,
  RetrieveOrderResult,
  RetrieveProductOptions,
  RetrieveProductResult,
  RetrieveStoreOptions,
  RetrieveStoreResult,
  RetrieveSubscriptionOptions,
  RetrieveSubscriptionResult,
  RetrieveVariantOptions,
  RetrieveVariantResult,
} from "./types";

export class Lemonsqueezy {
  private _apiKey: string;

  constructor(apiKey: string) {
    this._apiKey = apiKey;
  }

  /**
   * Get User
   *
   * @description Retrieves the currently authenticated user.
   *
   * @param {Object} [options]
   *
   * @returns A user object
   */
  public async getUser(options: GetUserOptions = {}) {
    return this._request<GetUserResult>({
      path: "/users/me",
      ...options,
    });
  }

  /**
   * Retrieve store
   *
   * @description Retrieves the store with the given ID
   *
   * @param {String} options.id - The ID of the store to retrieve
   *
   * @returns A store object
   */
  public async retrieveStore(options: RetrieveStoreOptions) {
    const { id, ...rest } = options;

    return this._request<RetrieveStoreResult>({
      path: `/stores/${id}`,
      ...rest,
    });
  }

  /**
   * List all stores
   *
   * @description Returns a paginated list of stores
   *
   * @param {Object} [options]
   *
   * @returns Returns a paginated list of `store` objects ordered by name
   */
  public async listAllStores(options: ListAllStoresOptions = {}) {
    return this._request<ListAllStoresResult>({
      path: "/stores",
      ...options,
    });
  }

  /**
   * Retrieve product
   *
   * @description Retrieves the product with the given ID
   *
   * @param {String} options.id - The ID of the product to retrieve
   *
   * @returns A product object
   */
  public async retrieveProduct(options: RetrieveProductOptions) {
    const { id, ...rest } = options;

    return this._request<RetrieveProductResult>({
      path: `/products/${id}`,
      ...rest,
    });
  }

  /**
   * List all products
   *
   * @description Returns a paginated list of products
   *
   * @param {Object} [options]
   *
   * @returns Returns a paginated list of product objects ordered by `name`
   */
  public async listAllProducts(options: ListAllProductsOptions = {}) {
    const { storeId, ...rest } = options;

    return this._request<ListAllProductsResult>({
      data: storeId ? { store_id: storeId } : undefined,
      path: "/products",
      ...rest,
    });
  }

  /**
   * Retrieve variant
   *
   * @description Retrieves the variant with the given ID
   *
   * @param {String} options.id - The ID of the variant to retrieve
   *
   * @returns A variant object
   */
  public async retrieveVariant(options: RetrieveVariantOptions) {
    const { id, ...rest } = options;

    return this._request<RetrieveVariantResult>({
      path: `/variants/${id}`,
      ...rest,
    });
  }

  /**
   * List all variants
   *
   * @description Returns a paginated list of variants
   *
   * @param {Object} [options]
   *
   * @returns Returns a paginated list of variant objects ordered by sort
   */
  public async listAllVariants(options: ListAllVariantsOptions = {}) {
    const { productId, ...rest } = options;

    return this._request<ListAllVariantsResult>({
      data: productId ? { product_id: productId } : undefined,
      path: "/variants",
      ...rest,
    });
  }

  /**
   * Retrieve file
   *
   * @description Retrieves the file with the given ID
   *
   * @param {String} options.id - The ID of the file to retrieve
   *
   * @returns A file object
   */
  public async retrieveFile(options: RetrieveFileOptions) {
    const { id, ...rest } = options;

    return this._request<RetrieveFileResult>({
      path: `/files/${id}`,
      ...rest,
    });
  }

  /**
   * List all files
   *
   * @description Returns a paginated list of files
   *
   * @param {Object} [options]
   *
   * @returns Returns a paginated list of file objects ordered by `sort`
   */
  public async listAllFiles(options: ListAllFilesOptions = {}) {
    const { variantId, ...rest } = options;

    return this._request<ListAllFilesResult>({
      data: variantId ? { variant_id: variantId } : undefined,
      path: "/files",
      ...rest,
    });
  }

  /**
   * Retrieve order
   *
   * @description Retrieves the order with the given ID
   *
   * @param {String} options.id - The ID of the order to retrieve
   *
   * @returns A order object
   */
  public async retrieveOrder(options: RetrieveOrderOptions) {
    const { id, ...rest } = options;

    return this._request<RetrieveOrderResult>({
      path: `/orders/${id}`,
      ...rest,
    });
  }

  /**
   * List all orders
   *
   * @description Returns a paginated list of orders
   *
   * @param {Object} [options]
   *
   * @returns Returns a paginated list of file objects ordered by `sort`
   */
  public async listAllOrders(options: ListAllOrdersOptions = {}) {
    const { storeId, userEmail, ...rest } = options;

    return this._request<ListAllOrdersResult>({
      data:
        storeId && userEmail
          ? {
              ...(storeId ? { store_id: storeId } : {}),
              ...(userEmail ? { user_email: userEmail } : {}),
            }
          : undefined,
      path: "/orders",
      ...rest,
    });
  }

  /**
   * Retrieve order item
   *
   * @description Retrieves the order item with the given ID
   *
   * @param {String} options.id - The ID of the order item to retrieve
   *
   * @returns A order item object
   */
  public async retrieveOrderItem(options: RetrieveOrderItemOptions) {
    const { id, ...rest } = options;

    return this._request<RetrieveOrderItemResult>({
      path: `/order-items/${id}`,
      ...rest,
    });
  }

  /**
   * List all order items
   *
   * @description Returns a paginated list of order items
   *
   * @param {Object} [options]
   *
   * @returns Returns a paginated list of order item objects ordered by `id`
   */
  public async listAllOrderItems(options: ListAllOrderItemsOptions = {}) {
    const { orderId, productId, variantId, ...rest } = options;

    return this._request<ListAllOrderItemsResult>({
      data:
        orderId && productId && variantId
          ? {
              ...(orderId ? { order_id: orderId } : {}),
              ...(productId ? { product_id: productId } : {}),
              ...(variantId ? { variant_id: variantId } : {}),
            }
          : undefined,
      path: "/order-items",
      ...rest,
    });
  }

  /**
   * Retrieve subscription
   *
   * @description Retrieves the subscription with the given ID
   *
   * @param {String} options.id - The ID of the subscription to retrieve
   *
   * @returns A subscription object
   */
  public async retrieveSubscription(options: RetrieveSubscriptionOptions) {
    const { id, ...rest } = options;

    return this._request<RetrieveSubscriptionResult>({
      path: `/subscriptions/${id}`,
      ...rest,
    });
  }

  /**
   * List all order items
   *
   * @description Returns a paginated list of order items
   *
   * @param {Object} [options]
   *
   * @returns Returns a paginated list of subscription objects ordered by `created_at` (descending)
   */
  public async listAllSubscriptions(options: ListAllSubscriptionsOptions = {}) {
    const { orderId, orderItemId, productId, storeId, variantId, ...rest } =
      options;

    return this._request<ListAllSubscriptionsResult>({
      data:
        orderId && orderItemId && productId && storeId && variantId
          ? {
              ...(orderId ? { order_id: orderId } : {}),
              ...(orderItemId ? { order_item_id: orderItemId } : {}),
              ...(productId ? { product_id: productId } : {}),
              ...(storeId ? { store_id: storeId } : {}),
              ...(variantId ? { variant_id: variantId } : {}),
            }
          : undefined,
      path: "/subscriptions",
      ...rest,
    });
  }

  private async _request<TResponse = Record<string, unknown>>({
    apiVersion = "v1",
    baseUrl = "https://api.lemonsqueezy.com",
    data,
    headers,
    method = "GET",
    path,
  }: LemonsqueezyOptions): Promise<TResponse> {
    try {
      const url = new URL(join(apiVersion, path), baseUrl);
      if (data && method === "GET")
        Object.entries(data).forEach(([key, value]) =>
          url.searchParams.append(key, value)
        );

      const response = await fetch(url.href, {
        headers: {
          Accept: "application/vnd.api+json",
          Authorization: `Bearer ${this._apiKey}`,
          "Content-Type": "application/vnd.api+json",
          ...headers,
        },
        method,
        ...(data && method !== "GET"
          ? {
              body: typeof data === "string" ? data : JSON.stringify(data),
            }
          : {}),
      });

      const json = (await response.json()) as TResponse;

      return json;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
