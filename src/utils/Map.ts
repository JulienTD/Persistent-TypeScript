export class Map {
    private map: any;
    private mapSize: number;

    public constructor() {
        this.map = {};
        this.mapSize = 0;
    }

    /**
     *  Puts a key and its value in the map
     * @param {string} key
     * @param {any} value
     */
    public put(key: string, value: any): boolean {
        if (!this.containsKey(key)) {
            this.mapSize++;
        }
        this.map[key] = value;
        return true;
    }

    /**
     *  Clears the map
     */
    public clear(): boolean {
        this.mapSize = 0;
        this.map = {};
        return true;
    }

    /**
     *  Returns an array of all the keys stored in the map
     */
    public keys(): any[] {
        let keys = [];

        for (let key in this.map) {
            if (this.map.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        return keys;
    }

    /**
     *  Returns an array of all the values stored in the map
     */
    public values(): any[] {
        let values = [];

        for (let key in this.map) {
            if (this.map.hasOwnProperty(key)) {
                values.push(this.map[key]);
            }
        }
        return values;
    }

    /**
     *  Checks if the map is empty or not
     */
    public isEmpty(): boolean {
        return this.mapSize === 0;
    }

    /**
     *  Removes a key and its value from the map
     * @param {string} key
     * @return returns the stored value if not it returns null
     */
    public removeKey(key: string): any {
        if (this.containsKey(key)) {
            this.mapSize--;
            let value = this.map[key];
            delete this.map[key];
            return value;
        }
        return null;
    }

    /**
     *  Checks if the map is containing the specified key
     * @param {string} key
     */
    public containsKey(key: string): boolean {
        return this.map.hasOwnProperty(key);
    }

    /**
     *  Checks if the map is containing the specified value
     * @param {any} value
     */
    public containsValue(value: any): boolean {
        for (let key in this.map) {
            if (this.map.hasOwnProperty(key)) {
                if (this.map[key] === value) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     *  Returns the size of the map
     */
    public size(): number {
        return this.mapSize;
    }

    /**
     *  Returns the value associated to the specified key
     * @param {string} key
     * @return returns the value associated if not it returns null
     */
    public getValue(key: string): any {
        if (this.containsKey(key)) {
            return this.map[key];
        }
        return null;
    }

    /**
     *  Saves the map to json
     */
    public toJson(): string {
        return JSON.stringify(this.map);
    }

    /**
     *  Creates an map from its serialization
     * @param data serialized map
     */
    public static fromJson(serializedHm: string): Map {
        let hm: Map = new Map();
        let rawObject = JSON.parse(serializedHm);

        if (rawObject == null)
            return null;
        for (let key in rawObject) {
            hm.put(key, rawObject[key]);
        }
        return hm;
    }
}
