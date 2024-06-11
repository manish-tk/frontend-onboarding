export default class StringsHelper {
    static split(str: string, separator: string = ','): string[] {
        return str.split(separator).map((item) => item.trim());
    }
}
