export const GenerateUid = len => {
	const buf = [],
		chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
		charlen = chars.length,
		length = len || 32;
			
	for (let i = 0; i < length; i++) {
		buf[i] = chars.charAt(Math.floor(Math.random() * charlen));
	}
	return buf.join('');
}