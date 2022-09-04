import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AudioFileDbService,
  AudioFileItem,
} from 'src/app/services/audio-file-db.service';
import { Subscription } from 'rxjs';
import { SafeUrlPipe } from 'src/app/pipes/safe-url.pipe';

@Component({
  selector: 'app-audio-reader',
  standalone: true,
  imports: [CommonModule, FormsModule, SafeUrlPipe],
  templateUrl: './audio-reader.component.html',
  styleUrls: ['./audio-reader.component.scss'],
})
export class AudioReaderComponent {
  audioFiles!: AudioFileItem[];

  file?: File;
  maxSaveFileCount = 1;

  audioLog = '';
  writeLog(log: string): void {
    this.audioLog += log + '\n';
  }

  isLoadAudioFile = false;

  subscription = new Subscription();

  constructor(private audioFileDbService: AudioFileDbService) {}

  ngOnInit(): void {
    const sub = this.audioFileDbService.audioFile$.subscribe((audioFiles) => {
      this.audioFiles = this.setObjectURL(audioFiles);
    });
    this.subscription.add(sub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private setObjectURL(audioFiles: AudioFileItem[]) {
    return audioFiles.map((audioFile) => {
      /* 初回 */
      if (!this.audioFiles) {
        audioFile.objectURL = window.URL.createObjectURL(audioFile.file);
        return audioFile;
      }
      /* 2回目以降 */
      const isOrgFound = this.audioFiles.find(
        (audioFileItem) => audioFileItem.id === audioFile.id
      );
      if (isOrgFound && isOrgFound.objectURL) {
        audioFile.objectURL = isOrgFound.objectURL;
      } else {
        audioFile.objectURL = window.URL.createObjectURL(audioFile.file);
      }
      return audioFile;
    });
  }

  async onChangeAudioFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const audioFile = target.files![0];
    this.file = audioFile;
  }

  async onAddAudioFiles() {
    if (this.file) {
      for (let i = 0; i < this.maxSaveFileCount; i++) {
        await this.addAudioFile(this.file);
      }
    } else {
      this.writeLog('error: ファイルが読み込めませんでした');
    }
  }

  private async addAudioFile(file: File) {
    try {
      const key = await this.audioFileDbService.addRecord(file);
      this.writeLog(`addAudioFiles: ${key}個目: 成功`);
    } catch (error) {
      this.writeLog(`error: ${error}`);
      throw error;
    }
  }

  async onDeleteAudioFiles() {
    const allKeys = this.audioFiles.map((audioFileItem) => audioFileItem.id);
    const keys = allKeys.filter((key) => key);
    for (let i = 0; i < keys.length; i++) {
      await this.deleteAudioFile(keys[i] as number);
    }
  }

  private async deleteAudioFile(id: number) {
    try {
      await this.audioFileDbService.deleteRecord(id);
      this.writeLog(`deleteAudioFile: ${id}個目: 成功`);
    } catch (error) {
      this.writeLog(`error: ${error}`);
      throw error;
    }
  }

  getTotalFileCount() {
    if (!this.audioFiles) {
      return 0;
    }
    return this.audioFiles.length;
  }

  getTotalFileSize() {
    if (!this.audioFiles) {
      return 0;
    }
    const totalFileSize = this.audioFiles.reduce(function (sum, element) {
      return sum + element.file.size;
    }, 0);
    return totalFileSize / 1000 / 1000 / 1000;
  }

  trackByItem(_: number, audioFile: AudioFileItem) {
    return audioFile.id;
  }
}
