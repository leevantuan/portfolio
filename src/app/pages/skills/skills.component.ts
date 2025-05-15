import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SessionService } from '../../shared/session.service';
import { UIResourceENG } from '../../shared/lang/eng';
import { UIResourceVN } from '../../shared/lang/vn';

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
})
export class SkillsComponent {
  @Input() lang: string = 'ENG';

  UIResource: any;

  ngOnChanges(): void {
    this.UIResource = this.lang === 'VN' ? UIResourceVN : UIResourceENG;
  }

  techStack = [
    {
      name: 'C#',
      icon: 'https://res.cloudinary.com/dgzupk0ec/image/upload/v1747303324/c-sharp_6132221_hnqrrh.png',
    },
    {
      name: 'TypeScript',
      icon: 'https://res.cloudinary.com/dgzupk0ec/image/upload/v1747303357/typescript_5968381_yaiajv.png',
    },
    {
      name: 'JavaScript',
      icon: 'https://res.cloudinary.com/dgzupk0ec/image/upload/v1747303357/js_5968292_khyb44.png',
    },
    {
      name: 'Angular',
      icon: 'https://res.cloudinary.com/dgzupk0ec/image/upload/v1747303323/4373284_angular_logo_logos_icon_qrqlam.png',
    },
    {
      name: 'React',
      icon: 'https://res.cloudinary.com/dgzupk0ec/image/upload/v1747303323/7423888_react_react_native_icon_rpebsm.png',
    },
    {
      name: 'Bootstrap',
      icon: 'https://res.cloudinary.com/dgzupk0ec/image/upload/v1747317301/beta_9999362_sozjxi.png',
    },
    {
      name: 'Tailwind',
      icon: 'https://res.cloudinary.com/dgzupk0ec/image/upload/v1747303323/Tailwind_CSS_uxqsxm.png',
    },
    {
      name: 'SQL Server',
      icon: 'https://res.cloudinary.com/dgzupk0ec/image/upload/v1747303324/sql-server_5968364_pa89ch.png',
    },
    {
      name: 'Postgresql',
      icon: 'https://res.cloudinary.com/dgzupk0ec/image/upload/v1747303324/postgre_5968342_vub9zi.png',
    },
    {
      name: 'MongoDb',
      icon: 'https://res.cloudinary.com/dgzupk0ec/image/upload/v1747317468/MongoDB_svpwgd.png',
    },
    {
      name: 'Redis',
      icon: 'https://res.cloudinary.com/dgzupk0ec/image/upload/v1747303323/202809_redis_icon_lmifn9.png',
    },
    {
      name: 'RabbitMQ',
      icon: 'https://res.cloudinary.com/dgzupk0ec/image/upload/v1747303323/RabbitMQ_onupio.png',
    },
    {
      name: 'Jenkins',
      icon: 'https://res.cloudinary.com/dgzupk0ec/image/upload/v1747317611/Jenkins_ds1uuy.png',
    },
    {
      name: 'Docker',
      icon: 'https://res.cloudinary.com/dgzupk0ec/image/upload/v1747303323/docker_919853_e17ogl.png',
    },
    {
      name: 'Ubuntu',
      icon: 'https://res.cloudinary.com/dgzupk0ec/image/upload/v1747303324/ubuntu_888879_fxa9pv.png',
    },
  ];
}
