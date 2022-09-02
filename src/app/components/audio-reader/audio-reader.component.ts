import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-audio-reader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audio-reader.component.html',
  styleUrls: ['./audio-reader.component.scss'],
})
export class AudioReaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
