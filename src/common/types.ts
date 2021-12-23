export interface ICheck {
    id: string,
    priority: number;
    description: string;
}

export interface IResultCheck extends ICheck {
    positive?: boolean;
}
