import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-infrastructure-hud',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './infrastructure-hud.component.html',
  styleUrl: './infrastructure-hud.component.css'
})
export class InfrastructureHudComponent {
  @Input() lang: string = 'ENG';
  
  isMinimized: boolean = false;

  toggleMinimize(): void {
    this.isMinimized = !this.isMinimized;
  }
}
