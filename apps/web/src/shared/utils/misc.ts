interface NullObject {
  valueOf(): null
}

export const isVoid = (variable: unknown): variable is null | undefined | void | never | NullObject => 
  typeof variable === 'undefined' || (typeof variable === 'object' && (variable === null || variable.valueOf() === null));

export const isNotVoid = <T>(
  variable: T | null | undefined | void | never | NullObject,
): variable is T => !isVoid(variable)

export const isEmptyObject = (variable: unknown): variable is { [key: string]: never } | NullObject => 
  typeof variable === 'object' &&
  variable !== null &&
  ((variable.constructor.prototype === Object.prototype && Object.getOwnPropertyNames(variable).length === 0) || 
    variable.valueOf() === null)

export const isEmptyArray = (variable: unknown) => Array.isArray(variable) && variable.length === 0;

export const isEmptyString = (variable: unknown) => typeof variable === 'string' && variable === '';

export const isEmpty = (variable: unknown): variable is null | undefined | void | '' | never | never[] | {[key: string]: never} =>
  isVoid(variable) || isEmptyString(variable) || isEmptyArray(variable) || isEmptyObject(variable);

export const isNotEmpty = (variable: unknown) => !isEmpty(variable);