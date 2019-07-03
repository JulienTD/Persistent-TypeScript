export class Utils {

    /**
     * Retrieves the class name from a class instance
     * @param instance class instance
     */
    public static getClassName(instance: object): string {
        return instance.constructor ? instance.constructor.name : null;
    }

};