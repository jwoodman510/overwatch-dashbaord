import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { PlayerStats } from '@app/core/models';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent {
  @Input()
  battleTag: string;

  @Input()
  stats: PlayerStats;

  @Input()
  error: boolean;

  @Output()
  readonly retry = new EventEmitter<void>();

  @Output()
  readonly remove = new EventEmitter<void>();

  @Output()
  readonly refresh = new EventEmitter<void>();

  flipped = false;

  flip(): void {
    this.flipped = !this.flipped;
  }

  constructor(private sanitizer: DomSanitizer) {}

  get playOverwatchLink(): SafeResourceUrl {
    if (!this.stats) {
      return undefined;
    }

    const platform = this.stats.platform.toLowerCase();
    const bt = this.battleTag.replace('#', '-');

    const url = `https://playoverwatch.com/en-us/career/${platform}/${bt}`;

    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
