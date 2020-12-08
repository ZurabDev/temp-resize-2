/**
 * */
export interface IConfig {
    medium: number;
    large: number;
}

/**
 * */
export interface ResizeConfigInterface {
    config: IConfig,
    debounce: number
}