export interface Provider {
    search(q: string, tags?: string, thumbsize?: string | 'all'): any;
}