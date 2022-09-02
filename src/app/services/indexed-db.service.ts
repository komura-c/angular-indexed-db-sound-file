import { Injectable } from '@angular/core';
import { AudioFileDB, AudioFileItem } from '../api/audioFileDB';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  db = new AudioFileDB();
  dbLog = '';

  add(file: File) {
    this.db
      .transaction('rw', this.db.audioFiles, async () => {
        const fileArrayBuffer = await file.arrayBuffer();
        const id = await this.db.audioFiles.add(<AudioFileItem>{
          name: file.name,
          arrayBuffer: fileArrayBuffer,
        });
        this.dbLog += `レコードID ${id} を追加しました`;
      })
      .catch((e: { stack: any }) => {
        alert(e.stack || e);
      });
  }

  private blobToArrayBuffer(blob: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener('loadend', (e) => {
        resolve(reader.result);
      });
      reader.addEventListener('error', reject);
      reader.readAsArrayBuffer(blob);
    });
  }

  private arrayBufferToBlob(buffer: BlobPart, type: string) {
    return new Blob([buffer], { type: type });
  }
}
