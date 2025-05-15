import { Component } from '@angular/core';

@Component({
  selector: 'app-education',
  imports: [],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css',
})
export class EducationComponent {
  public UIResource = {
    edu: 'Education',
    skills: [
      `ASP.Net Core 8`,
      `Clean Architecture`,
      `Postgresql`,
      `Redis`,
      `RabbitMQ`,
      `SignalR`,
      `Ubuntu`,
      `Docker`,
      `CI / CD`,
    ],
    description: ` Built a scalable backend with ASP.NET Core Web API using Clean Architecture and multi-tenant PostgreSQL. Integrated Redis caching, SignalR for real-time chat/booking, JWT authentication, Docker deployment on Ubuntu, and CI/CD pipelines for automated workflows.`,
    nameProject: ' Badminton System Manager ',
  };
}
