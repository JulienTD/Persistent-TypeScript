export class Utils {

    /**
     * Retrieves the class name from a class instance
     * @param instance class instance
     */
    public static getClassName(instance: object): string | null {
        return instance.constructor ? instance.constructor.name : null;
    }

    /**
     * Checks if the library is running on the browser
     */
    public static isBrowser(): boolean {
        return typeof window !== 'undefined' && typeof window.document !== 'undefined';
    }
};