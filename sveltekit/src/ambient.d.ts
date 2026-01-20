declare module "$lib/components/ui/card" {
    export const Root: any;
    export const Header: any;
    export const Title: any;
    export const Description: any;
    export const Content: any;
    export const Footer: any;
}

declare module "@ui/card" {
    export const Root: any;
    export const Header: any;
    export const Title: any;
    export const Description: any;
    export const Content: any;
    export const Footer: any;
}



declare module "$app/navigation" {
    export const goto: (url: string | URL, opts?: any) => Promise<void>;
    export const invalidate: (
        url: string | URL | ((url: URL) => boolean),
    ) => Promise<void>;
    export const invalidateAll: () => Promise<void>;
    export const preloadData: (url: string | URL) => Promise<void>;
    export const preloadCode: (url: string | URL) => Promise<void>;
    export const beforeNavigate: (fn: (navigation: any) => void) => void;
    export const afterNavigate: (fn: (navigation: any) => void) => void;
    export const disableScrollHandling: () => void;
}

// Generic declaration for all .svelte files
// SvelteKit's preprocessor should preserve named exports (like Props interfaces)
// from <script module> blocks when resolving .svelte imports in TypeScript files
declare module '*.svelte' {
    import type { Component } from 'svelte';
    const component: Component<any>;
    export default component;
}
