/**
 * Handles the conversion from and to the local storage
 *
 * @author      LBeukennoot for Seedle
 * @created     07-05-2025
 */
export default class LocalStorage {
  /**
   *
   * @param name {string} How the value will be stored in the local storage
   * @param value {any} What you want to save in the local storage
   */
  setValue(name: string, value: any) {
    localStorage.setItem(name, JSON.stringify(value));
    // localStorage.setItem(name, JSON.stringify(value).replace('"', " ").replace('"', " "))
  }

  /**
   *
   * @param name {string} The name of the value, previously set via `setValue()`
   * @returns The value which was stored in the local storage
   */
  // getValue(name: string): string | undefined {
  //     //TODO error handling -> try {} catch() {}
  //     return localStorage.getItem(name)?.toString()
  // }

  getValue<T>(name: string): T | undefined {
    const value = localStorage.getItem(name);
    if (value) {
      try {
        // JSON.parse returns 'any', so we cast it to T
        return JSON.parse(value) as T;
      } catch (error) {
        console.error(error);
        return undefined; // Ensure a value is always returned if catch hits
      }
    }
    return undefined;
  }
}
