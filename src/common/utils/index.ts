export function exclude<T, Key extends keyof T>(target: T, keys: Key[]): Omit<T, Key> {
  return Object.fromEntries(
    Object.entries(target as Record<string, unknown>).filter(([key]) => !keys.includes(key as Key)),
  ) as Omit<T, Key>;
}
