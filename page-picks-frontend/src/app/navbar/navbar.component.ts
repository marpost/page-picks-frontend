import { Component, OnInit, OnDestroy, Renderer2, ElementRef } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private routerSubscription: Subscription | undefined;

  constructor(
    public authService: AuthService,
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/contact') {
          this.renderer.addClass(document.querySelector('.sidenav'), 'active-sidenav');
        } else {
          this.renderer.removeClass(document.querySelector('.sidenav'), 'active-sidenav');
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
