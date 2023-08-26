import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
/* common */

import { AddNavComponent } from './common/add-nav/add-nav.component';

/* docs */
import { DemoSectionComponent } from './demo-section/demo-section.component';
import { ContentSection } from './models/content-section.model';
import {
  DemoTopSectionComponent,
  DemoTopSectionComponentModule
} from './demo-section-components/demo-top-section';
import {
  ExamplesComponent,
  ExamplesComponentModule
} from './demo-section-components/demo-examples-section';
import {
  ApiSectionsComponent,
  ApiSectionsComponentModule
} from './demo-section-components/demo-api-section';
import { DocsSectionComponent } from './docs-section/docs-section.component';
import {
  NgApiDocModule,
  NgApiDocComponent,
  NgApiDocClassComponent,
  NgApiDocConfigComponent
} from './api-docs';
/* export */
export { DemoSectionComponent } from './demo-section/demo-section.component';
export { DemoTopSectionComponent } from './demo-section-components/demo-top-section';
export { ExamplesComponent } from './demo-section-components/demo-examples-section';
export { ApiSectionsComponent } from './demo-section-components/demo-api-section';
export { DocsSectionComponent } from './docs-section/docs-section.component';

@NgModule({
    declarations: [
        DemoSectionComponent,
        AddNavComponent,
        DocsSectionComponent
    ],
    imports: [
        TabsModule.forRoot(),
        FormsModule,
        CommonModule,
        NgApiDocModule,
        ExamplesComponentModule,
        ApiSectionsComponentModule,
        DemoTopSectionComponentModule,
        RouterModule
    ],
    exports: [
        AddNavComponent,
        DemoSectionComponent,
        NgApiDocModule,
        ExamplesComponentModule,
        ApiSectionsComponentModule,
        RouterModule,
        DocsSectionComponent
    ],
    providers: [ContentSection]
})
export class DocsModule {}
