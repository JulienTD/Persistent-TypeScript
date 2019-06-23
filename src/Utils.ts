export class Utils {

    public static getClassName(instance): string {
        return instance.constructor ? instance.constructor.name : null;
    }

};