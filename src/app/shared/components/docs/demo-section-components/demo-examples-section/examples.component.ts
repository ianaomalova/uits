import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ContentSection } from '../../models/content-section.model';
import { ComponentExample } from '../../models/components-examples.model';
import { NgxModuleData } from './stackblitz/app.module';

@Component({
  selector: 'examples',
  templateUrl: './examples.component.html'
})
export class ExamplesComponent {
  examples: ComponentExample[];
  moduleData: NgxModuleData;

  constructor(public section: ContentSection, private route: ActivatedRoute) {
    this.examples = section.content as ComponentExample[]
  }

  @HostListener('document:click', ['$event'])
  preventEmptyHrefNav(event: MouseEvent & { target: Element }): void {
    let element: Element = event.target;
    let preventNav = element.getAttribute('href') === '#';

    if (preventNav) {
      event.preventDefault();

      return;
    }

    if (element.tagName !== 'A') {
      while (element.parentElement && element !== document.body) {
        if (preventNav) {
          event.preventDefault();

          return;
        }
        element = element.parentElement;
        preventNav = element.getAttribute('href') === '#';
      }
    }
  }

}

