import { Request, Response } from 'express';
import * as _ from 'lodash';

export const success = function (data: any, totalRow?: number, metaData?: any, message?: string) {

  if (data.data) {
    totalRow = data.totalRows || totalRow;
    metaData = data.metaData ? data.metaData : metaData;
    data = data.data || data;
  };
  return { success: true, errorCode: 0, message: message || '', data: data, totalRow: totalRow || 0, metaData: metaData };
}


export const error = function (error?: {message: string, errorCode: number, metaData?: any}) {
  // const obj = _.find(err.err, {errorCode: errorCode});
  return { success: false, errorCode: error.errorCode || 500, message: error.message, data: null, totalRow: 0 , metaData: error.metaData};
};
