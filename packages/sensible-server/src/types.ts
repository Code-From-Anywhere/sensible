import { Context } from "./server";
import { Endpoint } from "sensible-core";
import * as TJS from "typescript-json-schema";

export type WithDataValues<TModel> = TModel & { dataValues: TModel };

export type ServerEndpoint<TEndpoint extends Endpoint> = (
  ctx: Context & { body: TEndpoint["body"] }
) => Promise<TEndpoint["response"]>;

export type RootModel = "root";
export type AllEndpointsModel = "AllEndpoints";
export type Path = string;
export type FolderPath = { relativeFolder: string | undefined; path: Path };

export type InterpretableTypes = {
  [key in RootModel | string]: {
    endpoints: Path[];
    types: Path[];
    examples: Path[];
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
    examples: (EndpointExample | TypeExample)[];
  };
};
