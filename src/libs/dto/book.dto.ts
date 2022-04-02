

export class CreateBookDto {
    readonly id: number;
    readonly title: string;
    readonly description: string;
    readonly pageCount: number;
    readonly excerpt: string;
    readonly publishDate: Date;
}