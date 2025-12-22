'use client'

export function setLocalStorageItem<T>(key: string, value: unknown) {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch (error) {
		console.log(error);
	}
}

export function getLocalStorageItem<T>(key: string): unknown | null {
	try {
		const item = localStorage.getItem(key);
		console.log(key, "getLocalStorageItem");
		return item ? JSON.parse(item) : undefined;
	} catch (error) {
		console.log(error);
	}
}