import { NextFunction, Request, Response } from 'express';
import { RoutingController } from '../../lib/RoutingController';
import { ConversionService } from '../services/ConversionService';
import { ResponseType } from '../../lib/types/ResponseTypes';

export default class ConversionController extends RoutingController {

    private conversionService: ConversionService = new ConversionService();
    

    initRoutes(): void {

        this.router.post('/convert', this.convert.bind(this));
    }

    public async convert(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const format: ResponseType = (req.headers.accept === '*/*') ? ResponseType.JSON : req.headers.accept as ResponseType ;
            console.log('format', format);
            const ESLintJSON = await this.conversionService.convertTS2ESLint(req.body, format);
            return res.status(200).send({ result: 'success', ESLintJSON });
        } catch (error) {
            next(error);
        }
    }

}
