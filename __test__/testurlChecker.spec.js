import { isValidURL } from "../src/client/js/urlChecker";

describe("isValidURL function", () => {
    test("returns true for a valid HTTP URL", () => {
        const url = "http://example.com";
        expect(isValidURL(url)).toBe(true);
    });

    test("returns true for a valid HTTPS URL", () => {
        const url = "https://example.com";
        expect(isValidURL(url)).toBe(true);
    });

    test("returns true for a valid URL with query parameters", () => {
        const url = "https://example.com?search=test";
        expect(isValidURL(url)).toBe(true);
    });

    test("returns true for a valid URL with a fragment", () => {
        const url = "https://example.com#section";
        expect(isValidURL(url)).toBe(true);
    });

    test("returns false for an invalid URL without a proper domain", () => {
        const url = "http://.com";
        expect(isValidURL(url)).toBe(false);
    });

    test("returns false for a completely invalid string", () => {
        const url = "not-a-url";
        expect(isValidURL(url)).toBe(false);
    });

    test("returns false for an empty string", () => {
        const url = "";
        expect(isValidURL(url)).toBe(false);
    });

    test("returns true for a valid URL with port", () => {
        const url = "https://example.com:8080";
        expect(isValidURL(url)).toBe(true);
    });

    test("returns false for a URL with unsupported characters", () => {
        const url = "http://exa mple.com";
        expect(isValidURL(url)).toBe(false);
    });
});
