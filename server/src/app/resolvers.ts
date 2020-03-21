import { IResolvers } from "apollo-server-express";
import { raiderResolver } from "./raiders/resolvers";

export const resolverMaps: IResolvers[] = [raiderResolver];