'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function () {


  it('should automatically redirect to / when location hash/fragment is empty/invalid', function () {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch('/');

    browser.get('index.html#/invalid');
    expect(browser.getLocationAbsUrl()).toMatch('/');
  });


  describe('home', function () {

    beforeEach(function () {
      browser.get('index.html#/');
    });


    it('should render home when user navigates to /', function () {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/This web shop is full of AngularJS directives, services, controllers and filters./);
    });

  });


  describe('about', function () {

    beforeEach(function () {
      browser.get('index.html#/about');
    });


    it('should render about when user navigates to /about', function () {
      expect(element.all(by.css('[ng-view] h1')).first().getText()).
        toMatch(/About this web shop/);
    });

  });

  describe('shop', function () {
    beforeEach(function () {
      browser.get('index.html#/shop');
    });

    it('should render shop when user navigates to /shop', function () {
      expect(element.all(by.css('[ng-view] label')).first().getText())
        .toMatch(/Filter/);
    });
  });
});
