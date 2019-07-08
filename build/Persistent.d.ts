import "reflect-metadata";
import { IPersistentPlugin } from "./plugin/IPersistentPlugin";
/**
 * Persistent options
 */
export interface IPersistentOptions {
    plugin: IPersistentPlugin;
    path: string;
}
/**
 * This decorator permits to tell the lib to save and load your class.
 * @param options Persistent option, with theses options you can choose your saver, loader and the path to the file
 */
export declare function Persistent(options?: IPersistentOptions): <T extends new (...args: any[]) => {}>(target: T) => any;
