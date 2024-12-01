import { checkForName } from "../src/client/js/nameChecker";

describe("checkForName function", () => {
    beforeEach(() => {
        // Mock alert to prevent actual alerts during testing
        jest.spyOn(window, "alert").mockImplementation(() => {});
    });

    afterEach(() => {
        // Restore original alert implementation after each test
        jest.restoreAllMocks();
    });

    test("alerts 'Welcome, Captain!' for a valid captain name", () => {
        const validName = "Picard";
        checkForName(validName);
        expect(window.alert).toHaveBeenCalledWith("Welcome, Captain!");
    });

    test("alerts 'Enter a valid captain name' for an invalid name", () => {
        const invalidName = "Spock";
        checkForName(invalidName);
        expect(window.alert).toHaveBeenCalledWith("Enter a valid captain name");
    });

    test("does not throw errors for empty input", () => {
        const emptyInput = "";
        checkForName(emptyInput);
        expect(window.alert).toHaveBeenCalledWith("Enter a valid captain name");
    });

    test("is case-sensitive and does not accept lowercase valid names", () => {
        const lowercaseName = "picard";
        checkForName(lowercaseName);
        expect(window.alert).toHaveBeenCalledWith("Enter a valid captain name");
    });
});
