import { bootstrapApplication } from '@angular/platform-browser';
import { config } from './config';
import { PageComponent } from './app/page.component';

bootstrapApplication(PageComponent, config)
  .catch((err) => console.error(err));
