import { Request, Response, NextFunction } from 'express';
import { validateObject } from '../../utils';
import { CustomError } from '../../lib';
import * as short_uuid from 'short-uuid';
import { ValidatorOptions } from 'class-validator';

export const validateBody = (type: any, options?: ValidatorOptions): any => {
    return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const { errors } = await validateObject(type, req.body, options);
        if (errors.length) {
            let errorMessage = '';
            errors.forEach( (error: any) => {
                Object.values(error.constraints).forEach( errMessage => {
                    errorMessage +=  errMessage + ', ';
                });
            });
            const error = new CustomError(errorMessage, 506);
            next(error);
        }
        next();
    }
};
