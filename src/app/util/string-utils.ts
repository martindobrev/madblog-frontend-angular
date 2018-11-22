export class StringUtils {

    static countWords(str: string): number {
        return str.trim().split(/\s+/).length;
    }

    static countMinutesToRead(str: string): number {
        return Math.ceil(this.countWords(str) / 200);
    }
}