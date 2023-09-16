import { Literal } from 'sequelize/types/utils';

export interface WhereClause {
  type?: string;
  title?: Literal;
  '$products.title$'?: Literal;
}
