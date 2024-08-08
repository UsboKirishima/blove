import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

/**
 * Part that manages api calls & responses.
 * 
 * @remarks
 * This namespace includes some useful 
 * classes to manage http requests
 * @example ```ts
 * new Rest.RestManager(...)
 * ```
 */
export namespace Rest {
    export interface RestMagaerOptions {
        get<T>(url: string, params?: any): Promise<AxiosResponse<T>>;
        post<T>(url: string, data: any): Promise<AxiosResponse<T>>;
        put<T>(url: string, data: any): Promise<AxiosResponse<T>>;
        delete<T>(url: string, params?: any): Promise<AxiosResponse<T>>;
    }

    interface RestManagerConfig {
        baseURL: string;
        timeout?: number;
    }

    /**
     * Class Rest Manager
     * 
     * @remarks This class makes http requests
     * @example ```ts
     * new RestManager({ baseURL: string; timeout?: number });
     * ```
     */
    export class RestManager implements RestMagaerOptions {

        private axiosInstance: AxiosInstance;

        constructor(config: RestManagerConfig) {
            this.axiosInstance = axios.create({
                baseURL: config.baseURL,
                timeout: config.timeout || 10000, // Default timeout of 10 seconds
            });
        }

        /**
         * RestManager - get<T>(url: string, params?: any): Promise<AxiosResponse<T>>
         * 
         * @param url string
         * @param params any
         * @returns Fetched Data
         * @example ```ts
         * new RestManager({ baseURL: string; timeout?: number }).get<T>(url: string, params?: any);
         * ```
         */
        public async get<T>(url: string, params?: any): Promise<AxiosResponse<T>> {
            try {
                return await this.axiosInstance.get<T>(url, { params });
            } catch (error: any) {
                this.handleError(error);
                throw error; // Re-throw the error after handling
            }
        }

        /**
         * RestManager - post<T>(url: string, data: any): Promise<AxiosResponse<T>>
         * 
         * @param url string
         * @param data any
         * @returns Fetched Data
         * @example ```ts
         * new RestManager({ baseURL: string; timeout?: number }).post<T>(url: string, data: any);
         * ```
         */
        public async post<T>(url: string, data: any): Promise<AxiosResponse<T>> {
            try {
                return await this.axiosInstance.post<T>(url, data);
            } catch (error: any) {
                this.handleError(error);
                throw error;
            }
        }

        /**
         * RestManager - put<T>(url: string, data: any): Promise<AxiosResponse<T>>
         * 
         * @param url string
         * @param data any
         * @returns Fetched Data
         * @example ```ts
         * new RestManager({ baseURL: string; timeout?: number }).put<T>(url: string, data: any);
         * ```
         */
        public async put<T>(url: string, data: any): Promise<AxiosResponse<T>> {
            try {
                return await this.axiosInstance.put<T>(url, data);
            } catch (error: any) {
                this.handleError(error);
                throw error;
            }
        }

        /**
         * RestManager - delete<T>(url: string, params?: any): Promise<AxiosResponse<T>>
         * 
         * @param url string
         * @param params any
         * @returns Fetched Data
         * @example ```ts
         * new RestManager({ baseURL: string; timeout?: number }).delete<T>(url: string, params?: any);
         * ```
         */
        public async delete<T>(url: string, params?: any): Promise<AxiosResponse<T>> {
            try {
                return await this.axiosInstance.delete<T>(url, { params });
            } catch (error: any) {
                this.handleError(error);
                throw error;
            }
        }

        /**
         * Errors handler
         * @param error AxiosError
         * @returns prints errors
         * @private
         */
        private handleError(error: AxiosError): void {
            // Handle errors in a central place
            if (error.response) {
                console.error('Server responded with a status:', error.response.status);
            } else if (error.request) {
                console.error('No response received from the server');
            } else {
                console.error('Error setting up the request:', error.message);
            }
        }

    }
}