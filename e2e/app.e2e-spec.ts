import { SalesusmapPage } from './app.po';

describe('salesusmap App', () => {
  let page: SalesusmapPage;

  beforeEach(() => {
    page = new SalesusmapPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
