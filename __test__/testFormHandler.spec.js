import { handleSubmit, sendDataToServer} from "../src/client/js/formHandler"; // Correctly import both
import { isValidURL } from "../src/client/js/urlChecker";

// Mock the DOM environment
beforeEach(() => {
    // Set up a fake DOM with the necessary elements
    document.body.innerHTML = `
        <form id="urlForm">
            <input type="text" id="name" name="url" value="http://valid.url" />
            <button type="submit">Submit</button>
        </form>
        <div id="results"></div>
    `;
});

// Mock functions
jest.mock("../src/client/js/urlChecker", () => ({
    isValidURL: jest.fn(),
}));

jest.mock("../src/client/js/formHandler", () => ({
    sendDataToServer: jest.fn(), // Mock sendDataToServer here
    updateUI: jest.fn(),
    handleSubmit: jest.requireActual("../src/client/js/formHandler").handleSubmit, // Retain the original handleSubmit
}));

describe("handleSubmit tests", () => {

    test("prevents default form submission", () => {
        const mockEvent = { preventDefault: jest.fn() };
        handleSubmit(mockEvent);
        expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    test("alerts when URL is invalid", () => {
        // Mock isValidURL to return false
        isValidURL.mockReturnValue(false);
        
        const mockEvent = { preventDefault: jest.fn() };
        const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
        
        // Call handleSubmit with an invalid URL
        handleSubmit(mockEvent);
        
        expect(mockAlert).toHaveBeenCalledWith("Please enter a valid URL!");
        
        // Clean up the alert mock
        mockAlert.mockRestore();
    });

    test("handles error if sendDataToServer fails", async () => {
        // Mock valid URL and failing server request
        isValidURL.mockReturnValue(true);
        const mockEvent = { preventDefault: jest.fn() };
        
        // Mock server error
        sendDataToServer.mockRejectedValue(new Error("Server error"));

        // Spy on alert to check if it's called
        const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
        
        // Call handleSubmit
        await handleSubmit(mockEvent);

        // Check if the error alert was triggered
        expect(mockAlert).toHaveBeenCalledWith("An error occurred while processing your request. Please try again.");

        // Clean up alert mock
        mockAlert.mockRestore();
    });
});
