export interface Link {
  label: string;
  url: string;
}

export interface PublicConstantsType {
  appName: string;
  email: string;
  /**
   * can probably remove this and declare this in the homepage of package.json of the actual frontend
   */
  domain: string;
  links?: Link[];
}

export type Endpoint = {
  /**
   * api path to endpoint (can contain '/')
   */
  path: string;
  /**
   * SOCKET and SUB aren't supported yet
   */
  method: "GET" | "POST" | "DELETE" | "SOCKET" | "SUB";
  body: object;
  response: object;
};

export type API<TAllEndpoints extends unknown> = <
  TEndpoint extends keyof TAllEndpoints
>(
  endpoint: TEndpoint,
  method: TAllEndpoints[TEndpoint] extends Endpoint
    ? TAllEndpoints[TEndpoint]["method"]
    : never,
  body?: TAllEndpoints[TEndpoint] extends Endpoint
    ? TAllEndpoints[TEndpoint]["body"]
    : never,
  options?: {
    isExternal?: boolean;
  }
) => Promise<
  TAllEndpoints[TEndpoint] extends Endpoint
    ? TAllEndpoints[TEndpoint]["response"]
    : never
>;

export interface DefaultResponse {
  success: boolean;
  response: string;
}

export interface DefaultModelType {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

//////////// Here the Sensible API types and all types related to that ///////////////

export type RootModel = "root";
export type AllEndpointsModel = "AllEndpoints";
export type Path = string;
export type FolderPath = { relativeFolder: string | undefined; path: Path };

export type InterpretableTypes = {
  [key in RootModel | string]: {
    endpoints: Path[];
    types: Path[];
    endpointExamples: Path[];
    typeExamples: Path[];
  };
};

export type Method = "GET" | "POST";

export type EndpointExample = {
  type: "endpoint";
  path: `${Method}:${string}`;
  id: number;
  body: object;
  response: object;
};

export type TypeExample = {
  type: "type";
  typeInterfaceName: string;
  value: any;
};

export type DefinitionObject = {
  [key: string]: TJS.DefinitionOrBoolean;
};

export type ModelSchemaObject = {
  [key: string | RootModel]: {
    endpoints?: DefinitionObject;
    types?: DefinitionObject;
    typeExamples: TypeExample[];
    endpointExamples: EndpointExample[];
  };
};
export interface DocsEndpoint extends Endpoint {
  method: "GET";
  body: {};
  response:
    | { response: string; success: false }
    | {
        constants: PublicConstantsType;
        apps: App[];
        md: Md[];
        success: true;
      };
}

export interface Cron {
  interval: string;
  comment: string;
}

export interface App {
  folder: string;
  private: boolean;
  name?: string;
  version?: string;
  description?: string;
  dependencies: Dependency[];
  devDependencies: Dependency[];
  peerDependencies: Dependency[];
  repo?: string;
  homepage?: string;
  md: Md[];
  /**
   * only available for servers
   */
  crons?: Cron[];
  /**
   * only available for sensible-core-*
   */
  models?: ModelSchemaObject;
  /**
   * only available for sensible-ui-* or other react frontends
   */
  frontend?: FrontendFile[];
}

export interface Dependency {
  name: string;
  private: boolean;
  version: string;
  latestVersion: string;
  description?: string;
  md: Md[];
  repo?: string;
  homepage?: string;
}
export type UnixTimestamp = number;

export type MarkdownContent = string;

export interface Md {
  fileName: string;
  params: {
    title?: string;
    author?: string;
  } & {
    [key: string]: string;
  };
  createdAt: UnixTimestamp;
  updatedAt: UnixTimestamp;
  modifiedAt: UnixTimestamp;
  openedAt: UnixTimestamp;
  content: MarkdownContent;
}

export type FileOrFolder = string;

/**
 * should be typed based on which interpreter we use
 */
export type Interface = any;

export type Parameter = {
  variable: string;
  type: Interface;
};

export interface FrontendExport {
  name: string;
  params?: Parameter[];
  interface?: Interface;
  return: Interface;
  description?: string;
  annotations: {
    [key: string]: any;
  };
}

export interface FrontendFile {
  fileName: string;
  isFolder: boolean;
  folderContent: FrontendFile[];
  defaultExport?: FrontendExport;
  otherExports: FrontendExport[];
}

export type PackageInfoObject = {
  [key: string]: string;
};

export type ProjectType =
  | "next"
  | "react-native"
  | "react"
  | "express"
  | "server"
  | "unknown";

export type PackageInfo = {
  path: string;
  name?: string;
  description?: string;
  type: ProjectType;
  version?: string;
  private?: boolean;
  author?: string | { [key: string]: string };
  repository: string | { [key: string]: string };
  homepage?: string;
  dependencies?: PackageInfoObject;
  devDependencies?: PackageInfoObject;
  peerDependencies?: PackageInfoObject;
};

export interface RecentEndpoint extends Endpoint {
  method: "GET";
  body: {};
  response: {
    success: boolean;
    response: string;
    recent?: (Endpoint & {
      endpoint: string;
    })[];
  };
}

export interface DefaultEndpoints {
  "sensible/docs": DocsEndpoint;
  "sensible/recent": RecentEndpoint;
}

export interface AllEndpoints extends DefaultEndpoints {}
