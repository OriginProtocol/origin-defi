/* eslint-disable @typescript-eslint/no-explicit-any */
import { Buffer } from 'buffer';

window.global = window.global ?? window;
window.Buffer = window.Buffer ?? Buffer;
window.process = window.process ?? ({ env: {} } as any);

export {};
