import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalNetworkComponent } from '../global-network/global-network.component';
import { UIResourceENG } from '../../shared/lang/eng';
import { UIResourceVN } from '../../shared/lang/vn';
import { UIResourceZH } from '../../shared/lang/zh';

@Component({
  selector: 'app-greeting',
  standalone: true,
  imports: [CommonModule, GlobalNetworkComponent],
  templateUrl: './greeting.component.html',
  styleUrl: './greeting.component.css',
})
export class GreetingComponent implements OnInit, OnChanges {
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

  openResume(): void {
    window.open(
      'https://static.topcv.vn/topcv-cv-uploads/79561995b822783d9e4198be1c9a7a18.pdf#toolbar=0&navpanes=0&scrollbar=0',
      '_blank'
    );
  }
}
