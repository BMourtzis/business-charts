import { initApplication } from "@/application/startup/initApp"


export default {
    async install() {
        await initApplication();
    }
}