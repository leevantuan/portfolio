import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIResourceENG } from '../../shared/lang/eng';
import { UIResourceVN } from '../../shared/lang/vn';
import { UIResourceZH } from '../../shared/lang/zh';

@Component({
  selector: 'app-diagram-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './diagram-viewer.component.html',
  styleUrl: './diagram-viewer.component.css',
})
export class DiagramViewerComponent implements OnInit, OnChanges {
  @Input() isOpen: boolean = false;
  @Input() lang: string = 'VI';
  @Output() close = new EventEmitter<void>();

  activeTab: 'network' | 'system' = 'network';
  activeTimeFilter: 'live' | '1h' | '6h' | '24h' | '7d' = 'live';

  UIResource: any = UIResourceVN;

  ngOnInit(): void {
    this.updateResource();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lang']) {
      this.updateResource();
    }
  }

  setTab(tab: 'network' | 'system'): void {
    this.activeTab = tab;
  }

  setTimeFilter(filter: 'live' | '1h' | '6h' | '24h' | '7d'): void {
    this.activeTimeFilter = filter;
  }

  @HostListener('document:keydown.escape')
  onKeydownHandler() {
    if (this.isOpen) {
      this.closeModal();
    }
  }

  closeModal(): void {
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    this.closeModal();
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
}
