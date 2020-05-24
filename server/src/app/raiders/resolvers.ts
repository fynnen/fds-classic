import { IResolvers } from 'apollo-server-express';
import { IContext } from '../..';
import { QueryResult } from 'pg';

enum ClassEnum {
  Rogue = 'Rogue',
  Warrior = 'Warrior',
  Druid = 'Druid',
  Mage = 'Mage',
  Priest = 'Priest',
  Paladin = 'Paladin',
  Shaman = 'Shaman',
  Warlock = 'Warlock',
  Hunter = 'Hunter',
}

interface Class {
  name: string;
}

interface RaiderDto {
  Id: string;
  Name: string;
  DKP: number;
  RClass: string;
}

interface Raider {
  id: string;
  name: string;
  totalCS: number;
  class: ClassEnum;
}

interface CSLogDto {
  Id: string;
  RaiderId: string;
  Dkp: number;
  Reason: string;
  Date: Date;
  IsAdjustment: boolean;
}

interface CSLog {
  id: string;
  raiderId: string;
  CS: number;
  reason: string;
  date: Date;
  isAdjustment: boolean;
}

const mapRaider = (value: RaiderDto): Raider => {
  return {
    id: value.Id,
    name: value.Name,
    totalCS: value.DKP,
    class: ClassEnum[value.RClass as keyof typeof ClassEnum],
  }
};
const mapCSLog = (value: CSLogDto): CSLog => {
  return {
    id: value.Id,
    raiderId: value.RaiderId,
    CS: value.Dkp,
    reason: value.Reason,
    date: value.Date,
    isAdjustment: value.IsAdjustment,
  };
}

const getRaider = async (_: unknown, {id}: {id: string}, context: IContext): Promise<Raider | undefined> => {
  var result = (await context.pool.query('SELECT * FROM "Raiders" WHERE "Id" = $1 limit 1', [id])) as QueryResult<RaiderDto>;
  if(result.rowCount > 0) return mapRaider(result.rows[0]);
  return undefined;
}

const getRaiders = async (_:unknown, __: unknown, context: IContext): Promise<Raider[]> => {
  var result = (await context.pool.query('SELECT * FROM "Raiders" where "Deleted" is FALSE')) as QueryResult<RaiderDto>;
  return result.rows.map(x => mapRaider(x));
}

const getLogsByRaiderId = async (_: unknown, {raiderId} : {raiderId:string}, context: IContext): Promise<CSLog[]> => {
  var result = (await context.pool.query('SELECT * FROM "DKPLogs" WHERE "RaiderId" = $1', [raiderId])) as QueryResult<CSLogDto>;
  return result.rows.map(x => mapCSLog(x));
} 

const getRaiderFromLog = async (parent: CSLog, _: unknown, context: IContext): Promise<Raider | undefined> => {
  var result = (await context.pool.query('SELECT * FROM "Raiders" WHERE "Id" = $1 limit 1', [parent.raiderId])) as QueryResult<RaiderDto>;
  if(result.rowCount > 0) return mapRaider(result.rows[0]);
  return undefined;
}

const getLogsFromRaider = async (parent: Raider, _:unknown, context: IContext): Promise<CSLog[]> => {
  var result = (await context.pool.query('SELECT * FROM "DKPLogs" WHERE "RaiderId" = $1', [parent.id])) as QueryResult<CSLogDto>;
  return result.rows.map(x => mapCSLog(x));
}

const getClassFromRaider = (parent: Raider): Class => {
  return {
    name: parent.class,
  };
}

const getUTCDate = (parent: CSLog): string => {
  return parent.date.toUTCString();
}

export const raiderResolver: IResolvers = {
  Raider: {
    class: getClassFromRaider,
    logs: getLogsFromRaider,
  },
  CSLog: {
    raider: getRaiderFromLog,
    date: getUTCDate,
  },
  Query: {
    raiders: getRaiders,
    raider: getRaider,
    logs: getLogsByRaiderId,
  },
};
