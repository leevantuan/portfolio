import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  SimpleChanges,
} from '@angular/core';
import { UIResourceENG } from '../../shared/lang/eng';
import { UIResourceVN } from '../../shared/lang/vn';
import { UIResourceZH } from '../../shared/lang/zh';

export interface AiLogMessage {
  sender: string;
  senderRole: string;
  badgeColor: string;
  text: string;
  codeSnippet?: string;
  type: 'directive' | 'critique' | 'mcp' | 'test' | 'build' | 'security' | 'deploy' | 'operate';
}

export interface AiStepDetail {
  step: number;
  title: string;
  shortName: string;
  leadAi: string;
  role: string;
  statusBadge: string;
  statusColor: string;
  description: string;
  logs: AiLogMessage[];
}

export interface ConvergenceMetric {
  label: string;
  value: string;
  sub: string;
}

export interface ConvergenceSynergy {
  partnerDomain: string;
  partnerNum: string;
  title: string;
  description: string;
  protocol: string;
}

export interface ConvergenceDomain {
  id: '01' | '02' | '03' | '04' | 'ai';
  num: string;
  title: string;
  shortTitle: string;
  categoryBadge: string;
  accentColor: string;
  headline: string;
  coreSkills: string[];
  operationalRole: string;
  metrics: ConvergenceMetric[];
  synergies: ConvergenceSynergy[];
  aiSupercharge: string;
}

export interface ScenarioStep {
  domainNum: string;
  domainName: string;
  badgeColor: string;
  action: string;
  telemetry: string;
  status: string;
}

export interface ConvergenceScenario {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  description: string;
  totalTime: string;
  steps: ScenarioStep[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
})
export class SkillsComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() lang: string = 'ENG';

  UIResource: any = UIResourceENG;

  // Tabs for interactive terminals & visualizations
  activeLinuxTab: 'tree' | 'systemctl' | 'neofetch' = 'tree';
  activeCiscoTab: 'topology' | 'routes' | 'vlan' = 'topology';
  activeDevOpsTab: 'pipeline' | 'kubectl' = 'pipeline';
  activeBackendTab: 'flow' | 'code' = 'flow';

  // 8-Phase AI Engineering Orchestrator State
  currentAiStep: number = 1;
  isAiSimulating: boolean = false;
  private aiSimulationTimer: any = null;

  // Grand Convergence Ecosystem State
  selectedConvergenceTab: 'all' | '01' | '02' | '03' | '04' | 'ai' = 'all';
  activeScenarioIndex: number = 0;
  activeScenarioStepIdx: number = 0;
  isScenarioAutoPlaying: boolean = false;
  private scenarioTimer: any = null;

  // Typewriter state for Section 01 & 02
  linuxTypedCmd: string = '';
  linuxFullCmd: string = 'tree -C --dirsfirst /infrastructure/skills/';
  isLinuxTypingDone: boolean = false;
  private linuxTypeTimer: any = null;

  ciscoTypedCmd: string = '';
  ciscoFullCmd: string = 'show network-topology';
  isCiscoTypingDone: boolean = false;
  private ciscoTypeTimer: any = null;

  private observer: IntersectionObserver | null = null;

  // 8-Phase Engineering Lifecycle Data Model — sourced from the active language resource
  get aiSteps(): AiStepDetail[] {
    return this.UIResource?.skills_page?.aiSteps ?? [];
  }

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.updateResource();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lang']) {
      this.updateResource();
      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => this.revealAll());
      }
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.linuxTypeTimer) clearTimeout(this.linuxTypeTimer);
    if (this.ciscoTypeTimer) clearTimeout(this.ciscoTypeTimer);
    if (this.aiSimulationTimer) clearInterval(this.aiSimulationTimer);
    if (this.scenarioTimer) clearInterval(this.scenarioTimer);
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

  private setupIntersectionObserver(): void {
    if (!('IntersectionObserver' in window)) {
      this.revealAll();
      this.startLinuxTyping();
      this.startCiscoTyping();
      return;
    }

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');

          if (entry.target.id === 'systems' || entry.target.querySelector('#systems-terminal')) {
            this.startLinuxTyping();
          }
          if (entry.target.id === 'networking' || entry.target.querySelector('#networking-terminal')) {
            this.startCiscoTyping();
          }

          this.observer?.unobserve(entry.target);
        }
      });
    }, options);

    const scrollTargets = this.el.nativeElement.querySelectorAll('.scroll-reveal-item');
    scrollTargets.forEach((target: Element) => {
      this.observer?.observe(target);
    });
  }

  private revealAll(): void {
    const scrollTargets = this.el.nativeElement.querySelectorAll('.scroll-reveal-item');
    scrollTargets.forEach((target: Element) => {
      target.classList.add('is-revealed');
    });
  }

  // Typewriter for Linux Terminal
  startLinuxTyping(): void {
    if (this.linuxTypedCmd.length > 0 || this.isLinuxTypingDone) return;
    let idx = 0;
    const typeSpeed = 35;

    const typeNext = () => {
      if (idx < this.linuxFullCmd.length) {
        this.linuxTypedCmd += this.linuxFullCmd.charAt(idx);
        idx++;
        this.linuxTypeTimer = setTimeout(typeNext, typeSpeed);
      } else {
        this.isLinuxTypingDone = true;
      }
    };

    this.linuxTypeTimer = setTimeout(typeNext, 200);
  }

  // Typewriter for Cisco Terminal
  startCiscoTyping(): void {
    if (this.ciscoTypedCmd.length > 0 || this.isCiscoTypingDone) return;
    let idx = 0;
    const typeSpeed = 40;

    const typeNext = () => {
      if (idx < this.ciscoFullCmd.length) {
        this.ciscoTypedCmd += this.ciscoFullCmd.charAt(idx);
        idx++;
        this.ciscoTypeTimer = setTimeout(typeNext, typeSpeed);
      } else {
        this.isCiscoTypingDone = true;
      }
    };

    this.ciscoTypeTimer = setTimeout(typeNext, 350);
  }

  switchLinuxTab(tab: 'tree' | 'systemctl' | 'neofetch'): void {
    this.activeLinuxTab = tab;
  }

  switchCiscoTab(tab: 'topology' | 'routes' | 'vlan'): void {
    this.activeCiscoTab = tab;
  }

  switchDevOpsTab(tab: 'pipeline' | 'kubectl'): void {
    this.activeDevOpsTab = tab;
  }

  switchBackendTab(tab: 'flow' | 'code'): void {
    this.activeBackendTab = tab;
  }

  // Multi-AI 8-Phase Navigation & Auto Simulation
  selectAiStep(stepNumber: number): void {
    this.currentAiStep = stepNumber;
  }

  toggleAiSimulation(): void {
    this.isAiSimulating = !this.isAiSimulating;
    if (this.isAiSimulating) {
      this.runSimulationLoop();
    } else {
      if (this.aiSimulationTimer) clearInterval(this.aiSimulationTimer);
    }
  }

  private runSimulationLoop(): void {
    if (this.aiSimulationTimer) clearInterval(this.aiSimulationTimer);
    this.aiSimulationTimer = setInterval(() => {
      if (this.currentAiStep < 8) {
        this.currentAiStep++;
      } else {
        this.currentAiStep = 1;
      }
    }, 2500);
  }

  get currentStepData(): AiStepDetail {
    return this.aiSteps.find((s) => s.step === this.currentAiStep) || this.aiSteps[0];
  }

  // Grand Unified Convergence Domains Data (4 Domains + AI Layer) — sourced from the active language resource
  get convergenceDomains(): ConvergenceDomain[] {
    return this.UIResource?.skills_page?.convergenceDomains ?? [];
  }

  // 3 Real-World Cross-Domain Convergence Scenarios — sourced from the active language resource
  get convergenceScenarios(): ConvergenceScenario[] {
    return this.UIResource?.skills_page?.convergenceScenarios ?? [];
  }

  // Convergence Ecosystem Interaction Methods
  selectConvergenceTab(tab: 'all' | '01' | '02' | '03' | '04' | 'ai'): void {
    this.selectedConvergenceTab = tab;
  }

  selectScenario(index: number): void {
    this.activeScenarioIndex = index;
    this.activeScenarioStepIdx = 0;
  }

  toggleScenarioPlay(): void {
    this.isScenarioAutoPlaying = !this.isScenarioAutoPlaying;
    if (this.isScenarioAutoPlaying) {
      this.runScenarioLoop();
    } else {
      if (this.scenarioTimer) clearInterval(this.scenarioTimer);
    }
  }

  private runScenarioLoop(): void {
    if (this.scenarioTimer) clearInterval(this.scenarioTimer);
    this.scenarioTimer = setInterval(() => {
      const currentSteps = this.convergenceScenarios[this.activeScenarioIndex].steps;
      if (this.activeScenarioStepIdx < currentSteps.length - 1) {
        this.activeScenarioStepIdx++;
      } else {
        this.activeScenarioStepIdx = 0;
      }
    }, 2000);
  }

  get selectedDomainData(): ConvergenceDomain | null {
    if (this.selectedConvergenceTab === 'all') return null;
    return this.convergenceDomains.find((d) => d.id === this.selectedConvergenceTab) || null;
  }

  get activeScenario(): ConvergenceScenario {
    return this.convergenceScenarios[this.activeScenarioIndex];
  }

  replayLinuxTerminal(): void {
    this.linuxTypedCmd = '';
    this.isLinuxTypingDone = false;
    this.startLinuxTyping();
  }

  replayCiscoTerminal(): void {
    this.ciscoTypedCmd = '';
    this.isCiscoTypingDone = false;
    this.startCiscoTyping();
  }

  // trackBy helpers — these arrays are re-created (new object identity) whenever the
  // language resource swaps, so Angular needs a stable key to avoid tearing down DOM
  // nodes that are mid-animation (see RoadmapComponent for the same class of bug).
  trackByStep(_index: number, step: AiStepDetail): number {
    return step.step;
  }

  trackByLog(index: number, log: AiLogMessage): string {
    return `${log.sender}-${index}`;
  }

  trackBySkill(index: number, skill: string): string {
    return skill || String(index);
  }

  trackByMetric(index: number, metric: ConvergenceMetric): string {
    return metric.label || String(index);
  }

  trackBySynergy(index: number, syn: ConvergenceSynergy): string {
    return syn.partnerNum || String(index);
  }

  trackByScenario(index: number, sc: ConvergenceScenario): string {
    return sc.id || String(index);
  }

  trackByScenarioStep(index: number, step: ScenarioStep): string {
    return `${step.domainNum}-${index}`;
  }
}
