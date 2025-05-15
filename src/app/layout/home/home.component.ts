import { Component } from '@angular/core';
import { HeaderComponent } from '../../pages/header/header.component';
import { GreetingComponent } from '../../pages/greeting/greeting.component';
import { ExperienceComponent } from '../../pages/experience/experience.component';
import { ProjectsComponent } from '../../pages/projects/projects.component';
import { SkillsComponent } from '../../pages/skills/skills.component';
import { FooterComponent } from '../../pages/footer/footer.component';
import { ContactComponent } from '../../pages/contact/contact.component';
import { SessionService } from '../../shared/session.service';
import { UIResourceENG } from '../../shared/lang/eng';
import { UIResourceVN } from '../../shared/lang/vn';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    GreetingComponent,
    ExperienceComponent,
    ProjectsComponent,
    SkillsComponent,
    FooterComponent,
    ContactComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  lang: string = 'ENG';
  UIResource: any;

  constructor(private sessionService: SessionService) {
    const langCurrent = sessionService.getItem('lang');
    if (langCurrent) {
      this.lang = langCurrent;
    } else {
      sessionService.setItem('lang', this.lang);
    }
    this.UIResource = langCurrent === 'ENG' ? UIResourceENG : UIResourceVN;
  }

  handleLangChange(event: string) {
    this.lang = event;
  }
}
