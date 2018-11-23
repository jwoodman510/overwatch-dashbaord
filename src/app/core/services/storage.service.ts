import { Injectable } from '@angular/core';

import { LZStringService } from 'ng-lz-string';

@Injectable()
export class StorageService {
  constructor(private lz: LZStringService) {}

  get<T>(key: string): T | undefined {
    const value = localStorage.getItem(`ovw.${key}`);

    if (!value) {
      return undefined;
    }

    const decompressed = this.lz.decompress(value);

    return JSON.parse(decompressed) as T;
  }

  set<T>(key: string, value: T): void {
    const json = JSON.stringify(value);
    const compressed = this.lz.compress(json);
    localStorage.setItem(`ovw.${key}`, compressed);
  }
}
