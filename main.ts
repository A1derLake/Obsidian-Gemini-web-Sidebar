import { ItemView, Plugin, WorkspaceLeaf } from 'obsidian';

const VIEW_TYPE_GEMINI = 'gemini-web-view';

class GeminiView extends ItemView {
    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
    }

    getViewType() {
        return VIEW_TYPE_GEMINI;
    }

    getDisplayText() {
        return 'Gemini';
    }

    async onOpen() {
        const container = this.containerEl.children[1];
        container.empty();

        // Google blocks standard iframes, so we use Electron's <webview> tag
        const webview = container.createEl('webview');
        webview.setAttribute('src', 'https://gemini.google.com');
        
        // Style the webview to take up the full sidebar space
        webview.setAttribute('style', 'width: 100%; height: 100%; border: none;');
        
        // Optional: Set a user agent if Google prompts you to update your browser
        webview.setAttribute('useragent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0');
    }

    async onClose() {
        // Cleanup resources if necessary when the view is closed
    }
}

export default class GeminiSidebarPlugin extends Plugin {
    async onload() {
        // Register the custom view
        this.registerView(
            VIEW_TYPE_GEMINI,
            (leaf) => new GeminiView(leaf)
        );

        // Add a button to the left ribbon to open the Gemini sidebar
        this.addRibbonIcon('sparkles', 'Open Gemini', () => {
            this.activateView();
        });
    }

    async activateView() {
        const { workspace } = this.app;

        let leaf: WorkspaceLeaf | null = null;
        const leaves = workspace.getLeavesOfType(VIEW_TYPE_GEMINI);

        if (leaves.length > 0) {
            // If the view is already open somewhere, use that one
            leaf = leaves[0];
        } else {
            // Otherwise, open a new leaf in the right sidebar
            leaf = workspace.getRightLeaf(false);
            if (leaf) {
                await leaf.setViewState({ type: VIEW_TYPE_GEMINI, active: true });
            }
        }

        // Reveal the leaf (opens the sidebar panel if it's collapsed)
        if (leaf) {
            workspace.revealLeaf(leaf);
        }
    }
}