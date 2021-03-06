/// <reference types="node" />
import http = require("http");
import * as express from "express";
import * as session from "express-session";
import * as bodyParser from "body-parser";
import * as formidable from "formidable";
import * as csurf from "csurf";
import * as helmet from "helmet";
declare module "server";
interface DataParserOptions {
    encoding: string;
    uploadDir: string;
    keepExtensions: boolean;
    maxFieldsSize: number;
    maxFields: number;
    hash: string | boolean;
    multiples: boolean;
    type: string;
    bytesReceived: number;
    bytesExpected: number;
    onPart: (part: formidable.Part) => void;
    handlePart(part: formidable.Part): void;
    parse(req: http.IncomingMessage, callback?: (err: any, fields: formidable.Fields, files: formidable.Files) => any): void;
}
interface CsurfOptions {
    value?: (req: express.Request) => string;
    cookie?: csurf.CookieOptions | boolean;
    ignoreMethods?: string[];
    sessionKey?: string;
}
declare type LogLevel = "emergency" | "alert" | "critical" | "error" | "warning" | "notice" | "info" | "debug";
interface Options {
    port?: number;
    secret?: string;
    public?: string;
    views?: string;
    engine?: string;
    env?: string;
    favicon?: string;
    parser?: {
        json?: bodyParser.OptionsJson;
        body?: bodyParser.OptionsUrlencoded;
        text?: bodyParser.OptionsText;
        data?: DataParserOptions;
        cookie?: express.CookieOptions;
    };
    session?: session.SessionOptions;
    security?: false | (helmet.IHelmetConfiguration & {
        csurf?: false | CsurfOptions;
    });
    log?: LogLevel | {
        level: LogLevel;
        report: (content: string, type: LogLevel) => void;
    };
}
declare type Send = any;
export interface Context {
    options: Options;
    data: Send;
    params: {
        [key: string]: string;
    };
    query: {
        [key: string]: string | string[];
    };
    session: object;
    headers: {
        [key: string]: string;
    };
    cookie: {
        [key: string]: string;
    };
    files: formidable.Files;
    ip: string;
    ips?: string[];
    url: string;
    method: string;
    path: string;
    secure: boolean;
    xhr: boolean;
    error: Error;
    req: express.Request;
    res: express.Response;
}
declare type BasicType = string | any[] | object | number;
declare class Reply {
    cookie(name: string, value: string, opts?: express.CookieOptions): Reply;
    download(path: string, filename?: string): Reply;
    header(field: string, value?: string): Reply;
    json(data?: Send): Reply;
    jsonp(data?: Send): Reply;
    redirect(path: string): Reply;
    redirect(status: number, path: string): Reply;
    render(view: string, locals?: object): Reply;
    send(body?: Send): Reply;
    status(code: number): Reply;
    type(type: string): Reply;
}
declare type Middleware = (ctx: Context) => Reply | BasicType | void;
declare type Middlewares = Array<Middleware | Middleware[]>;
declare namespace server {
    namespace reply {
        const cookie: Reply["cookie"];
        const download: Reply["download"];
        const header: Reply["header"];
        const json: Reply["json"];
        const jsonp: Reply["jsonp"];
        const redirect: Reply["redirect"];
        const render: Reply["render"];
        const send: Reply["send"];
        const status: Reply["status"];
        const type: Reply["type"];
    }
    namespace router {
        function get(path: string, middlewares: Middleware | Middlewares, ...all: Middlewares): (ctx: Context) => Promise<void>;
        function post(path: string, middlewares: Middleware | Middlewares, ...all: Middlewares): (ctx: Context) => Promise<void>;
        function put(path: string, middlewares: Middleware | Middlewares, ...all: Middlewares): (ctx: Context) => Promise<void>;
        function del(path: string, middlewares: Middleware | Middlewares, ...all: Middlewares): (ctx: Context) => Promise<void>;
        function error(name: string, middlewares: Middleware | Middlewares, ...all: Middlewares): (ctx: Context) => Promise<void>;
        function sub(subdomain: string, middlewares: Middleware | Middlewares, ...all: Middlewares): (ctx: Context) => Promise<void>;
        function socket(name: string, middlewares: Middleware | Middlewares, ...all: Middlewares): (ctx: Context) => Promise<void>;
    }
}
declare function server(options: Options, ...middlewares: Middlewares): void;
declare function server(...middlewares: Middlewares): void;
export default server;
//# sourceMappingURL=server.types.d.ts.map