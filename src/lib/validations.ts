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
			error: `La palabra debe comenzar con "${lastWord.at(-1)?.toUpperCase()}".`,
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
