import { AngularTodolistPage } from './app.po';

describe('angular-todolist App', () => {
  let page: AngularTodolistPage;

  beforeEach(() => {
    page = new AngularTodolistPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
