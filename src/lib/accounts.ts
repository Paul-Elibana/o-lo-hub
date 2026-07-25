/**
 * Gestionnaire de Comptes Utilisateurs O'LO Hub Gabon
 * Authentification prioritaire par Numéro de Téléphone (Mobile Money) & Jeton Zammad
 */

export interface UserAccount {
  id: string;
  phone: string;
  fullName: string;
  email?: string;
  city?: string;
  zammadToken?: string;
  createdAt: string;
  lastLoginAt: string;
}

// In-memory store initialized with a sample Gabonese client account
const accountsStore: Map<string, UserAccount> = new Map();

const sampleAccount: UserAccount = {
  id: 'acc-1',
  phone: '077519644',
  fullName: 'Jean-Marc Nguema',
  email: 'jean.nguema@gmail.com',
  city: 'Libreville',
  zammadToken: 'tNuyYi9F5Mgv241SjJudOO9iBpJYkjDe7s0pCPLOOumrngGHDX1e7TU1RgAfwRzD',
  createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
  lastLoginAt: new Date().toISOString()
};

accountsStore.set(sampleAccount.phone.trim(), sampleAccount);

/**
 * Normalise un numéro de téléphone gabonais (ex: +241077519644 -> 077519644)
 */
export function normalizePhone(phone: string): string {
  let clean = phone.replace(/\s+/g, '').replace(/[^0-9+]/g, '');
  if (clean.startsWith('+241')) {
    clean = clean.substring(4);
  } else if (clean.startsWith('241') && clean.length > 8) {
    clean = clean.substring(3);
  }
  if (clean.length === 8 && !clean.startsWith('0')) {
    clean = '0' + clean;
  }
  return clean;
}

/**
 * Recherche un compte par numéro de téléphone
 */
export function getUserByPhone(phone: string): UserAccount | undefined {
  const cleanPhone = normalizePhone(phone);
  return accountsStore.get(cleanPhone);
}

/**
 * Authentifie ou crée automatiquement un compte utilisateur par numéro de téléphone
 */
export function loginOrRegisterByPhone(phone: string, fullName?: string, email?: string, city?: string): UserAccount {
  const cleanPhone = normalizePhone(phone);
  let user = accountsStore.get(cleanPhone);

  if (user) {
    user.lastLoginAt = new Date().toISOString();
    if (fullName && !user.fullName) user.fullName = fullName;
    if (email && !user.email) user.email = email;
    if (city && !user.city) user.city = city;
  } else {
    user = {
      id: `acc-${Date.now()}`,
      phone: cleanPhone,
      fullName: fullName || `Usager O'LO (${cleanPhone})`,
      email: email || `${cleanPhone}@olo-hub.ga`,
      city: city || 'Libreville',
      zammadToken: 'tNuyYi9F5Mgv241SjJudOO9iBpJYkjDe7s0pCPLOOumrngGHDX1e7TU1RgAfwRzD',
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString()
    };
    accountsStore.set(cleanPhone, user);
  }

  return user;
}

/**
 * Met à jour le jeton Zammad personnel d'un compte
 */
export function updateZammadToken(phone: string, token: string): UserAccount | undefined {
  const user = getUserByPhone(phone);
  if (user) {
    user.zammadToken = token.trim();
    accountsStore.set(user.phone, user);
  }
  return user;
}
