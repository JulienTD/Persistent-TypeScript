export declare class Map {
    private map;
    private mapSize;
    constructor();
    /**
     *  Puts a key and its value in the map
     * @param {string} key
     * @param {any} value
     */
    put(key: string, value: any): boolean;
    /**
     *  Clears the map
     */
    clear(): boolean;
    /**
     *  Returns an array of all the keys stored in the map
     */
    keys(): any[];
    /**
     *  Returns an array of all the values stored in the map
     */
    values(): any[];
    /**
     *  Checks if the map is empty or not
     */
    isEmpty(): boolean;
    /**
     *  Removes a key and its value from the map
     * @param {string} key
     * @return returns the stored value if not it returns null
     */
    removeKey(key: string): any | null;
    /**
     *  Checks if the map is containing the specified key
     * @param {string} key
     */
    containsKey(key: string): boolean;
    /**
     *  Checks if the map is containing the specified value
     * @param {any} value
     */
    containsValue(value: any): boolean;
    /**
     *  Returns the size of the map
     */
    size(): number;
    /**
     *  Returns the value associated to the specified key
     * @param {string} key
     * @return returns the value associated if not it returns null
     */
    getValue(key: string): any | null;
    /**
     *  Saves the map to json
     */
    toJson(isMinified: boolean): string;
    /**
     *  Creates an map from its serialization
     * @param data serialized map
     */
    static fromJson(serializedHm: string): Map | null;
}
