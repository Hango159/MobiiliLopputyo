// Remove the spaces and the hidden characters that a keyboard can add
export function cleanEmail(email: string): string {
  return email.replace(/[\s\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g, '');
}

// Check that the email is complete, for example name@example.com
export function isEmail(email: string): boolean {
  return /^[\w%+-]+(\.[\w%+-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test(email);
}
