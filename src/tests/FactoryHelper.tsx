export default class FactoryHelper {
    static generateId(): string {
        return Math.floor(Math.random() * 1000).toString();
    }

    static generateString(): string {
        return Math.random().toString(36).substring(7);
    }
}
