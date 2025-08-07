import { createApp } from 'solid-utils';
import { Router } from 'solid-app-router';
import { App } from './pages/app/app';
import { ErrorPage } from './pages/error/error';
import { MusicImagesProvider } from './components/music-image/data-context';
import { MenuProvider } from './components/menu/menu';
import { RootStoresProvider } from './stores/stores';
import { ModalsProvider } from './components/modals/modals';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Automatically redirect unauthenticated users to /auth,
// but avoid infinite loop by skipping if already on /auth
onAuthStateChanged(auth, (user) => {
  const currentPath = window.location.pathname;

  if (user || currentPath.startsWith('/auth')) {
    createApp(App)
      .use(Router)
      .use(ErrorPage)
      .use(MusicImagesProvider)
      .use(RootStoresProvider)
      .use(ModalsProvider)
      .use(MenuProvider)
      .mount('body');
  } else {
    window.location.href = "/auth";
  }
});
