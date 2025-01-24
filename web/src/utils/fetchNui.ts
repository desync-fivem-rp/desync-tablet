import { isEnvBrowser } from "./misc";
import { mockNotes } from "./mockData";

export async function fetchNui<T = unknown>(
    eventName: string,
    data?: unknown
): Promise<T> {
    // console.log(`Sending NUI request: ${eventName}`, data); // Add this line

    if (isEnvBrowser()) {
        switch (eventName) {
            case 'getNotes':
                return mockNotes.getNotes() as T;
            case 'saveNote':
                return mockNotes.saveNote(data as any) as T;
            case 'deleteNote':
                return { success: mockNotes.deleteNote((data as any).id) } as T;
            default:
                console.warn(`No mock data handler for event: ${eventName}`);
                return {} as T;
            case 'getSettings':
                return { scale: 1 } as T;
            case 'saveSettings':
                return { success: true } as T;
            case "getBackgroundUrl":
                return { url: "" } as T;
            case "saveBackgroundUrl":
                return { success: true } as T;
        }
    }

    const options = {
        method: "post",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(data),
    };

    const resourceName = (window as any).GetParentResourceName
        ? (window as any).GetParentResourceName()
        : "nui-frame-app";

    const resp = await fetch(`https://${resourceName}/${eventName}`, options);
    const respFormatted = await resp.json();
    // console.log(`Received NUI response: ${eventName}`, respFormatted); // Add this line


    return respFormatted;
}
