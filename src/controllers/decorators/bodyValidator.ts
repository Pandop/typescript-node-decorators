import 'reflect-metadata';

import { MetadataKeys } from './MetadataKeys';

export function bodyValidator(...keys: string[]) {
	return (target: any, key: string | symbol, desc: PropertyDescriptor) => {
		// store validator keys in metadata
		Reflect.defineMetadata(MetadataKeys.VALIDATOR, keys, target, key);
	}
}