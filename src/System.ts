export interface System {
    initialize(): void;
    run(timeSlice: number): void;
    name: string;
}
