import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIResourceENG } from '../../shared/lang/eng';
import { UIResourceVN } from '../../shared/lang/vn';
import { UIResourceZH } from '../../shared/lang/zh';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit, OnChanges {
  @Input() lang: string = 'ENG';
  @Output() viewArchitecture = new EventEmitter<void>();

  UIResource: any = UIResourceENG;

  ngOnInit(): void {
    this.updateResource();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lang']) {
      this.updateResource();
    }
  }

  private updateResource(): void {
    switch (this.lang) {
      case 'ENG':
        this.UIResource = UIResourceENG;
        break;
      case 'ZH':
        this.UIResource = UIResourceZH;
        break;
      case 'VI':
      default:
        this.UIResource = UIResourceVN;
        break;
    }
  }

  onViewArchitecture(): void {
    this.viewArchitecture.emit();
  }

  openGithub(index: number): void {
    const urls = [
      'https://github.com/leevantuan',
      'https://github.com/leevantuan',
      'https://github.com/leevantuan',
    ];
    window.open(urls[index] || 'https://github.com/leevantuan', '_blank');
  }
}
