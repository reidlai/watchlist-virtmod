declare module 'resclient' {
    export class ResClient {
        constructor(url: string, options?: any);
        on(event: string, callback: (...args: any[]) => void): void;
        get(rid: string): Promise<any>;
        call(rid: string, method: string, params?: any): Promise<any>;
        auth(rid: string, method: string, params?: any): Promise<any>;
        subscribe(rid: string): Promise<any>;
        unsubscribe(rid: string): Promise<any>;
        connected: boolean;
    }
    export default ResClient;
}
