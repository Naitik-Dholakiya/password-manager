export function getPasswordStrength(password) {
  let score = 0;

  if (!password) return { label: "Weak", score: 0 };

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;

  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { label: "Weak", score: 1 };
  if (score === 3) return { label: "Medium", score: 2 };
  if (score === 4) return { label: "Strong", score: 3 };
  return { label: "Very Strong", score: 4 };
}
