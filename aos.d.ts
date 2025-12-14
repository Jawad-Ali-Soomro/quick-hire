declare module 'aos' {
  export interface AosOptions {
    duration?: number;
    easing?: string;
    once?: boolean;
    offset?: number;
    delay?: number;
  }

  export default class AOS {
    static init(options?: AosOptions): void;
    static refresh(): void;
    static refreshHard(): void;
  }
}

