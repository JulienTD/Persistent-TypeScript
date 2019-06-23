export interface IPersistentDeserializer {
    deserialize: (serializedObject: string) => object;
};
