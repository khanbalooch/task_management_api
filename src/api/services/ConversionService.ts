import { convertTSLintConfig } from "tslint-to-eslint-config";
import * as fs from 'fs';
import path from "path";
import { CustomError } from "../../lib";
import { mapEsLintData } from '../../utils/mappers/ESLintMapper';
import { ResponseType } from "../../lib/types/ResponseTypes";

const TSLintConfigFilePath = path.join(__dirname, '../../../tslint.json');
const ESLintConfigFilePath = path.join(__dirname, '../../../eslintrc.json');

export class ConversionService {

    constructor(){}

    public async convertTS2ESLint(tsLintConfig: any, format: ResponseType = ResponseType.JSON): Promise<any> {
        console.log('ES2TS');
        try {
            const updateStatus = await this.updateTsLintConfigFile(tsLintConfig); 
              try {
                const result: any = await convertTSLintConfig({
                    config: ESLintConfigFilePath,
                    // eslint: "./path/to/input/eslintrc.js",
                    // package: "./path/to/package.json", 
                    prettier: true, // Prettier: highly recommended!
                    tslint: TSLintConfigFilePath
                    // typescript: "./path/to/tsconfig.json", 
                });
                return mapEsLintData(result.data, format );
              } catch (error) {
                console.log(error);
                throw new CustomError('An error occured', 400);
              }
        } catch (error) {
            console.log(error);
            throw new CustomError('An error occured', 400);
        }
    }

    private updateTsLintConfigFile(tslintConfig: any): Promise<boolean> {
        return new Promise( (resolve, reject) => {
            fs.writeFile(TSLintConfigFilePath, JSON.stringify(tslintConfig), 'utf8', (err) => {
                if(err) {
                    reject(err)
                }else {
                    resolve(true);
                }
            });
        });
    }
}