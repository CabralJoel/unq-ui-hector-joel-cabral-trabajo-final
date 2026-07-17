import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function normalizeWord(word: string) {
	return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function calculateScore(words:string[]) {
	return words.reduce((total, usedWord) => total + usedWord.length, 0)
}