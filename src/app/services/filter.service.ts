import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { FilterState } from '../interfaces/app.state';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private storageKey = 'filters';
  private storageInitialized = false;
  constructor(private storage: Storage) {}

  async loadFilters() {
    if (!this.storageInitialized) await this.storage.create();
    return this.storage.get(this.storageKey);
  }

  async clearFilters() {
    if (!this.storageInitialized) await this.storage.create();
    return this.storage.remove(this.storageKey);
  }

  async updateFilters({ filter, selected }: FilterState) {
    if (!this.storageInitialized) await this.storage.create();
    return this.storage.set(this.storageKey, { filter, selected });
  }
}
