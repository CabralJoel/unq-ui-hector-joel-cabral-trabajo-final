type ValidationResult = {
	valid: boolean;
	error: string;
};

export function validateGameWord(
	word: string,
	words: string[],
): ValidationResult {
	const lastWord = words.at(-1);

	if (lastWord && word.at(0) !== lastWord.at(-1)) {
		return {
			valid: false,
			error: "La palabra no respeta la regla de encadenamiento",
		};
	}

	if (words.includes(word)) {
		return {
			valid: false,
			error: "La palabra ya fue utilizada",
		};
	}

	return { valid: true, error: "" };
}
