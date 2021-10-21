
export interface basicProfile {
    id: number;
    userName: string;
}

export interface PageParams {
    page: number,
    size: number
}

export interface Page<T> {
    content: T,
    totalElements: number,
    pageable: any,
    empty: Boolean
}