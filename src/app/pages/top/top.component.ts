import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioReaderComponent } from 'src/app/components/audio-reader/audio-reader.component';

@Component({
  selector: 'app-top',
  standalone: true,
  imports: [CommonModule, AudioReaderComponent],
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
})
export class TopComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
