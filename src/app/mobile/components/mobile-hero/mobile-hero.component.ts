import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mobile-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mobile-hero.component.html',
  styleUrl: './mobile-hero.component.css'
})
export class MobileHeroComponent {
  @Input() lang: string = 'ENG';
  @Input() UIResource: any;
  @Output() viewArchitecture = new EventEmitter<void>();

  selectedNode: string | null = null;

  selectNode(node: string): void {
    this.selectedNode = this.selectedNode === node ? null : node;
  }

  onViewSpecs(): void {
    this.viewArchitecture.emit();
  }

  scrollToNext(): void {
    const el = document.getElementById('story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
