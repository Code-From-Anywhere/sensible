import { API } from "sensible-core";
export declare const bodyFromQueryString: (query?: string | undefined) => {
    [key: string]: string;
} | undefined;
export declare const toQueryString: (query?: any) => string;
declare type Config = {
    apiUrl: string;
};
export declare const makeApi: <TAllEndpoints extends unknown>(config: Config) => API<TAllEndpoints>;
export {};
//# sourceMappingURL=API.d.ts.map