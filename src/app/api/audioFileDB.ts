import Dexie, { Table } from 'dexie';

export interface AudioFileItem {
  id?: number;
  name?: string;
  arrayBuffer?: ArrayBuffer;
}

export class AudioFileDB extends Dexie {
  audioFiles!: Table<AudioFileItem, number>;

  constructor() {
    super("AudioFileDB");
    this.version(1).stores({
      audioFiles: "++id,name,age"
    });
  }
}
