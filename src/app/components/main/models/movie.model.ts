export interface Movie{
    [x: string]: any;
    id?: number,
    title: string,
    summary: string,
    image: string,
    director: string,
    country: string,
    year: number,
    duration: number,
    genre: string
}