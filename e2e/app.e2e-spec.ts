import { AtpWebPage } from './app.po';

describe('atp-web App', function() {
  let page: AtpWebPage;

  beforeEach(() => {
    page = new AtpWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
