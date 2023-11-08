import { ResponseType } from "../../lib/types/ResponseTypes";

export const mapEsLintData = (data: any, format: ResponseType) => {
    const ESLintString: string = data.formatted;
    const tokens: string [] = ESLintString.split('= ');
    const ESLintJSON = tokens[1].replace(';','');
    return format === ResponseType.JSON ? JSON.parse(ESLintJSON) : ESLintJSON ;

}