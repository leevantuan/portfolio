import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIResourceENG } from '../../shared/lang/eng';
import { UIResourceVN } from '../../shared/lang/vn';
import { UIResourceZH } from '../../shared/lang/zh';

@Component({
  selector: 'app-my-story',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-story.component.html',
  styleUrl: './my-story.component.css'
})
export class MyStoryComponent implements OnInit, OnChanges {
  @Input() lang: string = 'ENG';
  @Input() UIResource: any;

  storyData: any;

  ngOnInit(): void {
    this.updateData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lang'] || changes['UIResource']) {
      this.updateData();
    }
  }

  private updateData(): void {
    if (this.UIResource && this.UIResource.my_story) {
      this.storyData = this.UIResource.my_story;
      return;
    }

    switch (this.lang) {
      case 'VI':
        this.storyData = UIResourceVN.my_story;
        break;
      case 'ZH':
        this.storyData = UIResourceZH.my_story;
        break;
      case 'ENG':
      default:
        this.storyData = UIResourceENG.my_story;
        break;
    }
  }
}
