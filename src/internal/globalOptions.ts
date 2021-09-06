export type I18nProcessMethod = 'interceptor' | 'middleware';

export interface I18nGlobalOptions {
	/**
	 * @default 'interceptor'
	 */
	method: I18nProcessMethod
}

export const globalOptions: I18nGlobalOptions = {
	method: 'interceptor'
}

export function setI18nGlobalOptions(options: I18nGlobalOptions) {
  Object.assign(globalOptions, options)
}
