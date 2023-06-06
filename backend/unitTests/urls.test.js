/* eslint-disable */
const Url = require("../models/urlModel");
const urlService = require("../services/urlService");

const urlServiceInstance = new urlService();

var url = new Url({
  _id: "556454ac4654a",
  slug: "sdg564sa",
  web: "https://www.google.com",
  ios: {
    primary: "https://ios.primary.www.google.com",
    fallback: "https://ios.fallback.www.google.com",
  },
  android: {
    primary: "https://android.primary.www.google.com",
    fallback: "https://android.fallback.www.google.com",
  },
});

describe("testing getAllUrls service in Url service class", () => {
  test("should respond with array of urls", async () => {
    Url.find = jest.fn().mockReturnValueOnce([url]);
    const urls = await urlServiceInstance.getAllUrls();
    expect(urls[0].android.primary).toBe(
      "https://android.primary.www.google.com"
    );
  });
});

describe("testing getUrl service in Url service class", () => {
  describe("given userAgent containing Android", () => {
    test("should respond with android primary url", async () => {
      Url.findOne = jest.fn().mockReturnValueOnce(url);
      const urlOutput = await urlServiceInstance.getUrl(url.slug, "Android");
      expect(urlOutput).toBe("https://android.primary.www.google.com");
    });
  });
  describe("given userAgent containing iPhone", () => {
    test("should respond with ios primary url", async () => {
      Url.findOne = jest.fn().mockReturnValueOnce(url);
      const urlOutput = await urlServiceInstance.getUrl(url.slug, "iPhone");
      expect(urlOutput).toBe("https://ios.primary.www.google.com");
    });
  });
  describe("given invalid slug", () => {
    test("should throw an error", async () => {
      Url.findOne = jest.fn().mockReturnValueOnce(undefined);
      expect(
        urlServiceInstance.getUrl(undefined, "iPhone")
      ).rejects.toThrowError();
    });
  });
});

describe("testing createUrl service in Url service class", () => {
  describe("given valid slug, ios, android, and web urls", () => {
    test("should respond with used slug", async () => {
      Url.findOne = jest.fn().mockReturnValueOnce(undefined);
      Url.prototype.save = jest.fn().mockImplementation(() => {});
      const slugOutput = await urlServiceInstance.createUrl(
        url.slug,
        url.ios,
        url.android,
        url.web
      );
      expect(slugOutput).toBe(url.slug);
    });
  });
  describe("given no slug", () => {
    test("should respond with another slug", async () => {
      Url.findOne = jest.fn().mockReturnValueOnce(undefined);
      Url.prototype.save = jest.fn().mockImplementation(() => {});
      const slugOutput = await urlServiceInstance.createUrl(
        undefined,
        url.ios,
        url.android,
        url.web
      );
      expect(slugOutput.length).toBe(8);
    });
  });
  describe("given existing slug", () => {
    test("should throw an error", async () => {
      Url.findOne = jest.fn().mockReturnValueOnce(url);
      expect(
        urlServiceInstance.createUrl(url.slug, url.ios, url.android, url.web)
      ).rejects.toThrowError();
    });
  });
});

describe("testing updateUrl service in Url service class", () => {
  describe("given valid slug", () => {
    test("should respond with the slug", async () => {
      Url.findOneAndUpdate = jest.fn().mockReturnValueOnce(url);
      const slugOutput = await urlServiceInstance.updateUrl(url.slug, {
        web: "https://www.gooooogle.com",
      });
      expect(slugOutput).toBe(url.slug);
    });
  });
  describe("given invalid slug", () => {
    test("should throw an error", async () => {
      Url.findOneAndUpdate = jest.fn().mockReturnValueOnce(undefined);
      expect(
        urlServiceInstance.updateUrl(undefined, {
          web: "https://www.gooooogle.com",
        })
      ).rejects.toThrowError();
    });
  });
});
