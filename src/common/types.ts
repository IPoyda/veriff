export type Check = {
    id: string,
    priority: number;
    description: string;
}

export type ResultCheck = Check & {
    positive?: boolean;
}

export type ListCheck = ResultCheck & {
    disabled: boolean;
    active: boolean;
}

export enum KeyCode {
    UP = 38,
    DOWN = 40,
    YES = 49,
    NO = 50
}
