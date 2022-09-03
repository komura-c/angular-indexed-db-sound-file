import { Injectable } from '@angular/core';
import Dexie, { liveQuery, Table } from 'dexie';

export interface AudioFileItem {
  id?: number;
  file: File;
  objectURL?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AudioFileDbService extends Dexie {
  audioFile$ = liveQuery(() => this.audioFiles.toArray());
  private audioFiles!: Table<AudioFileItem, number>;

  constructor() {
    super('AudioFileDB');
    this.version(1).stores({
      audioFiles: '++id',
    });
  }

  async addRecord(file: File): Promise<number> {
    return await this.audioFiles.add({
      file,
    });
  }

  async deleteRecord(id: number) {
    return await this.audioFiles.delete(id);
  }
}
