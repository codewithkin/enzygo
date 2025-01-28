declare global {
    interface ImportMeta {
        env: {
            MODE: string
        }
    }
}

export const rootBackendServer: string = import.meta.env.MODE === "production" ? "https://api.anzygo.online" : "http://localhost:8080/api";