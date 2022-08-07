import { Sandbox, SandboxOptions, SandboxPlayer } from "ZEPETO.Multiplay";
import { DataStorage } from "ZEPETO.Multiplay.DataStorage";
import { Player } from "ZEPETO.Multiplay.Schema";

export default class extends Sandbox {

    onCreate(options: SandboxOptions) {
        
    }

    async onJoin(client: SandboxPlayer) {
        console.log(`[OnJoin] sessionId: ${client.sessionId}, HashCode: ${client.hashCode}, userId:$}client.userId`);

        const player = new Player();
        player.sessionId = client.sessionId;

        if(client.hashCode){
            player.zepetoHash = client.hashCode;
        }
        if(client.userId){
            player.zepetoUserId = client.userId;
            const storage: DataStorage = client.loadDataStorage();

            let visit_cnt = await storage.get("visitCount") as number;
            if(visit_cnt == null) visit_cnt = 0;

            console.log(`[OnJoin] sessionId: ${client.sessionId}'s visiting count : ${visit_cnt}`);

            await storage.set("VisitCount", ++visit_cnt);

            this.state.players.set(client.sessionId, player);
        }
    }

    onLeave(client: SandboxPlayer, consented?: boolean) {
        
    }
}